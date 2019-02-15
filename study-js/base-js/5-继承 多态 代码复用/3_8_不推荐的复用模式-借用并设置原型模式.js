/**
 * create by sxf on 2019/2/15.
 *
 */
// 缺点 运行起来，一切正常，但是有没有发现，Parent构造函数执行了两次，所以说，虽然程序可用，但是效率很低。
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

Child.prototype = new Parent();

var kid = new Child("Patrick");
console.log(kid.name); // "Patrick"
console.log(typeof kid.say); // function
console.log(kid.say()); // Patrick
console.dir(kid);
delete kid.name;
console.log(kid.say()); // "Adam"