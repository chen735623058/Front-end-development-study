/**
 * create by sxf on 2019/2/14.
 * 功能:
 */

var one = {
    name:'sxf',
    say: function (greet) {
        return greet + ',' + this.name;
    }
}
console.log(one.say('hi'));

var two = {
    name : 'another object'
};

console.log(one.say.apply(two,['hello']));

var yetanther = {
    name: 'Yet another object',
    method: function (callback) {
        return callback('Hola');
    }
}

console.log(yetanther.method(one.say));

function bind(o,m) {
    return function () {
        return m.apply(o,[].slice.call(arguments));
    }
}

var twosay = bind(two,one.say);
console.log(twosay('yo'));


/ ECMAScript 5给Function.prototype添加了一个bind()方法，以便很容易使用apply()和call()。

if (typeof Function.prototype.bind === 'undefined') {
    Function.prototype.bind = function (thisArg) {
        var fn = this,
            slice = Array.prototype.slice,
            args = slice.call(arguments, 1);
        return function () {
            return fn.apply(thisArg, args.concat(slice.call(arguments)));
        };
    };
}

var twosay2 = one.say.bind(two);
console.log(twosay2('Bonjour')); // "Bonjour, another object"

var twosay3 = one.say.bind(two, 'Enchanté');
console.log(twosay3()); // "Enchanté, another object"