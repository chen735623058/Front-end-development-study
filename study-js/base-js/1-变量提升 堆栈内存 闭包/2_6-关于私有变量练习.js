/**
 * create by sxf on 2019/2/2.
 * 功能:
 */
var ary = [12 , 23];

function  fn(ary) {
    console.log(ary);
    ary[0] = 100;
    ary = [100];
    ary[0] = 0 ;
    console.log(ary);
}

fn(ary)
console.log(ary);
//
// 12,13
// 0
// 0