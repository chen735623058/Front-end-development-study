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
    `
    precision mediump float;
    uniform vec4 u_FragColor;
    void main() {
        gl_FragColor = u_FragColor; // 设置颜色
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
    // 获取u_FragColor变量的存储位置
    var u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor');
    if(a_Position < 0){
        console.log('error');
        return;
    }

    canvas.onmousedown = function (ev) {
        click(ev,gl,canvas,a_Position,u_FragColor);
    }

    // // 将顶点位置传输给attribute变量
    // gl.vertexAttrib3f(a_Position,0.2,0.0,0.0);
     gl.clearColor(0.0,0.0,0.0,1.0);
     gl.clear(gl.COLOR_BUFFER_BIT);
    // gl.drawArrays(gl.POINTS,0,1);
}

var g_points = []; // 鼠标点击位置的数组
var g_colors = []; // 鼠标点击颜色的数组
function click(ev,gl,canvas,a_Position,u_FragColor) {
    var x = ev.clientX;
    var y = ev.clientY;
    var rect = ev.target.getBoundingClientRect();
    x = ((x - rect.left) - canvas.height/2)/(canvas.height/2);
    y = (canvas.width/2 - (y - rect.top))/(canvas.width/2);
    g_points.push([x,y]);

    if(x >=0.0 && y>=0.0){
        g_colors.push([1.0,0.0,0.0,1.0]);
    }else if(x <0.0 && y<0.0){
        g_colors.push([1.0,1.0,0.0,1.0]);
    }else{
        g_colors.push([1.0,1.0,1.0,1.0]);
    }

    gl.clear(gl.COLOR_BUFFER_BIT);
    var len = g_points.length;
    for(var i=0;i<len;i++){
        var xy = g_points[i];
        var rgba = g_colors[i];
        gl.vertexAttrib3f(a_Position,xy[0],xy[1],0.0);
        // 将点的颜色传输到 u_FragColor 变量中
        gl.uniform4f(u_FragColor,rgba[0],rgba[1],rgba[2],rgba[3])
        gl.drawArrays(gl.POINTS, 0, 1);
    }
}