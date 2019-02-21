/*
 * @Date: 2019-02-19 11:52:41
 * @LastEditors: sunxiaofan
 * @LastEditTime: 2019-02-21 11:31:42
 */

// 普通阶乘函数
const  factorial = n => {
    if(n === 1){
        return 1
    } else{
        return factorial(n-1) * n;
    }
}
console.time("factorial方法耗时");
console.log(factorial(10));
console.timeEnd("factorial方法耗时");

// 使用了memoization
const cache = []
const factorial_memoization = n => {
    if(n===1){
        return 1;
    } else if (cache[n-1]){
        return cache[n-1];
    } else {
        let reault = factorial_memoization(n-1) * n
        cache[n-1] = reault;
        return reault;
    }
}
console.time("factorial_memoization方法耗时");
console.log(factorial_memoization(10));;
console.timeEnd("factorial_memoization方法耗时");


// 常见的闭包形式
const factorialMemo = () => {
    const cache = []
    const factorial = n => {
        if (n === 1) {
            return 1
        } else if (cache[n - 1]) {
            console.log(`get factorial(${n}) from cache...`)
            return cache[n - 1]
        } else {
            let result = factorial(n - 1) * n
            cache[n - 1] = result
            return result
        }
    }
    return factorial
};
const factorialMemofun = factorialMemo();
console.time("factorialMemofun方法耗时");
console.log(factorialMemofun(10));;
console.timeEnd("factorialMemofun方法耗时");