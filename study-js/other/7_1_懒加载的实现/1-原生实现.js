/**
 * create by sxf on 2019/2/28.
 * 功能:
 */

var imgs = document.getElementsByTagName("img")
function lazyload() {
    var scrollTop = window.pageXOffset || document.documentElement.scrollTop || document.body.scrollTop;
    var viewPortSize = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    for(var i=0; i<imgs.length; i++) {
        var x =scrollTop+viewPortSize-imgs[i].offsetTop;
        if(x>0){
            imgs[i].src = imgs[i].getAttribute('data-src');
        }
    }
}
setInterval(lazyload,1000);