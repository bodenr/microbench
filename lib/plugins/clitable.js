
var Table = require('cli-table'),
    util = require('util'),
    colors = require('colors'),
    ProgressBar = require('progress');

function ConsoleTable(bench) {
    this.bench = bench;
    var emitter = this.bench.events();

	emitter.on('start.benchmark', this.benchStart.bind(this));
    emitter.on('start.category', this.categoryStart.bind(this));
    emitter.on('end.category', this.categoryEnd.bind(this));
    emitter.on('end.test', this.testEnd.bind(this));
	emitter.on('iteration.end', this.iterationEnd.bind(this));
};

ConsoleTable.prototype.benchStart = function(event) {
    var table = new Table({style:{head:['cyan', 'bold']}}),
        sw = event.specs.sw,
        hw = event.specs.hw,
        os = util.format("%s %s %s", sw.os.type, sw.os.arch, sw.os.release),
        cpu = util.format("%s (%s cores)", hw.cpu.model, hw.cpu.cores),
        mem = util.format("%s (total), %s (free)", hw.memory.total, hw.memory.free);

    table.push({'Benchmark': event.benchmark},
            {'Date': new Date().toString()},
            {'Node.js': sw.node},
            {'Operating System': os},
            {'CPU': cpu},
            {'Memory': mem});
    console.log("\n\n");
    console.log(table.toString());
};

ConsoleTable.prototype.categoryStart = function(event) {
    this.category = JSON.parse(JSON.stringify(event));
    this.category.tests = [];
    this.category.shortest = null;
    this.category.longest = null;

    console.log("\n");

    this.progress = new ProgressBar('Running ' + event.category +
            ' [:bar] :percent :elapseds :etas', {
        complete: '=',
        incomplete: ' ',
        width: 20,
        total: event.testsCount * event.iterations
    });
};

ConsoleTable.prototype.iterationEnd = function(event) {
	this.progress.tick();
};


ConsoleTable.prototype.categoryEnd = function(event) {
    var table = new Table({head: ["Test".bold,
                                  "Iterations".bold,
                                  "Average (ms)".bold,
                                  "Longest (ms)".bold,
                                  "Shortest (ms)".bold]}),
            len = this.category.tests.length, test, row, color;

    for (var i = 0; i < len; i++) {
        test = this.category.tests[i];
        row = {};
        color = 'white';
        if (test.average == this.category.shortest) {
            color = 'green';
        } else if (test.average == this.category.longest) {
            color = 'red';
        }
        row[test.test] = [new String(test.iterations)[color],
                          new String(test.average)[color],
                          new String(test.longest)[color],
                          new String(test.shortest)[color]];

        table.push(row);
    }

    this.progress.rl.close();

    console.log("\n");
    console.log(this.category.category.bold);
    console.log(table.toString());
};

ConsoleTable.prototype.testEnd = function(event) {
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

module.exports = function(bench) {
    return new ConsoleTable(bench);
};
