/**
 * create by sxf on 2019/3/20.
 * 功能:
 */
// 顶点着色器
var VSHANER_SOURCE =
    `
     attribute vec4 a_Position;
     void main() {
        gl_Position = a_Position; //设置坐标
        gl_PointSize = 10.0; // 设置尺寸
     }`;
// 片元着色器程序
var FSHADER_SOURCE =
    `void main() {
        gl_FragColor = vec4(1.0,0.0,0.0,1.0); // 设置颜色
    }`;

function main() {
    let canvas = document.getElementById('webgl');
    var gl = getWebGLContext(canvas);
    if(!gl){
        console.log('error');
        return;
    }
    // 初始化着色器
    if(!initShaders(gl,VSHANER_SOURCE,FSHADER_SOURCE)){
        console.log('error');
        return;
    }
    // 获取attribute变量的存储位置
    var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
    if(a_Position < 0){
        console.log('error');
        return;
    }
    canvas.onmousedown = function (ev) {
        click(ev,gl,canvas,a_Position);
    }

    // // 将顶点位置传输给attribute变量
    // gl.vertexAttrib3f(a_Position,0.2,0.0,0.0);
     gl.clearColor(0.0,0.0,0.0,1.0);
     gl.clear(gl.COLOR_BUFFER_BIT);
    // gl.drawArrays(gl.POINTS,0,1);
}

var g_points = []; // 鼠标点击位置的数组
function click(ev,gl,canvas,a_Position) {
    var x = ev.clientX;
    var y = ev.clientY;
    var rect = ev.target.getBoundingClientRect();
    x = ((x - rect.left) - canvas.height/2)/(canvas.height/2);
    y = (canvas.width/2 - (y - rect.top))/(canvas.width/2);
    g_points.push(x);
    g_points.push(y);
   // gl.clear(gl.COLOR_BUFFER_BIT);
    var len = g_points.length;
    for(var i=0;i<len;i+=2){
        gl.vertexAttrib3f(a_Position,g_points[i],g_points[i+1],0.0);
        gl.drawArrays(gl.POINTS, 0, 1);
    }
}