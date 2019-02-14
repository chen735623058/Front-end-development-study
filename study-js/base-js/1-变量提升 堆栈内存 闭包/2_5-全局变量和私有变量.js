/**
 * create by sxf on 2019/2/2.
 * 功能:
 */
var a = 12 ,
    b = 13,
    c = 14;

function fn(a) {
    console.log(a, b, c);
    var b = c= a =20;
    console.log(a,b,c);
}
fn(a)

console.log(a, b, c)

