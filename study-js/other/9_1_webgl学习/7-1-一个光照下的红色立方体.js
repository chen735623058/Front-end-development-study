// 顶点着色器
var VSHANER_SOURCE =
    `
        attribute vec4 a_Position;
        attribute vec4 a_Color;
        attribute vec4 a_Normal;
        uniform mat4 u_MvpMatrix;
        uniform vec3 u_LightColor;
        uniform vec3 u_LightDirection;
        varying vec4 v_Color;
        void main() {
            gl_Position =u_MvpMatrix * a_Position;
            vec3 normal = normalize(vec3(a_Normal));
            float nDotL = max(dot(u_LightDirection,normal), 0.0);
            vec3 diffuse = u_LightColor * vec3(a_Color) * nDotL;
            v_Color = vec4(diffuse,a_Color.a);
        }
    `;
// 片元着色器
var FSHADER_SOURCE =
    `
    precision mediump float; // 需要声明浮点数精度否则报错
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
    var u_LightColor = gl.getUniformLocation(gl.program,'u_LightColor');
    var u_LightDirection = gl.getUniformLocation(gl.program,'u_LightDirection');
    // 设置光线颜色（白色）
    gl.uniform3f(u_LightColor,1.0,1.0,1.0);
    // 设置光线方向（世界坐标系下的）
    var lightDirection = new Vector3([0.5,3.0,4.0]);
    lightDirection.normalize(); // 归一化
    gl.uniform3fv(u_LightDirection,lightDirection.elements);

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
    let v0  = [1.0,1.0,1.0];
    let v1  = [-1.0,1.0,1.0];
    let v2  = [-1.0,-1.0,1.0];
    let v3  = [1.0,-1.0,1.0];
    let v4  = [1.0,-1.0,-1.0];
    let v5  = [1.0,1.0,-1.0];
    let v6  = [-1.0,1.0,-1.0];
    let v7  = [-1.0,-1.0,-1.0];



    var vertices = new Float32Array([
        // 立方体的顶点坐标和颜色
        ...v0,...v1,...v2,...v3,
        ...v0,...v3,...v4,...v5,
        ...v0,...v5,...v6,...v1,
        ...v1,...v6,...v7,...v2,
        ...v2,...v3,...v4,...v7,
        ...v4,...v7,...v6,...v5
    ])

    // 顶点索引
    var indices = new Uint8Array([
        0,1,2,0,2,3, // 前
        4,5,6,4,6,7, // 右
        8,9,10,8,10,11, // 上
        12,13,14,12,14,15, // 左
        16,17,18,16,18,19, // 下
        20,21,22,20,22,23 // 后
    ])


    var color = new Float32Array([
        1.0,0.0,0.0, 1.0,0.0,0.0, 1.0,0.0,0.0, 1.0,0.0,0.0,
        1.0,0.0,0.0, 1.0,0.0,0.0, 1.0,0.0,0.0, 1.0,0.0,0.0,
        1.0,0.0,0.0, 1.0,0.0,0.0, 1.0,0.0,0.0, 1.0,0.0,0.0,
        1.0,0.0,0.0, 1.0,0.0,0.0, 1.0,0.0,0.0, 1.0,0.0,0.0,
        1.0,0.0,0.0, 1.0,0.0,0.0, 1.0,0.0,0.0, 1.0,0.0,0.0,
        1.0,0.0,0.0, 1.0,0.0,0.0, 1.0,0.0,0.0, 1.0,0.0,0.0,
        1.0,0.0,0.0, 1.0,0.0,0.0, 1.0,0.0,0.0, 1.0,0.0,0.0,
        1.0,0.0,0.0, 1.0,0.0,0.0, 1.0,0.0,0.0, 1.0,0.0,0.0,
    ])

    var normals = new Float32Array([
        // 法向量
        0.0,0.0,1.0, 0.0,0.0,1.0, 0.0,0.0,1.0, 0.0,0.0,1.0,
        1.0,0.0,0.0, 1.0,0.0,0.0, 1.0,0.0,0.0, 1.0,0.0,0.0,
        0.0,1.0,0.0, 0.0,1.0,0.0, 0.0,1.0,0.0, 0.0,1.0,0.0,
        -1.0,0.0,0.0,  -1.0,0.0,0.0, -1.0,0.0,0.0, -1.0,0.0,0.0,
        0.0,-1.0,0.0, 0.0,-1.0,0.0, 0.0,-1.0,0.0, 0.0,-1.0,0.0,
        0.0,0.0,-1.0, 0.0,0.0,-1.0, 0.0,0.0,-1.0, 0.0,0.0,-1.0
    ])

    // 创建缓冲区对象
    var indexBuffer = gl.createBuffer();
    if(!initArrayBuffer(gl,vertices,3,gl.FLOAT,'a_Position')){
        return -1;
    }
    if(!initArrayBuffer(gl,color,3,gl.FLOAT,'a_Color')){
        return -1;
    }
    if(!initArrayBuffer(gl,normals,3,gl.FLOAT,'a_Normal')){
        return -1;
    }
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,indices,gl.STATIC_DRAW);

    return indices.length;
}


function initArrayBuffer(gl,data,num,type,attribute) {
    // 创建缓冲区对象
    var buffer = gl.createBuffer();

    gl.bindBuffer(gl.ARRAY_BUFFER,buffer);
    gl.bufferData(gl.ARRAY_BUFFER,data,gl.STATIC_DRAW);
    var a_attribute = gl.getAttribLocation(gl.program,attribute);
    // 将缓冲区对象分配给 a_Position变量
    gl.vertexAttribPointer(a_attribute,num,type,false,0,0);
    gl.enableVertexAttribArray(a_attribute);
    return true;
}


