/**
 * create by sxf on 2019/2/15.
 * 这种模式的缺点是Child不能传进参数，基本上也就废了。
 */

function inherit(C, P) {
    C.prototype = new P();
}

// 父构造函数
function Parent(name) {
    this.name = name || 'Adam';
}
// 给原型添加say功能
Parent.prototype.say = function () {
    return this.name;
};
// Child构造函数为空
function Child(name) {
}

// 执行继承
inherit(Child, Parent);

var kid = new Child();
console.log(kid.say()); // "Adam"

var kiddo = new Child();
kiddo.name = "Patrick";
console.log(kiddo.say()); // "Patrick"

// 缺点:不能让参数传进给Child构造函数
var s = new Child('Seth');
console.log(s.say()); // "Adam"