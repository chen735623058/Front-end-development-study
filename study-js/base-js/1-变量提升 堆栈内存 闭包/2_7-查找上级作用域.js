/**
 * create by sxf on 2019/2/2.
 * 功能: 函数A的在上级作用域和他在哪执行没关系 和他在哪创建有关系
 */
// 'use strict'
// var a = 12;
// function fn(){
//     // arguments,callee 当前函数本身
//     // arguments.callee.caller  当前函数在哪执行
//     console.log(arguments.callee);
// }
//
// function sum() {
//     var a = 120;
//     fn();
// }
//
// sum();
var n = 10;
function fn() {
    var n = 20;
    function f() {
        n++;
        console.log(n);
    }
    f();
    return f;
}
var x = fn();
x();
x();
console.log(n);