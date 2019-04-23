/**
 * create by sxf on 2019/4/22.
 * 功能:
 */
// 顶点着色器
var VSHANER_SOURCE =
    `
     attribute vec4 a_Position;
     attribute vec4 a_Color;
     void main() {
        gl_Position = a_Position; //设置坐标
        gl_PointSize = 10.0; // 设置尺寸
     }`;
// 片元着色器程序
var FSHADER_SOURCE =
    `
    precision mediump float; // 需要声明浮点数精度否则报错
    uniform float u_Width;
    uniform float u_Height;
    void main() {
        gl_FragColor = vec4(gl_FragCoord.x/u_Width,0.0,gl_FragCoord.y/u_Height,1.0);
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
    //******* 设置顶点的位置********
    var n=initVertexBuffers(gl);
    if(n<0){
        console.log("error");
        return;
    }

    gl.clearColor(0.0,0.0,0.0,1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLES,0,n);
}

function initVertexBuffers(gl) {
    var verticesSize = new Float32Array([
        0.0,0.5,1.0,0.0,0.0,
        -0.5,-0.5,0.0,1.0,0.0,
        0.5,-0.5,0.0,0.0,1.0
    ]);
    var n =3 ; // 点的个数
    // 创建缓冲区对象
    var vertexsizeBuffer = gl.createBuffer();
    if(! vertexsizeBuffer){
        console.log("error");
        return -1;
    }
    // 将缓冲区对象绑定到目标
    gl.bindBuffer(gl.ARRAY_BUFFER,vertexsizeBuffer);
    gl.bufferData(gl.ARRAY_BUFFER,verticesSize,gl.STATIC_DRAW);
    var FSIZE = verticesSize.BYTES_PER_ELEMENT;
    var a_Position = gl.getAttribLocation(gl.program,'a_Position');
    // 将缓冲区对象分配给 a_Position变量
    gl.vertexAttribPointer(a_Position,2,gl.FLOAT,false,FSIZE * 5,0);
    gl.enableVertexAttribArray(a_Position);
    // 给 uniform 变量赋值
    var w = gl.drawingBufferWidth;
    var h = gl.drawingBufferHeight;
    console.log(w);
    console.log(h);
    var u_Width = gl.getUniformLocation(gl.program,'u_Width');
    var u_Height = gl.getUniformLocation(gl.program,'u_Height');
    gl.uniform1f(u_Width,w);
    gl.uniform1f(u_Height,h);
    return n;
}
