/*
 * @Date: 2019-02-19 11:52:41
 * @LastEditors: sunxiaofan
 * @LastEditTime: 2019-02-21 11:31:42
 */

//原始的fibonacci数列方法
function fibonacci(n) {
    if (n === 0 || n === 1) {
        return n;
    }
    return fibonacci(n - 1) + fibonacci(n - 2);
}

console.time("fibonacci方法耗时");
fibonacci(20);
console.timeEnd("fibonacci方法耗时");

// 使用了Memoization的fibonacci
var fibonacci_memoization = (function () {
    var cache = [];
    return function (n) {
        if(n === 0 || n === 1){
            return n;
        }else{
            cache[n-1] = cache[n-1] || fibonacci_memoization(n-1);
            cache[n-2] = cache[n-2] || fibonacci_memoization(n-2);
            return cache[n-1]+cache[n-2];
        }
    }
})()

console.time("fibonacci_memoization方法耗时");
fibonacci_memoization(20);
console.timeEnd("fibonacci_memoization方法耗时");



