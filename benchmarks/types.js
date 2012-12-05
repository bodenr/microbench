
var bench = require('../').renew('Type Operations');

bench.set('default iterations', 500);

bench.category('boxed function call', function() {

    bench.fixtures('its', bench.thousands(100));

    bench.perTestFixtures('strings', function(fixtures) {
        fixtures['stringLitteral'] = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
        fixtures['stringObject'] = new String(fixtures['stringLitteral']);
    });

    bench.test('litteral indexOf()', function(fixtures) {
        var times = fixtures.its, str = fixtures.stringLitteral, v;
        for (var i = 0; i < times; i++) {
            v = str.indexOf('k');
        }
    }).test('object indexOf', function(fixtures) {
        var times = fixtures.its, str = fixtures.stringObject, v;
        for (var i = 0; i < times; i++) {
            v = str.indexOf('k');
        }
    }).test('litteral charAt()', function(fixtures) {
        var times = fixtures.its, str = fixtures.stringLitteral, v;
        for (var i = 0; i < times; i++) {
            v = str.charAt(45);
        }
    }).test('object charAt', function(fixtures) {
        var times = fixtures.its, str = fixtures.stringObject, v;
        for (var i = 0; i < times; i++) {
            v = str.charAt(45);
        }
    });
}).run();


