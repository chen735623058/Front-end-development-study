/**
 * create by sxf on 2019/2/2.
 * 功能:
 */
// console.log(a);
// if('a' in window){
//     var a = 100;
// }
// console.log(a);

f = function () {
    return true;
};
g = function () {
    return false;
}

~function () {
   if (g() && [] == ![]){
       f = function () {
           return false;
       };
       function g() {
           return true;
       }
   }
}();

console.log(f());
console.log(g());