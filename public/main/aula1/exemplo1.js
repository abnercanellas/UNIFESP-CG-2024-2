// @ts-check

export const exemplo1 = () => {
  console.log('Exemplo 1');  
  const canvas = document.querySelector('#exemplo1')?.querySelector('canvas') ?? document.createElement('canvas');
  console.log(canvas);
  if (canvas) {
    const gl = canvas.getContext('webgl');

    if (!gl) {
      throw new Error('WebGL not supported');
    }

    const vertexShaderGLSL = `
attribute vec2 position;

void main() {
    gl_Position = vec4(position,0.0,1.0);
}
`;

    const fragmentShaderGLSL = `
precision mediump float;

void main() {
    gl_FragColor = vec4(1.0,0.0,0.0,1.0);
}
`;

    const vertexShader = gl.createShader(gl.VERTEX_SHADER);
    if (vertexShader) {
      gl.shaderSource(vertexShader, vertexShaderGLSL);
      gl.compileShader(vertexShader);
      if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
        throw new Error(gl.getShaderInfoLog(vertexShader) ?? 'Unknown error compiling vertex shader')
      }
    } else console.log('vertexShader is null');

    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    if (fragmentShader) {
      gl.shaderSource(fragmentShader, fragmentShaderGLSL);
      gl.compileShader(fragmentShader);
      if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
        throw new Error(gl.getShaderInfoLog(fragmentShader) ?? 'Unknown error compiling fragment shader')
      };
    } else console.log('fragmentShader is null');

    const program = gl.createProgram();
    if (program && vertexShader && fragmentShader) {
      gl.attachShader(program, vertexShader);
      gl.attachShader(program, fragmentShader);
      gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        throw new Error(gl.getProgramInfoLog(program) ?? 'Unknown error linking program')
      };
    }

    gl.useProgram(program);

    // vertex positions for a square
    const squareVertexPositions = new Float32Array([
      -0.5, 0.5,
      0.5, -0.5,
      0.5, 0.5,
      -0.5, 0.5,
      0.5, -0.5,
      -0.5, -0.5,
    ]);

    if (program) {
      {
        const positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(squareVertexPositions), gl.STATIC_DRAW);

        const positionLocation = gl.getAttribLocation(program, `position`);
        gl.enableVertexAttribArray(positionLocation);
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

        gl.clearColor(1.0, 1.0, 1.0, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

        gl.drawArrays(gl.TRIANGLES, 0, 6);
      }
    }
  };
}