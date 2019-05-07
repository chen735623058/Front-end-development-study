// 顶点着色器
var VSHANER_SOURCE =
    `
        attribute vec4 a_Position;
        attribute vec4 a_Color;
        uniform mat4 u_ProjMatrix;
        varying vec4 v_Color;
        void main() {
            gl_Position = u_ProjMatrix * a_Position;
            v_Color = a_Color;
        }
    `;
// 片元着色器
var FSHADER_SOURCE =
`
    precision highp float; // 需要声明浮点数精度否则报错
    varying vec4 v_Color;
    void main() {
        gl_FragColor = v_Color;
    }
`
function main() {
    let canvas = document.getElementById('webgl');
    // 获取nearFar元素
    var nf = document.getElementById('nearFar');
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

    var n = initVertexBuffers(gl);
    if(n<0){
        console.log("error");
        return;
    }
    var u_ProjMatrix = gl.getUniformLocation(gl.program,'u_ProjMatrix');
    // 设置视点 视线 和上方向
    var projMatrix = new Matrix4();
    // 注册键盘事件响应函数
    document.onkeydown = function (ev) {
        keydown(ev,gl,n,u_ProjMatrix,projMatrix,nf);
    };
    draw(gl,n,u_ProjMatrix,projMatrix,nf);
}
// 视点与 近 远裁剪面的距离
var g_near = 0.0, g_far = 0.5;
function keydown(ev,gl,n,u_ProjMatrix,projMatrix,nf) {
    switch (ev.keyCode){
        case 39: g_near +=0.01;break; //右方向
        case 37: g_near -=0.01;break; //左方向
        case 38: g_far +=0.01;break; //上方向
        case 40: g_far -=0.01;break; //下方向
        default: return;
    }
    draw(gl,n,u_ProjMatrix,projMatrix,nf);
}

function draw(gl,n,u_ProjMatrix,projMatrix,nf) {
    projMatrix.setOrtho(-0.3,0.3,-1.0,1.0,g_near,g_far);
    // 将投影矩阵传递给u_ProjMatrix变量
    gl.uniformMatrix4fv(u_ProjMatrix,false,projMatrix.elements);
    gl.clearColor(0.0,0.0,0.0,1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    nf.innerHTML = 'near:'+Math.round(g_near*100)/100 + ', far:'+Math.round(g_far*100)/100;
    gl.drawArrays(gl.TRIANGLES,0,n);
}



function initVertexBuffers(gl) {
    var verticesColors = new Float32Array([
        // 顶点坐标和颜色
        0.0,0.5,-0.4,0.4,1.0,0.4,
        -0.5,-0.5,-0.4,0.4,1.0,0.4,
        0.5,-0.5,-0.4,1.0,0.4,0.4, // 绿色三角形

        0.5,0.4,-0.2,1.0,0.4,0.4,
        -0.5,0.4,-0.2,1.0,1.0,0.4,
        0.0,-0.6,-0.2,1.0,1.0,0.4, // 黄色三角形

        0.0,0.5,0.0,0.4,0.4,1.0, // 蓝色三角形
        -0.5,0.5,0.0,0.4,0.4,1.0,
        0.5,-0.5,0.0,1.0,0.4,0.4
    ])

    var n = 9;
    // 创建缓冲区对象
    var vertexColorbuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER,vertexColorbuffer);
    gl.bufferData(gl.ARRAY_BUFFER,verticesColors,gl.STATIC_DRAW);
    var FSIZE = verticesColors.BYTES_PER_ELEMENT;
    var a_Position = gl.getAttribLocation(gl.program,'a_Position');
    // 将缓冲区对象分配给 a_Position变量
    gl.vertexAttribPointer(a_Position,3,gl.FLOAT,false,FSIZE * 6,0);
    gl.enableVertexAttribArray(a_Position);
    var a_Color = gl.getAttribLocation(gl.program,'a_Color');
    gl.vertexAttribPointer(a_Color,3,gl.FLOAT,false,FSIZE * 6,FSIZE * 3);
    gl.enableVertexAttribArray(a_Color);
    return n;
}


