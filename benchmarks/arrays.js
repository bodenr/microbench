
var bench = require('../').renew('Array Operations');

bench.set('default iterations', 100);

bench.category('array primitive number iteration', function() {

    bench.perTestFixtures('primitive num array', function(fixtures) {
        fixtures['array'] = bench.generators().primitiveNumArray(bench.millions(1));
    });

    bench.test('for()', function(fixtures) {
        var array = fixtures.array, v, times = array.length;
        for (var i = 0; i < times; i++) {
            v = array[i];
        }
    }).test('forEach()', function(fixtures) {
        var array = fixtures.array, v;
        array.forEach(function(val) {
            v = val;
        });
    }).test('map()', function(fixtures) {
        var array = fixtures.array, v;
        array.map(function(val) {
            v = val;
            return v;
        });
    });
}).category('array mixed type iteration', function() {

    bench.perTestFixtures('primitive mixed array', function(fixtures) {
        fixtures['array'] = bench.generators().mixedArray(bench.millions(1));
    });

    bench.test('for()', function(fixtures) {
        var array = fixtures.array, v, times = array.length;
        for (var i = 0; i < times; i++) {
            v = array[i];
        }
    }).test('forEach()', function(fixtures) {
        var array = fixtures.array, v;
        array.forEach(function(val) {
            v = val;
        });
    }).test('map()', function(fixtures) {
        var array = fixtures.array, v;
        array.map(function(val) {
            v = val;
            return val;
        });
    });
}).run();

