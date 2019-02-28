/**
 * create by sxf on 2019/2/28.
 * 功能:
 */

var $window = $(window);

var lazyImgs = document.getElementsByTagName("img")
// 定义事件函数:
var onScroll = function() {
    // 获取页面滚动的高度:
    var wtop = $window.scrollTop();
    // 判断是否还有未加载的img:
    if (lazyImgs.length > 0) {
        // 获取可视区域高度:
        var wheight = $window.height();
        // 循环处理数组的每个img元素:
        for(var i=0; i<lazyImgs.length; i++) {
            // 判断您是否在可视范围内
            if (lazyImgs[i].offsetTop - wtop < wheight) {
                // 设置src属性:
                lazyImgs[i].src = lazyImgs[i].getAttribute('data-src');
            }

        }
    }
};
// 绑定事件:
$window.scroll(onScroll);
// 手动触发一次:
onScroll()