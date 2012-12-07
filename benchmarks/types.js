
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
}).category('function call vs prototype', function() {

    function index(array, item) {
        var len = array.length;
        for (var i = 0; i < len; i++) {
            if (array[i] === item) {
                return i;
            }
        }
        return -1;
    };

    Object.defineProperty(Array.prototype, "index", {
        configurable: true,
        value: function(item) {
            return index(this, item);
        }
    });

    bench.perTestFixtures('primitive num array', function(fixtures) {
        fixtures['array'] = bench.generators().orderedPrimitiveArray(bench.millions(1));
    });

    bench.set('default iterations', 100);

    bench.test('function call', function(fixtures) {
        var v, array = fixtures.array;
        v = index(array, 1001);
        v = index(array, 501000);
        v = index(array, 996999);
    }).test('prototype call', function(fixtures) {
        var v, array = fixtures.array;
        v = array.index(1001);
        v = array.index(501000);
        v = array.index(996999);
    }).test('native indexOf()', function(fixtures) {
        var v, array = fixtures.array;
        v = array.indexOf(1001);
        v = array.indexOf(501000);
        v = array.indexOf(996999);
    });

}).run();


