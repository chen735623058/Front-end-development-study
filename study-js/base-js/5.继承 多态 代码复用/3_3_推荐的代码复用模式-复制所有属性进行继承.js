/**
 * create by sxf on 2019/2/14.
 * 功能:
 */
// 浅拷贝
/* 浅拷贝 */
function extend(parent, child) {
    var i;
    child = child || {};
    for (i in parent) {
        if (parent.hasOwnProperty(i)) {
            child[i] = parent[i];
        }
    }
    return child;
}

var dad = { name: "Adam" };
var kid = extend(dad);
console.log(kid.name); // "Adam"

var dad = {
    counts: [1, 2, 3],
    reads: { paper: true }
};
var kid = extend(dad);
kid.counts.push(4);
console.log(dad.counts.toString()); // "1,2,3,4"
console.log(dad.reads === kid.reads); // true


//深拷贝

/* 深拷贝 */
function extendDeep(parent, child) {
    var i,
        toStr = Object.prototype.toString,
        astr = "[object Array]";

    child = child || {};

    for (i in parent) {
        if (parent.hasOwnProperty(i)) {
            if (typeof parent[i] === 'object') {
                child[i] = (toStr.call(parent[i]) === astr) ? [] : {};
                extendDeep(parent[i], child[i]);
            } else {
                child[i] = parent[i];
            }
        }
    }
    return child;
}

var dad = {
    counts: [1, 2, 3],
    reads: { paper: true }
};
var kid = extendDeep(dad);

kid.counts.push(4);
console.log(kid.counts.toString()); // "1,2,3,4"
console.log(dad.counts.toString()); // "1,2,3"

console.log(dad.reads === kid.reads); // false
kid.reads.paper = false;