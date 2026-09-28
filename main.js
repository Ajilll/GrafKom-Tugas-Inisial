function main() {
    var canvas = document.getElementById("myCanvas");
    var gl = canvas.getContext("webgl");

    var vertices = [
        // HURUF A
        -0.80, -0.60,   -0.60, -0.60,   -0.62,  0.45,
        -0.62,  0.45,   -0.60, -0.60,   -0.48,  0.45,

        -0.40, -0.60,   -0.20, -0.60,   -0.52,  0.45,
        -0.52,  0.45,   -0.20, -0.60,   -0.38,  0.45,

        -0.62,  0.45,   -0.38,  0.45,   -0.50,  0.65,

        -0.66, -0.08,   -0.34, -0.08,   -0.63,  0.07,
        -0.63,  0.07,   -0.34, -0.08,   -0.37,  0.07,

        // HURUF H
         0.15, -0.60,    0.38, -0.60,    0.15,  0.65,
         0.15,  0.65,    0.38, -0.60,    0.38,  0.55,

         0.62, -0.60,    0.85, -0.60,    0.62,  0.55,
         0.62,  0.55,    0.85, -0.60,    0.85,  0.65,

         0.35, -0.08,    0.65, -0.08,    0.35,  0.08,
         0.35,  0.08,    0.65, -0.08,    0.65,  0.08
    ];
    
    var positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);

    var vertexShaderCode = `
    attribute vec2 aPosition;
    varying float vY; 
    void main(){
        gl_Position = vec4(aPosition, 0.0, 1.0);
        vY = aPosition.y; 
    }`

    var fragmentShaderCode = `
        precision mediump float;
        varying float vY;
        void main(){
            // Normalisasi rentang y [-0.60 s.d 0.65] ke skala [0.0 s.d 1.0]
            float t = (vY + 0.60) / 1.25; 
            t = clamp(t, 0.0, 1.0);

            vec3 bottomColor = vec3(0.0, 0.337, 0.655); // Endeavour Blue (#0056A7)
            vec3 middleColor = vec3(0.5, 0.000, 0.824); // Violet/Purple (#8000D2)
            vec3 topColor    = vec3(0.0, 0.823, 1.000); // Electric Cyan (#00D2FF)

            vec3 finalColor;
            if(t < 0.5) {
                finalColor = mix(bottomColor, middleColor, t * 2.0);
            } else {
                finalColor = mix(middleColor, topColor, (t - 0.5) * 2.0);
            }

            gl_FragColor = vec4(finalColor, 1.0); 
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

    gl.drawArrays(gl.TRIANGLES, 0, vertices.length / 2);
}
