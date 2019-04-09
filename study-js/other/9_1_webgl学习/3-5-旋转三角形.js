/**
 * create by sxf on 2019/3/20.
 * 功能:
 */
// 顶点着色器
var VSHANER_SOURCE =
    // x1 = xcosb -ysinb
    // y1 = xsinb + ycosb
    // z1 = z
    `
     attribute vec4 a_Position;
     uniform float u_CosB, u_SinB;
     void main() {
        gl_Position.x = a_Position.x * u_CosB - a_Position.y * u_SinB; //设置坐标
        gl_Position.y = a_Position.x * u_SinB + a_Position.y * u_CosB; //设置坐标
        gl_Position.z = a_Position.z; //设置坐标
        gl_Position.w = 1.0 ; //设置坐标
     }`;
// 片元着色器程序
var FSHADER_SOURCE =
    `void main() {
        gl_FragColor = vec4(1.0,0.0,0.0,1.0); // 设置颜色
    }`;

// 旋转的角度
var ANGLE = 90.0;
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
    var radian = Math.PI * ANGLE /180.0 ; //转为弧度制
    var cosB = Math.cos(radian);
    var sinB = Math.sin(radian);
    var u_CosB = gl.getUniformLocation(gl.program,'u_CosB');
    var u_SinB = gl.getUniformLocation(gl.program,'u_SinB');
    gl.uniform1f(u_CosB,cosB);
    gl.uniform1f(u_SinB,sinB);

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
