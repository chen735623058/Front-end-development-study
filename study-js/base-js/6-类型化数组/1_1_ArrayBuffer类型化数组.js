/**
 * create by sxf on 2019/2/15.
 * 功能:
 */


// new ArrayBuffer(Bytelength);
var arraybuffer = new ArrayBuffer(8);

//类方法ArrayBuffer.isView() 判断某对象是否为 视图(这是什么？往下看)
var int8a = new Int8Array(arraybuffer);

//类属性ArrayBuffer.length 默认值1，暂未发现用处
ArrayBuffer.length //return 1

//返回的对象具有byteLength属性 值为参数Bytelength

console.log(ArrayBuffer.isView(int8a));
console.log(arraybuffer.byteLength);

console.log(Int8Array.BYTES_PER_ELEMENT);          // 1
console.log(Uint16Array.BYTES_PER_ELEMENT);        // 2
console.log(Int32Array.BYTES_PER_ELEMENT);         // 4
console.log(Float32Array.BYTES_PER_ELEMENT);       // 4
console.log(Float64Array.BYTES_PER_ELEMENT);       // 8


 //数组

var view = new Int16Array([1,653,700,-90,88]);
var view = new Uint8Array(8);
view[0] = 10;
view[1] = 58;
view[2] = 156;
view[7] = 255;


//new Int8Array(arraybuffer,start,length);

//参数
//arraybuffer为ArrayBuffer的实例     必填
//start表示从第几个字节开始            可选（默认从0开始）
//length表示数据个数                  可选（默认到分配的内存末尾）

var arraybuffer = new ArrayBuffer(32);

var aView = new Int16Array(arraybuffer,0,4);    //占用0-7

var bView = new Float32Array(arraybuffer,8,5);  //占用8-27

var cView = new Uint8Array(arraybuffer,28,8)    //仅剩4个,报错Invalid typed array length


// 万一在分配视图空间的时候，两个试图空间重叠了会发生什么呢？举个例子：
// 两个相互重叠的视图所占据的内存空间，存在其中的值以最后一次写进去的为主。
var arraybuffer = new ArrayBuffer(4);

var aView = new Int8Array(arraybuffer);  //从0开始到内存末尾

var bView = new Int8Array(arraybuffer,2); //从2开始到末尾

aView[0] = 1;
aView[1] = 2;
aView[2] = 3;
aView[3] = 4;

bView[0] = 9;
bView[1] = 8;

console.log(aView[2] );      //return   9
console.log(aView[3] );      //return   8


//ArrayBuffer与字符串

function Uint162Str(arraybuffer){
    return String.fromCharCode.apply(null,new Uint16Array(arraybuffer));
}

function Str2Uint16(str){
    //假设字符串”abc“ length=3,使用16位，则每一个字母占据2字节，总字节为length乘以2
    var arraybuffer =new ArrayBuffer(str.length*2);
    var view = new Uint16Array(arraybuffer);
    for(var i=0,l=str.length;i<l;i++){
        view[i] = str.charCodeAt(i);
    }
    return view;
}