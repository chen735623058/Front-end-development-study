/**
 * create by sxf on 2019/2/15.
 * 
 */
 // 缺点 没有接受到参数
function inherit(C, P) {
    C.prototype = P.prototype;
}

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
}

inherit(Child, Parent);

var kid = new Child('Patrick');
console.log(kid.name); // undefined
console.log(typeof kid.say); // function
kid.name = 'Patrick';
console.log(kid.say()); // Patrick
console.dir(kid);