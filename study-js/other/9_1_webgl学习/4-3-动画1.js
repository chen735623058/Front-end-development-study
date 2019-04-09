// 顶点着色器
var VSHANER_SOURCE =
    `
     attribute vec4 a_Position;
     uniform mat4 u_ModelMatrix;
     void main() {
        gl_Position = u_ModelMatrix * a_Position;
     }`;
// 片元着色器程序
var FSHADER_SOURCE =
    `void main() {
        gl_FragColor = vec4(1.0,0.0,0.0,1.0); // 设置颜色
    }`;

// 旋转速度
var ANGLE_STEP = 45.0;
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
    // 设置背景色 背景色在动画期间一直起作用
    gl.clearColor(0.0,0.0,0.0,1.0);


    // 将旋转矩阵传入给顶点着色器
    var u_ModelMatrix = gl.getUniformLocation(gl.program, 'u_ModelMatrix');
    // 三角形当前旋转的角度
    var currentAngle = 0.0;
    var modeMatrix = new Matrix4();
    // 开始绘制三角形
    var tick = function () {
        currentAngle = animate(currentAngle); //更新旋转角度
        draw(gl,n,currentAngle,modeMatrix,u_ModelMatrix);
        requestAnimationFrame(tick);
    }
    tick();
}

function initVertexBuffers(gl) {
    var vertices = new Float32Array([
        0.0,0.3,-0.3,-0.3,0.3,-0.3
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


function draw(gl,n,currentAngle,modelMatrix,u_ModelMatrix) {
    modelMatrix.setRotate(currentAngle,0,0,1);
    // 将旋转矩阵传输给顶点着色器
    gl.uniformMatrix4fv(u_ModelMatrix,false,modelMatrix.elements);
    // 清除canvas
    gl.clear(gl.COLOR_BUFFER_BIT);
    // 绘制三角形
    gl.drawArrays(gl.TRIANGLES,0,n);
}
var g_last = Date.now();
function animate(angle) {
    var now = Date.now();
    var elapsed = now - g_last;
    g_last = now;
    // 根据距离上次调用的时间 更新当前旋转的角度
    var newAngle = angle + (ANGLE_STEP * elapsed) / 1000.0
    return newAngle %=360;
}


