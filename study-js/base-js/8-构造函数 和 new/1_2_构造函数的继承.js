/**
 * create by sxf on 2019/2/18.
 * 功能:
 */

function Animal() {
    this.species = '动物';
}

/**
 * 构造函数绑定
 * @param name
 * @param color
 * @constructor
 */
function Cat(name, color) {
    Animal.apply(this, arguments);
    this.name = name;
    this.color = color;
}

var cat1 = new Cat('大黄', '黄色');
console.log(cat1.species);

/**
 * 第二种方法更常见，使用prototype属性。
 * @type {Animal}
 */
Cat.prototype = new Animal();
Cat.prototype.constructor = Cat;
var cat1 = new Cat("大毛", "黄色");

console.log(cat1.species);



/**
 * 利用中介函数继承
 * @param Child
 * @param Parent
 */
function extend(Child, Parent) {
    var F = function () { };

    F.prototype = Parent.prototype;
    Child.prototype = new F();
    Child.prototype.constructor = Child;
    Child.uber = Parent.prototype;

}