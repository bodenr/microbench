
var bench = require('../').renew('Function Operations');

bench.set('default iterations', 100);

bench.category('context access', function() {

    bench.fixtures('num', 3);
    bench.fixtures('its', bench.millions(1));

    bench.test('argument access 1 stack', function(fixtures) {
        var len = fixtures.its;
        for (var i = 0; i < len; i++) {
            var num = fixtures.num;
            (function(variable) {
                var v = variable;
            })(num);
        }
    }).test('1 context', function(fixtures) {
        var len = fixtures.its;
        for (var i = 0; i < len; i++) {
            var v = fixtures.num;
            (function() {
                var c = v;
            })();
        }
    }).test('argument access 2 stacks', function(fixtures) {
        var len = fixtures.its;
        for (var i = 0; i < len; i++) {
            var num = fixtures.num;
            (function(variable) {
                (function(x) {
                    var v = x;
                })(variable);
            })(num);
        }
    }).test('2 contexts', function(fixtures) {
        var len = fixtures.its;
        for (var i = 0; i < len; i++) {
            var v = fixtures.num;
            (function() {
                (function() {
                    var c = v;
                })();
            })();
        }
    }).test('argument access 3 stacks', function(fixtures) {
        var len = fixtures.its;
        for (var i = 0; i < len; i++) {
            var num = fixtures.num;
            (function(variable) {
                (function(x) {
                    (function(y) {
                        var v = y;
                    })(x);
                })(variable);
            })(num);
        }
    }).test('3 contexts', function(fixtures) {
        var len = fixtures.its;
        for (var i = 0; i < len; i++) {
            var v = fixtures.num;
            (function() {
                (function() {
                    (function() {
                        var c = v;
                    })();
                })();
            })();
        }
    });
}).run();