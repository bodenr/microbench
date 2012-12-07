
var util = require('util'),
    os = require('os'),
    EventEmitter = require('events').EventEmitter,
    emitter = new EventEmitter,
    expose = require('expose');

var globals = {};

var plugins = expose({targets: __dirname + '/plugins'});
var keys = Object.keys(plugins);
for (var i = 0; i < keys.length; i++) {
    plugins[keys[i]] = {active: false, plugin: plugins[keys[i]]};
}

var generators = expose({targets: __dirname + '/generators'});

var begin;
function start() {
    begin = process.hrtime();
};

function end() {
    var elapsed = process.hrtime(begin);
    var duration = (elapsed[0] * 1000000000 + elapsed[1]) / 1000000;
    begin = null;
    return duration;
};

var BYTE_UNTIS = [ ' bytes', ' KB', ' MB', ' GB', ' TB', ' PB', ' EB', ' ZB', ' YB' ];

function formatBytes(bytes) {
    if (typeof bytes === 'string' || bytes instanceof String) {
        bytes = parseInt(bytes);
    }

    if (isNaN(bytes)) {
        return;
    }

    var amountOf2s = Math.floor(Math.log(+bytes)/Math.log(2));
    if (amountOf2s < 1) {
        amountOf2s = 0;
    }
    var i = Math.floor(amountOf2s / 10);
    bytes = +bytes / Math.pow(2, 10 * i);

    // Rounds to 3 decimals places.
    if (bytes.toString().length > bytes.toFixed(3).toString().length) {
        bytes = bytes.toFixed(3);
    }
    return bytes + BYTE_UNTIS[i];
};

function num (base, n) {
    n = n || 1;
    return n * base;
};

function currentCategory(cats) {
    return cats.length - 1 >= 0 ? cats[cats.length - 1] : null;
};

function mergeFixtures(src, dest) {
    var result = {},
        skeys = Object.keys(src), slen = skeys.length,
        dkeys = Object.keys(dest), dlen = dkeys.length;

    for (var i = 0; i < dlen; i++) {
        result[dkeys[i]] = dest[dkeys[i]];
    }
    for (var i = 0; i < slen; i++) {
        result[skeys[i]] = src[skeys[i]];
    }

    return result;
};

function benchStart(id) {
    var event = {benchmark: id,
            specs: {
                sw: {
                    node: process.version,
                    os: {
                        type: os.type(),
                        arch: os.arch(),
                        release: os.release()
                    }
                },
                hw: {
                    cpu: {
                        model: os.cpus()[0].model,
                        cores: os.cpus().length
                    },
                    memory: {
                        total: formatBytes(os.totalmem()),
                        free: formatBytes(os.freemem())
                    }
                }
            }
          };
    emitter.emit('start.benchmark', event);
};

function benchEnd(id) {
    emitter.emit('end.benchmark', {benchmark: id});
}

function categoryStart(cat, iterations) {
    emitter.emit('start.category',{
            category: cat.name(),
			iterations: iterations,
            testsCount: cat.getTests().length
        });
}

function categoryEnd(id) {
    emitter.emit('end.category', {category: id});
}

function testStart(id) {
    emitter.emit('start.test', {test: id});
}

function iterationEnd(id) {
	emitter.emit('iteration.end', {test: id});
};

function testEnd(id, its, avg, longest, shortest) {
    emitter.emit('end.test', {
        test: id,
        iterations: its,
        average: avg,
        longest: longest,
        shortest: shortest
    });
}

function Bench(name) {
    this.props = {};
    this.props['default iterations'] = 100;
    this.props['precision'] = 3;
    this.categories = [];
    this.id = name || 'Benchmark';
    this.testData = {};
    this.perTest = {};
};

Bench.prototype.generators = function() {
    return generators;
};

Bench.prototype.events = function() {
    return emitter;
};

Bench.prototype.name = function(name) {
    if (name !== undefined) {
        this.id = name;
        return this;
    }
    return this.id;
};

Bench.prototype.plugins = function(id) {
    if (id) {
        return plugins[id];
    }
    return plugins;
};

Bench.prototype.usePlugin = function() {
    if (arguments.length && plugins[arguments[0]]) {
        var args = Array.prototype.slice.call(arguments),
            plugin = plugins[arguments[0]];
        args.shift();
        args.unshift(this);
        plugin.plugin.apply(null, args);
        plugin.active = true;
        return true;
    }
    return false;
};

Bench.prototype.fixtures = function(name, val) {
    var cat = currentCategory(this.categories);
    if (arguments.length === 0) {
        return this.testData;
    }
    if (!cat) {
        this.testData[name] = typeof val === 'function' ? val(this.testData) : val;
    } else {
        cat.fixtures(name, val);
    }
    return this;
};

Bench.prototype.perTestFixtures = function(name, fixture) {
    var cat = currentCategory(this.categories);
    if (arguments.length === 0) {
        return this.perTest;
    }

    if (!cat) {
        this.perTest[name] = fixture;
    } else {
        cat.perTestFixtures(name, fixture);
    }
    return this;
};

Bench.prototype.set = function(key, val) {
    return this.properties(key, val);
};

Bench.prototype.properties = function(key, val) {
    if (arguments.length === 0) {
        return mergeFixtures(this.props, globals);
    }
    this.props[key] = val;
    return this;
};

Bench.prototype.global = function(key, val) {
    if (arguments.length === 0) {
        return globals;
    }
    globals[key] = val;
    return this;
};

Bench.prototype.category = function(name, body) {
    this.categories.push(new Category(name));
    if (body && typeof body === 'function') {
        body();
    }
    return this;
};

Bench.prototype.test = function(name, fn) {
    var cur = currentCategory(this.categories);
    if (cur === null) {
        cur = new Category('Anonymous');
        this.categories.push(cur);
    }
    cur.test(new Test(name, fn));
    return this;
};

Bench.prototype.isApplicable = function(runnable) {
    var props = this.properties();
    if (props['only']) {
        var exprs = props['only'], len = exprs.length;
        for (var i = 0; i < len; i++) {
            if (new RegExp(exprs[i], 'g').test(runnable.name())) {
                return true;
            }
        }
        return false;
    }
    if (props['skip']) {
        var exprs = props['skip'], len = exprs.length;
        for (var i = 0; i < len; i++) {
            if (new RegExp(exprs[i], 'g').test(runnable.name())) {
                return false;
            }
        }
        return true;
    }

    return true;
};

Bench.prototype.run = function() {
    var catLen = this.categories.length,
        props = this.properties(),
        iterations = parseInt(props['default iterations']),
        precision = props['precision'];

    benchStart(this.id);

    for (var category = 0; category < catLen; category++) {
        var cat = this.categories[category];

        if (!this.isApplicable(cat)) {
            continue;
        }

        categoryStart(cat, iterations);

        var tests = cat.test(), testsLen = tests.length,
            testFixtures = mergeFixtures(cat.fixtures(), this.fixtures()),
            testSetup = mergeFixtures(cat.perTestFixtures(), this.perTestFixtures()),
            setupKeys = Object.keys(testSetup),
            initTestLen = setupKeys.length;

        for (var test = 0; test < testsLen; test++) {
            var duration = 0, theTest = tests[test], avg,
                longest, shortest, time;

            testStart(theTest.name());

            for (var it = 0; it < iterations; it++) {

                // run per test setups
                for (var init = 0; init < initTestLen; init++) {
                    if (typeof testSetup[setupKeys[init]] === 'function') {
                        testSetup[setupKeys[init]](testFixtures);
                    }
                }

                start();
                theTest.run(testFixtures);
                time = end();
                duration += time;

                if (it == 0) {
                    longest = time;
                    shortest = time;
                } else {
                    if (time < shortest) {
                        shortest = time;
                    }
                    if (time > longest) {
                        longest = time;
                    }
                }

				iterationEnd(theTest.name());

            }
            avg = duration / iterations;

            testEnd(theTest.name(), iterations, avg.toFixed(precision),
                    longest.toFixed(precision), shortest.toFixed(precision));
        }

        categoryEnd(cat.name());
    }

    benchEnd(this.id);

    return this;
};

Bench.prototype.renew = function(name) {
    return new Bench(name);
};

Bench.prototype.tens = function(n) {
    return num(10, n);
};

Bench.prototype.hundreds = function(n) {
    return num(100, n);
};

Bench.prototype.thousands = function(n) {
    return num(1000, n);
};

Bench.prototype.millions = function(n) {
    return num(1000000, n);
};

Bench.prototype.billions = function(n) {
    return num(1000000000, n);
};



function Category(name) {
    this.id = name;
    this.tests = [];
    this.testData = {};
    this.perTest = {};
};

Category.prototype.perTestFixtures = function(name, fixture) {
    if (arguments.length === 0) {
        return this.perTest;
    }
    this.perTest[name] = fixture;
    return this;
};

Category.prototype.fixtures = function(name, val) {
    if (arguments.length === 0) {
        var len = this.testData.length;
        for (var i = 0; i < len; i++) {
            if (typeof this.testData[i] === 'function') {
                this.testData[i](this.testData);
            }
        }
        return this.testData;
    }
    this.testData[name] = val;
    return this;
};

Category.prototype.getTests = function() {
    return this.tests;
};

Category.prototype.test = function(test) {
    if (arguments.length) {
        return this.tests.push(arguments[0]);
    }
    return this.tests;
};

Category.prototype.name = function(name) {
    if (arguments.length) {
        this.id = arguments[0];
        return;
    }
    return this.id;
};



function Test(name, fn) {
    this.id = name;
    this.fn = fn;
};

Test.prototype.name = function() {
    if (arguments.length) {
        this.id = arguments[0];
    } else {
        return this.id;
    }
};

Test.prototype.run = function(args) {
    this.fn(args);
};


module.exports = new Bench();
