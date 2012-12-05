
var bench = require('../').renew('String Operations');

bench.set('default iterations', 100);

bench.category('uncached char access', function() {
    bench.fixtures('its', bench.millions(1));

    bench.perTestFixtures('string gen', function(fixtures) {
        fixtures['str'] = bench.generators().randomString(bench.millions(1));
    });

    bench.test('charAt()', function(fixtures) {
        var times = fixtures.its, str = fixtures.str, v;
        for (var i = 0; i < times; i++) {
            v = str.charAt(1000);
            v = str.charAt(1500000);
            v = str.charAt(2999991);
        }
    }).test('bracket access', function(fixtures) {
        var times = fixtures.its, str = fixtures.str, v;
        for (var i = 0; i < times; i++) {
            v = str[1000];
            v = str[1500000];
            v = str[2999991];
        }
    }).test('substr()', function(fixtures) {
        var times = fixtures.its, str = fixtures.str, v;
        for (var i = 0; i < times; i++) {
            v = str.substr(1000, 1);
            v = str.substr(1500000, 1);
            v = str.substr(2999991, 1);
        }
    }).test('slice()', function(fixtures) {
        var times = fixtures.its, str = fixtures.str, v;
        for (var i = 0; i < times; i++) {
            v = str.slice(1000, 1001);
            v = str.slice(1500000, 1500001);
            v = str.substr(2999991, 2999992);
        }
    });
}).category('cached char access', function() {
    bench.fixtures('its', bench.millions(1));
    var str = bench.generators().randomString(bench.millions(1)),
        len = str.length;
    // cache
    for (var i = 0; i < len; i++) {
        str[i];
    }
    bench.fixtures('str', str);

    bench.test('charAt()', function(fixtures) {
        var times = fixtures.its, str = fixtures.str, v;
        for (var i = 0; i < times; i++) {
            v = str.charAt(1000);
            v = str.charAt(1500000);
            v = str.charAt(2999991);
        }
    }).test('bracket access', function(fixtures) {
        var times = fixtures.its, str = fixtures.str, v;
        for (var i = 0; i < times; i++) {
            v = str[1000];
            v = str[1500000];
            v = str[2999991];
        }
    }).test('substr()', function(fixtures) {
        var times = fixtures.its, str = fixtures.str, v;
        for (var i = 0; i < times; i++) {
            v = str.substr(1000, 1);
            v = str.substr(1500000, 1);
            v = str.substr(2999991, 1);
        }
    }).test('slice()', function(fixtures) {
        var times = fixtures.its, str = fixtures.str, v;
        for (var i = 0; i < times; i++) {
            v = str.slice(1000, 1001);
            v = str.slice(1500000, 1500001);
            v = str.substr(2999991, 2999992);
        }
    });
}).run();

