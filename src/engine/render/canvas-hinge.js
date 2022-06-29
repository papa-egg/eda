import { toVecColor } from './common/common';
import { drawLine, drawRect } from './render/cell';
import { BindEvent } from './event/event';

export class CanvasHinge {
  constructor (tags) {
    const canvas = document.querySelector(tags[0]);
    this.mouse = new BindEvent(canvas);
    this.gl = canvas.getContext('webgl');
    this.t_gl = null;
    this.l_gl = null;
    this.canvas = canvas;
    this.tags = tags;
    canvas.width = this.gl.canvas.clientWidth;
    canvas.height = this.gl.canvas.clientHeight
  }

  redraw () {
    this.canvas.width = this.gl.canvas.clientWidth;
    this.canvas.height = this.gl.canvas.clientHeight;

    setTimeout(() => {
      this.clearCanvas();
      this.drawGrid();
      this.drawRect(100, 100, 100, 100, '#EA2F2F');
    })

  }

  // 清除画布
  clearCanvas () {
    this.gl.clearColor(...toVecColor('#FFFCF8'));
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
  }

  // 网格线
  drawGrid () {
    document.querySelector(this.tags[1]).setAttribute('width', this.gl.canvas.clientWidth);
    document.querySelector(this.tags[1]).setAttribute('height', 25);
    document.querySelector(this.tags[2]).setAttribute('width', 25);
    document.querySelector(this.tags[2]).setAttribute('height', this.gl.canvas.clientHeight);
    this.t_gl = document.querySelector(this.tags[1]).getContext('webgl');
    this.l_gl = document.querySelector(this.tags[2]).getContext('webgl');
    const { t_gl, l_gl } = this;
    const sp = 7;

    drawLine(t_gl, 0, 25, this.gl.canvas.clientWidth, 25, '#999999');
    drawLine(l_gl, 25, 0, 25, this.gl.canvas.clientHeight, '#999999');

    for (let i = 0; i < Math.ceil(t_gl.canvas.clientWidth / sp); i++) {
      if ((i + 1) % 5 === 0) {
        drawLine(t_gl, i * sp, 25, i * sp, 10, '#999999');
      } else {
        drawLine(t_gl, i * sp, 25, i * sp, 20, '#999999');
      }

      drawLine(this.gl, i * sp, 0, i * sp, this.gl.canvas.clientHeight, '#F1EFEC')
    }

    for (let i = 0; i < Math.ceil(l_gl.canvas.clientHeight / sp); i++) {
      if ((i + 1) % 5 === 0) {
        drawLine(l_gl, 25, i * sp, 10, i * sp, '#999999');
      } else {
        drawLine(l_gl, 25, i * sp, 20, i * sp, '#999999');
      }

      drawLine(this.gl, 0, i * sp, this.gl.canvas.clientWidth, i * sp, '#F1EFEC');
    }
  }

  // 矩形
  drawRect (cx, cy, cw, ch, color) {
    const { gl } = this;

    drawRect(gl, cx, cy, cw, ch, color);
  }
}
