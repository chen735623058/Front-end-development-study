/**
 * create by sxf on 2019/2/18.
 * 功能:
 */

/**
 * 内部使用严格模式 防止构造函数使用时忘记写new
 * 代码的Fubar为构造函数，use strict命令保证了该函数在严格模式下运行。由于严格模式中，函数内部的this不能指向全局对象，默认等于undefined，导致不加new调用会报错（JavaScript 不允许对undefined添加属性）。
 * @param foo
 * @param bar
 * @constructor
 */
function Fubar(foo, bar) {
    'use strict'
    thidsdass._foo = foo;
    this._bar = bar;
}


/**
 * 使用安全模式
 * 构造函数内部判断是否使用new命令，如果发现没有使用，则直接返回一个实例对象。
 * @param foo
 * @param bar
 * @returns {Fubar}
 * @constructor
 */
function Fubar(foo, bar) {
    if (!(this instanceof Fubar)) {
        return new Fubar(foo, bar);
    }
    this._foo = foo;
    this._bar = bar;
}

/**
 * new 命令的原理
 *  1 创建一个空对象，作为将要返回的对象实例。
    2 将这个空对象的原型，指向构造函数的prototype属性。
    3 将这个空对象赋值给函数内部的this关键字。
    4 开始执行构造函数内部的代码。
 *
 *  如果构造函数内部有return语句，而且return后面跟着一个对象，new命令会返回return语句指定的对象；否则，就会不管return语句，返回this对象。
 *  另一方面，如果对普通函数（内部没有this关键字的函数）使用new命令，则会返回一个空对象。
 *
 *
 *  new.target
 *  函数内部可以使用new.target属性。如果当前函数是new命令调用，new.target指向当前函数，否则为undefined。
 **/
function f() {
    if (!new.target) {
        throw new Error('请使用 new 命令调用！');
    }
    // ...
}


// 构造函数作为模板，可以生成实例对象。但是，有时拿不到构造函数，只能拿到一个现有的对象。我们希望以这个现有的对象作为模板，生成新的实例对象，这时就可以使用Object.create()方法。
var person1 = {
    name: '张三',
    age: 38,
    greeting: function () {
        console.log('Hi! I\'m ' + this.name + '.');
    }
};
var person2 = Object.create(person1);
console.log(person2.name); // 张三
console.log(person2.greeting()); // Hi! I'm 张三.