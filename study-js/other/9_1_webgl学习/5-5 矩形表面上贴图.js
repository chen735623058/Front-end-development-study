// 顶点着色器
var VSHANER_SOURCE =
    `
     attribute vec4 a_Position;
     attribute vec2 a_TexCoord;
     varying vec2 v_TexCoord;
     void main() {
        gl_Position = a_Position; //设置坐标
        v_TexCoord = a_TexCoord;
     }`;
// 片元着色器程序
var FSHADER_SOURCE =
    `
    precision mediump float; // 需要声明浮点数精度否则报错
    uniform sampler2D u_Sampler;
    varying vec2 v_TexCoord;
    void main() {
        gl_FragColor = texture2D(u_Sampler,v_TexCoord);
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
    // 配置纹理
    if(!initTextures(gl,n)){
        console.log("error");
        return;
    }

}

function initVertexBuffers(gl) {
    var verticeTexCoords = new Float32Array([
        // 顶点坐标，纹理坐标
        -0.5,0.5,0.0,1.0,
        -0.5,-0.5,0.0,0.0,
        0.5,0.5,1.0,1.0,
        0.5,-0.5,1.0,0.0
    ]);
    var n =4 ; // 点的个数
    // 创建缓冲区对象
    var vertexsizeBuffer = gl.createBuffer();
    if(! vertexsizeBuffer){
        console.log("error");
        return -1;
    }
    // 将顶点坐标和纹理坐标写入缓冲区对象
    gl.bindBuffer(gl.ARRAY_BUFFER,vertexsizeBuffer);
    gl.bufferData(gl.ARRAY_BUFFER,verticeTexCoords,gl.STATIC_DRAW);
    var FSIZE = verticeTexCoords.BYTES_PER_ELEMENT;
    var a_Position = gl.getAttribLocation(gl.program,'a_Position');
    // 将缓冲区对象分配给 a_Position变量
    gl.vertexAttribPointer(a_Position,2,gl.FLOAT,false,FSIZE * 4,0);
    gl.enableVertexAttribArray(a_Position);
    // 将纹理坐标分配给a_TexCoord并启用它
    var a_TexCoord = gl.getAttribLocation(gl.program,'a_TexCoord');
    gl.vertexAttribPointer(a_TexCoord,2,gl.FLOAT,false,FSIZE*4,FSIZE*2);
    gl.enableVertexAttribArray(a_TexCoord);

    return n;
}


function initTextures(gl,n) {
    var texture = gl.createTexture(); // 创建纹理对象
    // 获取u_Sampler 的存储位置
    var u_Sampler = gl.getUniformLocation(gl.program,'u_Sampler');
    var image = new Image();//创建一个image对象
    // image图像加载事件的响应函数
    image.onload = function () {
        loadTexture(gl,n,texture,u_Sampler,image);
    }
    image.src = './../sky.jpg'
    return true
}


function loadTexture(gl,n,texture,u_Sampler,image) {
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL,1);// 对纹理进行Y轴翻转
    // 开始0号纹理单元
    gl.activeTexture(gl.TEXTURE0);
    // 向target绑定纹理对象
    gl.bindTexture(gl.TEXTURE_2D,texture);
    // 配置纹理参数
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texImage2D(gl.TEXTURE_2D,0,gl.RGB,gl.RGB,gl.UNSIGNED_BYTE,image);
    // 将0号纹理传递给着色器
    gl.uniform1i(u_Sampler,0);
    gl.clearColor(0.0,0.0,0.0,1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLE_STRIP,0,n);// 绘制矩形
}
