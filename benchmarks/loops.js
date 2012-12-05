
var bench = require('../').renew('Looping Constructs');

bench.set('default iterations', 100);

bench.category('looping constructs', function() {
    bench.fixtures('its', bench.millions(5));

    bench.test('increasing for()', function(fixtures) {
        var times = fixtures.its, v;
        for (var i = 0; i < times; i++) {
            v = i;
        }
    }).test('decreasing for()', function(fixtures) {
        var times = fixtures.its, v;
        for (var i = times - 1; i >= 0; i--) {
            v = i;
        }
    }).test('increasing while()', function(fixtures) {
        var times = fixtures.its, v, i = 0;
        while (i < times) {
            v = i;
            i++;
        }
    }).test('decreasing while()', function(fixtures) {
        var i = fixtures.its - 1, v;
        while (i >= 0) {
            v = i;
            i--;
        }
    }).test('increasing do while()', function(fixtures) {
        var times = fixtures.its, v, i = 0;
        do {
            v = i;
            i++;
        } while(i < times);
    }).test('decreasing do while()', function(fixtures) {
        var i = fixtures.its - 1, v;
        do {
            v = i;
            i--;
        } while(i >= 0);
    });
}).run();

