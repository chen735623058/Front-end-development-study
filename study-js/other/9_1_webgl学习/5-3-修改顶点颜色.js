// 顶点着色器
var VSHANER_SOURCE =
    `
     attribute vec4 a_Position;
     attribute vec4 a_Color;
     varying vec4 v_Color;
     void main() {
        gl_Position = a_Position; //设置坐标
        gl_PointSize = 10.0; // 设置尺寸
        v_Color = a_Color;  // 将数据传给片元着色器
     }`;
// 片元着色器程序
var FSHADER_SOURCE =
    `
    precision mediump float; // 需要声明浮点数精度否则报错
    varying vec4 v_Color;
    void main() {
        gl_FragColor = v_Color; // 设置颜色
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
    var a_Color = gl.getAttribLocation(gl.program,'a_Color');
    gl.vertexAttribPointer(a_Color,3,gl.FLOAT,false,FSIZE * 5,FSIZE * 2);
    gl.enableVertexAttribArray(a_Color);
    return n;
}
