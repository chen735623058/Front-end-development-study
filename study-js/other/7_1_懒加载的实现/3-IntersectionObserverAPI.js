/**
 * create by sxf on 2019/2/28.
 * 功能:
 */
let io = new IntersectionObserver(lazyload,{});
let lanchongelement = document.getElementById('lanchong');
function openObserver() {
    io.observe(lanchongelement);

}
function closeObserver() {
    io.unobserve(lanchongelement);
    io.disconnect();
}
function callbackfun(entries) {
    console.log("callbackfun"+ entries);
    console.log("rootBounds:");
    console.log(entries[0].rootBounds);
    console.log("intersectionRatio");
    console.log(entries[0].intersectionRatio);

}

// 实现懒加载
function lazyload(entries) {
    entries.forEach(function(change) {
        if(entries[0].intersectionRatio>0){
            var container = change.target;
            var content = container.querySelector('template').content;
            container.appendChild(content);
            io.unobserve(container);
        }

    });
}


