
var fs = require('fs'),
    util = require('util'),
	path = require('path');

var IS_WIN = /win/gi.test(process.platform),
    EOL = IS_WIN ? "\r\n" : "\n",
    USER = IS_WIN ? process.env.USERNAME : process.env.USER;


function mkdir(p) {
	var dirs = path.normalize(p).replace(/\\/g, "/").split('/'), len = dirs.length, seg = '';

	if (!IS_WIN) {
	    dirs.unshift('/' + dirs.shift());
	}

	for (var i = 0; i < len; i++) {
		seg += dirs[i];

		try {
			if (!fs.lstatSync(seg).isDirectory()) {
				throw new Error(seg + " is not a directory.");
			}
		} catch (e) {
			fs.mkdirSync(seg);
			if (!fs.lstatSync(seg).isDirectory()) {
				throw new Error('Cannot create directory: ' + seg);
			}
		}
		seg += "/";
	}
};

function Markdown(bench, root) {
    this.bench = bench;
    this.rootDir = root || process.cwd() + '/results';

    this.buffer = '';

    mkdir(this.rootDir);

    var emitter = this.bench.events();
    emitter.on('start.benchmark', this.benchStart.bind(this));
    emitter.on('end.benchmark', this.benchEnd.bind(this));
    emitter.on('start.category', this.categoryStart.bind(this));
    emitter.on('end.category', this.categoryEnd.bind(this));
    emitter.on('end.test', this.testEnd.bind(this));
};

Markdown.prototype.line = function(text) {
    this.buffer += (text || "") + EOL + EOL;
    return this;
};

Markdown.prototype.item = function(text) {
	return this.line('>> ' + text);
};

Markdown.prototype.section = function(text) {
    return this.line("> #### " + text);
};

Markdown.prototype.bold = function(text) {
	return '**' + text + '**';
};

Markdown.prototype.code = function(text) {
    return "```" + (text || '') + "```";
};

Markdown.prototype.reset = function() {
    this.buffer = '';
    this.category = null;
};

Markdown.prototype.benchEnd = function(event) {
    var file = this.benchDir + '/' + event.benchmark + ".md";
    fs.writeFileSync(file, this.buffer);
    this.reset();
};

Markdown.prototype.sectionItem = function(heading, text) {
	return this.item(this.bold(heading) + " " + this.code(text));
};

Markdown.prototype.benchStart = function(event) {
    var sw = event.specs.sw, hw = event.specs.hw, benchDir,
        date = new Date(), dateSpec,
        os = util.format("%s %s %s", sw.os.type, sw.os.arch, sw.os.release),
        cpu = util.format("%s (%s cores)", hw.cpu.model, hw.cpu.cores),
        mem = util.format("%s (total), %s (free)", hw.memory.total, hw.memory.free);

    dateSpec = [date.getFullYear(),
                date.getMonth() + 1,
                date.getDate(),
                date.getHours(),
                date.getMinutes(),
                date.getSeconds()].join('.');

    benchDir = [sw.os.type,
                sw.os.arch,
                sw.os.release,
                'node.' + sw.node,
                hw.cpu.model,
                USER,
                dateSpec
                ].join('/').replace(/\s/g, '');

    benchDir = this.rootDir + '/' + benchDir;

    mkdir(benchDir);
    this.benchDir = benchDir;

    this.section("Details");
    this.sectionItem("Benchmark", event.benchmark);
    this.sectionItem("Date", new Date().toString());
    this.sectionItem("Node Version", sw.node);
    this.sectionItem("Operating System", os);
    this.sectionItem("CPU", cpu);
    this.sectionItem("Memory", mem);
    this.br();
};

Markdown.prototype.br = function() {
    this.line().line('---');
};

Markdown.prototype.categoryStart = function(event) {
	this.category = JSON.parse(JSON.stringify(event));
    this.category.tests = [];
    this.category.shortest = null;
    this.category.longest = null;
};

Markdown.prototype.categoryEnd = function(event) {
    var len = this.category.tests.length, test, l, testName;

    this.section("Category: " + this.category.category);

    for (var i = 0; i < len; i++) {
        test = this.category.tests[i];
        testName = test.test;
        if (test.average == this.category.shortest) {
            testName = '(-) ' + testName;
        } else if (test.average == this.category.longest) {
            testName = '(+) ' + testName;
        }
        l = util.format(" iterations: %s, avg: %sms, longest: %sms, shortest: %sms",
                test.iterations, test.average, test.longest, test.shortest);
        this.sectionItem(testName, l);
    }
    this.br();
};

Markdown.prototype.testEnd = function(event) {
    this.category.tests.push(event);
    event.average = parseFloat(event.average);

    if (this.category.shortest == null) {
        this.category.shortest = event.average;
        this.category.longest = event.average;
    } else if (event.average < this.category.shortest) {
        this.category.shortest = event.average;
    } else if (event.average > this.category.longest) {
        this.category.longest = event.average;
    }
};

module.exports = function(bench, root) {
    return new Markdown(bench, root);
};
