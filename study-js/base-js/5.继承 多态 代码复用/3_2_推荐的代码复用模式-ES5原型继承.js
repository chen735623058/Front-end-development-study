/**
 * create by sxf on 2019/2/14.
 * 功能:
 */
// 首先，定义一个新对象man
var man = Object.create(null);

// 接着，创建包含属性的配置设置
// 属性设置为可写，可枚举，可配置
var config = {
    writable: true,
    enumerable: true,
    configurable: true
};

// 通常使用Object.defineProperty()来添加新属性(ECMAScript5支持）
// 现在，为了方便，我们自定义一个封装函数
var defineProp = function (obj, key, value) {
    config.value = value;
    Object.defineProperty(obj, key, config);
}

defineProp(man, 'car', 'Delorean');
defineProp(man, 'dob', '1981');
defineProp(man, 'beard', false);

var driver = Object.create( man );
defineProp (driver, 'topSpeed', '100mph');
console.log(driver.topSpeed); // 100mph