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
    var u_MvpMatrix = gl.getUniformLocation(gl.program,'u_MvpMatrix');

    // 模型矩阵
    var modelMatrix = new Matrix4();

    // 设置视点 视线 和上方向
    var viewMatrix = new Matrix4();
    // 投影矩阵
    var projMatrix = new Matrix4();
    // 混合投影
    var mvpMatrix = new Matrix4();


    // 计算视图矩阵和投影矩阵
    modelMatrix.setTranslate(0.75,0,0);// 平移0.75单位
    viewMatrix.setLookAt(0,0,5,0,0,-200,0,1,0);
    projMatrix.setPerspective(30,canvas.width/canvas.height,1,100);

    mvpMatrix.set(projMatrix).multiply(viewMatrix).multiply(modelMatrix);

    // 将试图矩阵和投影矩阵传递给参数
    gl.uniformMatrix4fv(u_MvpMatrix,false,mvpMatrix.elements);

    gl.clearColor(0.0,0.0,0.0,1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLES,0,n);

    modelMatrix.setTranslate(-0.75,0,0);
    mvpMatrix.set(projMatrix).multiply(viewMatrix).multiply(modelMatrix);
    gl.uniformMatrix4fv(u_MvpMatrix,false,mvpMatrix.elements);
    gl.drawArrays(gl.TRIANGLES,0,n);

}

function initVertexBuffers(gl) {
    var verticesColors = new Float32Array([
        0.0,1.0,-4.0,0.4,1.0,0.4,
        -0.5,-1.0,-4.0,0.4,1.0,0.4,
        0.5,-1.0,-4.0,1.0,0.4,0.4,

        0.0,1.0,-2.0,1.0,1.0,0.4,
        -0.5,-1.0,-2.0,1.0,1.0,0.4,
        0.5,-1.0,-2.0,1.0,0.4,0.4,

        0.0,1.0,0.0,0.4,0.4,1.0,
        -0.5,-1.0,0.0,0.4,0.4,1.0,
        0.5,-1.0,0.0,1.0,0.4,0.4,

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

//
// var g_eyeX = 0.20,g_eyeY=0.25,g_eyeZ=0.25;
// function keydown(ev,gl,n,u_ViewMatrix,viewMatrix) {
//     if(ev.keyCode == 39){
//         // 按下右键
//         g_eyeX += 0.01;
//     }else if(ev.keyCode == 37){
//         // 按下左键
//         g_eyeX -= 0.01;
//     }else{
//         //按下其他键
//         return ;
//     }
//     draw(gl,n,u_ViewMatrix,viewMatrix)
// }
//
//
// function draw(gl,n,u_ViewMatrix,viewMatrix) {
//     // 设置视点和视线
//     viewMatrix.setLookAt(g_eyeX,g_eyeY,g_eyeZ,0,0,0,0,1,0);
//     // 将试图矩阵传给 u_ViewMatrix变量
//     gl.uniformMatrix4fv(u_ViewMatrix,false,viewMatrix.elements);
//     gl.clearColor(0.0,0.0,0.0,1.0);
//     gl.clear(gl.COLOR_BUFFER_BIT);
//     gl.drawArrays(gl.TRIANGLES,0,n);
// }


