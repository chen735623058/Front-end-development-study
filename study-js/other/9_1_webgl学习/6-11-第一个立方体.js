// 顶点着色器
var VSHANER_SOURCE =
    `
        attribute vec4 a_Position;
        attribute vec4 a_Color;
        uniform mat4 u_MvpMatrix;
        varying vec4 v_Color;
        void main() {
            gl_Position =u_MvpMatrix * a_Position;
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
    gl.clearColor(0.0,0.0,0.0,1.0);
    // 开启隐藏面消除
    gl.enable(gl.DEPTH_TEST);

    var u_MvpMatrix = gl.getUniformLocation(gl.program,'u_MvpMatrix');
    // 混合投影
    var mvpMatrix = new Matrix4();
    // 设置视点 视线 和上方向
    var viewMatrix = new Matrix4();
    // 投影矩阵
    var projMatrix = new Matrix4();
    viewMatrix.setLookAt(3,3,7,0,0,0,0,1,0);
    projMatrix.setPerspective(30,canvas.width/canvas.height,1,100);
    mvpMatrix.set(projMatrix).multiply(viewMatrix);
    // 将试图矩阵和投影矩阵传递给参数
    gl.uniformMatrix4fv(u_MvpMatrix,false,mvpMatrix.elements);
    // 开启偏移
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.drawElements(gl.TRIANGLES,n,gl.UNSIGNED_BYTE,0);

}

function initVertexBuffers(gl) {
    var verticesColors = new Float32Array([
        // 立方体的顶点坐标和颜色
        1.0,1.0,1.0,1.0,1.0,1.0,
        -1.0,1.0,1.0,1.0,0.0,1.0,
        -1.0,-1.0,1.0,1.0,0.0,0.0,
        1.0,-1.0,1.0,1.0,1.0,0.0,
        1.0,-1.0,-1.0,0.0,1.0,0.0,
        1.0,1.0,-1.0,0.0,1.0,1.0,
        -1.0,1.0,-1.0,0.0,0.0,1.0,
        -1.0,-1.0,-1.0,0.0,0.0,0.0
    ])

    // 顶点索引
    var indices = new Uint8Array([
        0,1,2,0,2,3, // 前
        0,3,4,0,4,5, // 右
        0,5,6,0,6,1, // 上
        1,6,7,1,7,2, // 左
        7,4,3,7,3,2, // 下
        4,7,6,4,6,5  // 后
    ])
    // 创建缓冲区对象
    var vertexColorbuffer = gl.createBuffer();
    var indexBuffer = gl.createBuffer();
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

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,indices,gl.STATIC_DRAW);

    return indices.length;
}


