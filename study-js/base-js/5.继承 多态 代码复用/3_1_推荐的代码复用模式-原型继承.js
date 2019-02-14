/**
 * create by sxf on 2019/2/14.
 * 功能: 代码复用模式最佳实践
 */


/**
 * 原型式继承
 */
function object(o) {
    function F() {

    }
    F.prototype = o;
    return new F();
}
var parent = {
    name:'sxf'
};
var child = object(parent);
console.log(child.name);

// 父构造函数
function Person() {
    this.name = 'Admin';
}

Person.prototype.getName = function () {
    return this.name;
};

var sxf = new Person();
var sxfkid = object(sxf);
console.log(sxfkid.getName());


var sxfkid2 = object(Person.prototype);
console.log(typeof sxfkid2.getName); //  ‘function’因为实在原型里面定义了函数
console.log(typeof sxfkid2.name); // undefined 因为只继承了原型




