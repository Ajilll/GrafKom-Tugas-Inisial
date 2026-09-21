function main() {
    var canvas = document.getElementById("myCanvas");
    var gl = canvas.getContext("webgl");

    var vertices = [
        // --- Huruf A ---
        -0.7, -0.5,   -0.5,  0.5, 
        -0.5,  0.5,   -0.3, -0.5, 
        -0.6,  0.0,   -0.4,  0.0, 

        // --- Huruf H ---
        0.2,  0.5,    0.2, -0.5, 
        0.6,  0.5,    0.6, -0.5,
        0.2,  0.0,    0.6,  0.0
    ];
    
    var positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);

    var vertexShaderCode = `
    attribute vec2 aPosition;
    void main(){
        gl_Position = vec4(aPosition, 0.0, 1.0);
    }`

    var fragmentShaderCode = `
        void main(){
            // Warna garis: Biru (R:0, G:0, B:1, Alpha:1)
            gl_FragColor = vec4(0.0, 0.0, 1.0, 1.0); 
        }`

    var vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, vertexShaderCode);
    gl.compileShader(vertexShader);

    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, fragmentShaderCode);
    gl.compileShader(fragmentShader);

    var program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    gl.useProgram(program);

    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    var aPosition = gl.getAttribLocation(program, "aPosition");
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0); 
    gl.enableVertexAttribArray(aPosition);
    
    gl.clearColor(1.0, 1.0, 1.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.drawArrays(gl.LINES, 0, 12);
}