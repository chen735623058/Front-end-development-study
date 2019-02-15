/**
 * create by sxf on 2019/2/15.
 * 功能:
 */

//  节点接口属性
console.log(document.nodeType === Node.DOCUMENT_NODE); //表示节点的类型
var di = document.getElementById('di')
console.log(di.nodeName); // 节点的名称
console.log(document.getElementById('divA').textContent); // 返回当前节点和后代所有节点的文本内容
console.log(document.baseURI); // 返回当前网页的绝对路径 该属性的值一般由当前网址的 URL（即window.location属性）决定，但是可以使用 HTML 的<base>标签，改变该属性的值。 <base href="http://www.example.com/page.html">
var d = p.ownerDocument; //ownerDocument属性返回当前节点所在的顶层文档对象，即document对象。
var div1 = document.getElementById('d1');
var div2 = document.getElementById('d2');
d1.nextSibling === d2 // true Node.nextSibling属性返回紧跟在当前节点后面的第一个同级节点。如果当前节点后面没有同级节点，则返回null。
/**
 * 遍历所有子节点
 */
var el = document.getElementById('div1').firstChild;

while (el !== null) {
    console.log(el.nodeName);
    el = el.nextSibling;
}
// previousSibling属性返回当前节点前面的、距离最近的一个同级节点。如果当前节点前面没有同级节点，则返回null。
// parentNode属性返回当前节点的父节点。对于一个节点来说，它的父节点只可能是三种类型：元素节点（element）、文档节点（document）和文档片段节点（documentfragment）。
// parentElement属性返回当前节点的父元素节点。如果当前节点没有父节点，或者父节点类型不是元素节点，则返回null。 由于父节点只可能是三种类型：元素节点、文档节点（document）和文档片段节点（documentfragment）。parentElement属性相当于把后两种父节点都排除了。
// firstChild属性返回当前节点的第一个子节点，如果当前节点没有子节点，则返回null。
// childNodes属性返回一个类似数组的对象（NodeList集合），成员包括当前节点的所有子节点。
// isConnected属性返回一个布尔值，表示当前节点是否在文档之中。



//  节点接口方法
// appendChild方法接受一个节点对象作为参数，将其作为最后一个子节点，插入当前节点。该方法的返回值就是插入文档的子节点。
// hasChildNodes方法返回一个布尔值，表示当前节点是否有子节点。
/**
 * hasChildNodes方法结合firstChild属性和nextSibling属性，可以遍历当前节点的所有后代节点。
 * @param parent
 * @param callback
 * @constructor
 */
function DOMComb(parent, callback) {
    if (parent.hasChildNodes()) {
        for (var node = parent.firstChild; node; node = node.nextSibling) {
            DOMComb(node, callback);
        }
    }
    callback(parent);
}
DOMComb(document.body, console.log)
// cloneNode方法用于克隆一个节点。它接受一个布尔值作为参数，表示是否同时克隆子节点。它的返回值是一个克隆出来的新节点。
// insertBefore方法用于将某个节点插入父节点内部的指定位置。
// removeChild方法接受一个子节点作为参数，用于从当前节点移除该子节点。返回值是移除的子节点。
/**
 * 下面是如何移除当前节点的所有子节点。
 */
function removeALLChild() {
    var element = document.getElementById('top');
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}
// replaceChild方法用于将一个新的节点，替换当前节点的某一个子节点。
// contains方法返回一个布尔值，表示参数节点是否满足以下三个条件之一。
// isEqualNode方法返回一个布尔值，用于检查两个节点是否相等。所谓相等的节点，指的是两个节点的类型相同、属性相同、子节点相同。
// isSameNode方法返回一个布尔值，表示两个节点是否为同一个节点。
// normailize方法用于清理当前节点内部的所有文本节点（text）。它会去除空的文本节点，并且将毗邻的文本节点合并成一个，也就是说不存在空的文本节点，以及毗邻的文本节点。
// getRootNode方法返回当前节点所在文档的根节点。




// NodeList 接口 NodeList实例很像数组，可以使用length属性和forEach方法。但是，它不是数组，不能使用pop或push之类数组特有的方法。
// 如果NodeList实例要使用数组方法，可以将其转为真正的数组。
var children = document.body.childNodes;
var nodeArr = Array.prototype.slice.call(children);
// 除了使用forEach方法遍历 NodeList 实例，还可以使用for循环。
var children = document.body.childNodes;
for (var i = 0; i < children.length; i++) {
    var item = children[i];
}

//这三个方法都返回一个 ES6 的遍历器对象，可以通过for...of循环遍历获取每一个成员的信息。区别在于，keys()返回键名的遍历器，values()返回键值的遍历器，entries()返回的遍历器同时包含键名和键值的信息。
var children = document.body.childNodes;
for (var key of children.keys()) {
    console.log(key);
}
// 0
// 1
// 2
// ...
for (var value of children.values()) {
    console.log(value);
}
// #text
// <script>
// ...
for (var entry of children.entries()) {
    console.log(entry);
}
// Array [ 0, #text ]
// Array [ 1, <script> ]
// ..





// HTMLCollection 接口 HTMLCollection是一个节点对象的集合，只能包含元素节点（element） 但是与NodeList接口不同，HTMLCollection没有forEach方法，只能使用for循环遍历。
// 返回HTMLCollection实例的，主要是一些Document对象的集合属性，比如document.links、docuement.forms、document.images等。








