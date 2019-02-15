/**
 * create by sxf on 2019/2/15.
 * 该模式是Child借用Parent的构造函数进行apply，然后将child的this和参数传递给apply方法：
 */

// 父构造函数
function Parent(name) {
    this.name = name || 'Adam';
}

// 给原型添加say功能
Parent.prototype.say = function () {
    return this.name;
};

// Child构造函数
function Child(name) {
    Parent.apply(this, arguments);
}

var kid = new Child("Patrick");
console.log(kid.name); // "Patrick"

// 缺点：没有从构造函数上继承say方法  缺点也很明显，say方法不可用，因为没有继承过来。
console.log(typeof kid.say); // "undefined"