/**
 * create by sxf on 2019/2/2.
 * 功能:
 */
var  a = 10, b =10;
let fn = function () {
    var  a = b = 20;
    console.log(a, b);
}
fn();
console.log(a, b);