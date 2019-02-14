/**
 * create by sxf on 2019/2/14.
 * 功能:
 */

// Car
var Car = function (settings) {
    this.model = settings.model || 'no model provided';
    this.colour = settings.colour || 'no colour provided';
};

// Mixin
var Mixin = function () { };
Mixin.prototype = {
    driveForward: function () {
        console.log('drive forward');
    },
    driveBackward: function () {
        console.log('drive backward');
    }
};


// 定义的2个参数分别是被混入的对象（reciving）和从哪里混入的对象（giving)
function augment(receivingObj, givingObj) {
    // 如果提供了指定的方法名称的话，也就是参数多余3个
    if (arguments[2]) {
        for (var i = 2, len = arguments.length; i < len; i++) {
            receivingObj.prototype[arguments[i]] = givingObj.prototype[arguments[i]];
        }
    }
    // 如果不指定第3个参数，或者更多参数，就混入所有的方法
    else {
        for (var methodName in givingObj.prototype) {
            // 检查receiving对象内部不包含要混入的名字，如何包含就不混入了
            if (!receivingObj.prototype[methodName]) {
                receivingObj.prototype[methodName] = givingObj.prototype[methodName];
            }
        }
    }
}

// 给Car混入属性，但是值混入'driveForward' 和 'driveBackward'*/
augment(Car, Mixin, 'driveForward', 'driveBackward');

// 创建新对象Car
var vehicle = new Car({ model: 'Ford Escort', colour: 'blue' });

// 测试是否成功得到混入的方法
vehicle.driveForward();
vehicle.driveBackward();