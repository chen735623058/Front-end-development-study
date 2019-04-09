/**
 * create by sxf on 2019/3/20.
 * 功能:
 */
// 顶点着色器
var VSHANER_SOURCE =
    `
     attribute vec4 a_Position;
     uniform vec4 u_Translation;
     void main() {
        gl_Position = a_Position + u_Translation; //设置坐标
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
    //******* 设置顶点的位置********
    var n=initVertexBuffers(gl);
    if(n<0){
        console.log("error");
        return;
    }
    var Tx = 0.5 ,Ty = 0.5, Tz = 0.0;
    var u_Translation = gl.getUniformLocation(gl.program,'u_Translation');
    gl.uniform4f(u_Translation,Tx,Ty,Tz,0.0);

    gl.clearColor(0.0,0.0,0.0,1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLES,0,n);
}

function initVertexBuffers(gl) {
    var vertices = new Float32Array([
      0.0,0.5,-0.5,-0.5,0.5,-0.5
    ]);
    var n =3 ; // 点的个数
    // 创建缓冲区对象
    var vertexBuffer = gl.createBuffer();
    if(! vertexBuffer){
        console.log("error");
        return -1;
    }
    // 将缓冲区对象绑定到目标
    gl.bindBuffer(gl.ARRAY_BUFFER,vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER,vertices,gl.STATIC_DRAW);
    var a_Position = gl.getAttribLocation(gl.program,'a_Position');
    // 将缓冲区对象分配给 a_Position变量
    gl.vertexAttribPointer(a_Position,2,gl.FLOAT,false,0,0);
    gl.enableVertexAttribArray(a_Position);
    return n;
}
