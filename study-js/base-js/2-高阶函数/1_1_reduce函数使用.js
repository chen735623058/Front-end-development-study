/**
 * create by sxf on 2019/2/11.
 * 功能:
 */

// function product(arr) {
//   var rt =   arr.reduce(function(x,y){
//         return x * y
//     })
//
//     return rt;
// }
//
// if(product([1,2,3,4]) === 24){
//     console.log('测试通过');
// }

function string2int(s) {
    // var rt = [];
    // var len = s.length;
    // for(var i = 0 ; i<len ;i++){
    //     rt.push(Math.floor(s/(Math.pow(10,(len-(i+1))))));
    //     s = s.substr(1,s.length);
    // }
    // var rtstr = rt.reduce(function (x,y) {
    //     return x * 10 + y;
    // })
    //
    // return rtstr;
    var rt = [];
    var len = s.length;
    for(var i = 0 ; i<len ;i++){
        rt.push(s.substr(i,1));
    }
    var rtstr ="";
    if( rt.length === 1){
        rtstr = rt[0]/1
    }else{
        rtstr = rt.reduce(function (x,y) {
            return x * 10 + y/1;
        })
    }


    return rtstr;
}

if (string2int('0') === 0 && string2int('12345') === 12345 && string2int('12300') === 12300) {
    if (string2int.toString().indexOf('parseInt') !== -1) {
        console.log('请勿使用parseInt()!');
    } else if (string2int.toString().indexOf('Number') !== -1) {
        console.log('请勿使用Number()!');
    } else {
        console.log('测试通过!');
    }
}
else {
    console.log('测试失败!');
}