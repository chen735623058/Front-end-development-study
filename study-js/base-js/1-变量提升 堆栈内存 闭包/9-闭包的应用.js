/**
 * create by sxf on 2019/2/2.
 * 功能:  函数形成一个私有的作用域 保护里面的私有变量不收外界的干扰 这种保护机制称之为 闭包
 *        市面上的开发者 认为的闭包：形成一个不销毁的私有作用域（私有栈内存） 才是闭包
 */

/**
 *  柯理化函数思想
 * function fn() {
    return function () {

    }
  }
 var  f = fn();
 */
/**
 *  闭包 惰性函数
var utils = (function () {
    return {

    }
})();
**/

 //真实项目中为了保证JS的性能 少用闭包
// 闭包具有保护作用 保护私有变量不收外界干扰 为了防止全局变量过多减少全局变量使用
// 闭包具有保存作用 形成不销毁的栈内存 把一些值保存下来 方便后面的调取使用
// jquery 把需要暴露的方法抛出到全局
// zepto 基于return 机制
//gh

// 解决方案 1  自定义属性
for (var i = 0; i < array.length; i++) {
   array[i].myindex = i;
   array[i].onclick = function () {
       changeTab(this.myindex);
   }
}

//解决方法2

for (var i = 0; i < array.length; i++) {
    array[i].onclick = (
        function (n) {
            var i = n;
            return function () {
                changeTab(i)
            }
        }
    )(i)
}