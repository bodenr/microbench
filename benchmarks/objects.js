
var bench = require('../').renew('Object Operations');

bench.set('default iterations', 100);

bench.category('object creation', function() {

    function MyObject(id, age, name) {
        this.id = id;
        this.age = age;
        this.name = name;
    };

    MyObject.prototype.getAge = function() {
        return this.age;
    };

    bench.fixtures('MyObject', MyObject);
    bench.fixtures('its', bench.thousands(20));

    bench.test('new', function(fixtures) {
        var len = fixtures.its;
        for (var i = 0; i < len; i++) {
            var obj = new fixtures.MyObject('neu', 12.1, 'with new');
        }
    }).test('Object.create()', function(fixtures) {
        var len = fixtures.its;
        for (var i = 0; i < len; i++) {
            var obj = Object.create(fixtures.MyObject, {
                id: {configurable: true, value: 'create'},
                age: {configurable: true, value: 12.1},
                name: {configurable: true, value: 'with create'}
            });
        }
    }).test('ad hoc litteral bind', function(fixtures) {
        var len = fixtures.its;
        for (var i = 0; i < len; i++) {
            var obj = {id: 'lit', age: 12.1, name: 'adhoc'};
            obj.getAge = fixtures.MyObject.prototype.getAge.bind(obj);
        }
    });
}).run();

