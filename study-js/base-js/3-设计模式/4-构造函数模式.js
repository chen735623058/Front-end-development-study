/**
 * create by sxf on 2019/2/13.
 * 功能: 基于构造函数创建自定义类
 *  （constructor）
 *  1  在普通函数执行的基础上 new xxx（）执行 这样就是构造函数执行，当前的函数名为类名， 接收的返回结果是当前类的实例
 *  2 自己创建的类最好第一个单词首字母大写
 */

function fn() {
    
}

var f = new fn()

/**
 * Js中创建值有两种方式
 * 1  字面量表达式  var obj = {};
 * 2  构造函数模式   new
 *  引用类型  创建出来的都是引用类型
 *  基本类型  基于字面量方式创建出来的值是基本类型  基于构造函数创建出来的值 是引用类型
 */