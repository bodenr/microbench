

exports.randomString = function(length) {
    var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz",
        str = '';

    for (var i = 0; i < length; i++) {
        var rnum = Math.floor(Math.random() * chars.length);
        str += chars.substring(rnum, rnum + 1);
    }
    return str;
};

var PRIMITIVE_NUMS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    PRIMITIVE_MIXED = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 3.4, 9.3, 10.2,
                       'a', 'b', 'c', 'd', 'e', true, false],
    MIXED = PRIMITIVE_MIXED.concat(OBJECTS),
    OBJECTS = [{}, {a:'A'}, {key: new Object()}, {one: new Number(1)},
               {yes: true}, {obj: {keyObj: {a: 'A'}, date: new Date()}}];

function genArray(fixture, length) {
    var array = [];

    for (var i = 0; i < length; i++) {
        var rnum = Math.floor(Math.random() * fixture.length);
        array.push(fixture[rnum]);
    }

    return array;
};

exports.primitiveNumArray = function(length) {
    return genArray(PRIMITIVE_NUMS, length);
};

exports.primitiveMixedArray = function(length) {
    return genArray(PRIMITIVE_MIXED, length);
};

exports.objectArray = function(length) {
    return genArray(OBJECTS, length);
};

exports.mixedArray = function(length) {
    return genArray(MIXED, length);
};
