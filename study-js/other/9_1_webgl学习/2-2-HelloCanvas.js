/**
 * create by sxf on 2019/3/20.
 * 功能: 清空界面
 */

function main() {
    // 获取<canvas> 元素
    var canvas = document.getElementById('webgl');
    var gl = getWebGLContext(canvas);
    if(!gl){
        console.log('创建失败');
        return;
    }
    // 指定清空区颜色
    gl.clearColor(0.0,0.0,1.0,1.0);
    // 清空 canvas
    gl.clear(gl.COLOR_BUFFER_BIT);
}