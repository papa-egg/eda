import { toVecColor, createProgram } from "../common/common"

// 矩形
export const drawRect = (gl, cx, cy, cw, ch, color) => {
  const vsSource = `
    attribute vec2 a_position;
    uniform vec2 u_resolution;

    void main() {
      vec2 zeroToOne = a_position / u_resolution;
      vec2 zeroToTwo = zeroToOne * 2.0;
      vec2 clipSpace = zeroToTwo - 1.0;

      gl_Position = vec4((clipSpace * vec2(1, -1)), 0, 1);
    }
  `;

  const fsSource = `
    precision mediump float;
    uniform vec4 u_color;

    void main() {
      gl_FragColor = u_color;
    }
  `;

  const program = createProgram(gl, vsSource, fsSource);

  gl.useProgram(program);

  // 查找attribute数据位置
  const a_position = gl.getAttribLocation(program, 'a_position');
  const u_resolution = gl.getUniformLocation(program, 'u_resolution');
  const colorUniformLocation = gl.getUniformLocation(program, "u_color");

  // 创建缓冲区对象
  const vertexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  setRectangle(gl, cx, cy, cw, ch);

  console.log('8989898');
  console.log(gl.canvas.width);
  console.log(gl.canvas.height);
  gl.uniform2f(u_resolution, gl.canvas.width, gl.canvas.height);
  gl.uniform4fv(colorUniformLocation, toVecColor(color));


  gl.enableVertexAttribArray(a_position);
  gl.vertexAttribPointer(a_position, 2, gl.FLOAT, false, 0, 0);

  // 绘画
  gl.drawArrays(gl.TRIANGLES, 0, 6);

  function setRectangle (gl, x, y, w, h) {
    const x1 = x;
    const x2 = x + w;
    const y1 = y;
    const y2 = y + h;

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
      x1, y1,
      x2, y1,
      x1, y2,
      x1, y2,
      x2, y1,
      x2, y2
    ]), gl.STATIC_DRAW);
  }
}

// 线
export const drawLine = (gl, sx, sy, ex, ey, color) => {
  const vsSource = `
    attribute vec2 a_Position;
    uniform vec2 u_resolution;

    void main(void){
        vec2 zeroToOne = a_Position / u_resolution;
      vec2 zeroToTwo = zeroToOne * 2.0;
      vec2 clipSpace = zeroToTwo - 1.0;

      gl_PointSize = 1.0;
      gl_Position = vec4((clipSpace * vec2(1, -1)), 0, 1);
    }
  `;

  const fsSource = `
    precision mediump float;
    uniform vec4 u_color;

    void main() {
      gl_FragColor = u_color;
    }
  `;

  const program = createProgram(gl, vsSource, fsSource);
  gl.useProgram(program);

  // 查找attribute数据位置
  const a_position = gl.getAttribLocation(program, 'a_Position');
  const u_resolution = gl.getUniformLocation(program, 'u_resolution');
  const colorUniformLocation = gl.getUniformLocation(program, "u_color");

  // 创建缓冲区对象
  const vertexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);

  const vertices = [
    sx, sy,
    ex, ey,
  ];

  gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(vertices), gl.STATIC_DRAW);

  gl.uniform2f(u_resolution, gl.canvas.clientWidth, gl.canvas.clientHeight);
  gl.uniform4fv(colorUniformLocation, toVecColor(color));


  gl.enableVertexAttribArray(a_position);
  gl.vertexAttribPointer(a_position, 2, gl.FLOAT, false, 0, 0);

  // 绘画
  gl.drawArrays(gl.LINES, 0, 2);
};
