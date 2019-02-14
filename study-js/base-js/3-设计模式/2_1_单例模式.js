/**
 * create by sxf on 2019/2/12.
 * 功能:  单例设计模式
 * 1. 表现形式
 * var 0bj = {xxx:xxx,...};
 * 2. 作用
 * 把描述同有一件事物的属性和特征进行“分组、归类”(存储在同一个堆内存当中)，因此避免了全局变量之间的冲突和污染
 * 3. 单例设计模式命名的由来
 * 每一个命名空间都是JS中Object 内置积累的实例， 而实例之间是相互独立互不干扰的 所以我们把它们成为 ‘单独的实例’
 */


/**
 * 高级单例模式
 * 1  在给命名空间赋值的时候 不是直接赋值一个对象，而是限制性匿名函数形成一个私有作用域A（不销毁的栈内存），在A中创建一个堆内存，把堆内存地址赋值给命名空间
 * 2  这个模式的好处 我们完全可以再A中创建很多内容（变量or函数）,哪些需要供外面电渠使用，我们暴露到返回的对象中（模块化实现的的一种思想）
 */

var nameSpace = (function () {
    var n = 12;
    function fn() {
        //...
   }
   function sum() {

   }
   return {
       fn:fn,
       sum:sum
   }
})()


/*
 * 模块化开发
 *     1. 团队协作
 */