import { SetRuler } from '@/engine/ruler/ruler';
import { getDelta, toViewArea } from '@/engine/common/common';

export class MouseEvent {
  constructor () {
    this.D_editor = document.getElementById('editor');
    this.D_draw = document.getElementById('draw');
    this.D_gp = document.getElementById('gridPattern');
    this.D_gd = document.getElementById('grid');
    this.D_gc = document.getElementById('gridSolidCell');
    this.D_gx = document.getElementById('gridAxisX');
    this.D_gy = document.getElementById('gridAxisY');
    this.D_tn = document.getElementById('ruler-topNd');
    this.D_tl = document.getElementById('ruler-leftNd');
    this.D_ct = document.getElementById('cross-x');
    this.D_cl = document.getElementById('cross-y');

    this.cx = 0;
    this.cy = 0;
    this.cw = 0;
    this.ch = 0;
    this.ox = 0;
    this.oy = 0;
    this.gd = 10;
    this.vb = {
      vx: 0,
      vy: -this.D_draw.clientHeight,
      vw: this.D_draw.clientWidth,
      vh: this.D_draw.clientHeight,
      zm: 1,
    };

    this.C_ruler = new SetRuler();
    this.updateSize();
    // this.foreCenter();
    //this.bindEvent();
    // this.setViewBox();
  }

  bindEvent () {
    const CH = window.$vue.$store.getters.getCH;
    // 鼠标移动事件
    this.D_editor.onmousemove = (event) => {
      this.cx = Math.round(event.clientX - this.ox);
      this.cy = Math.round(event.clientY - this.oy);

      this.D_tn.setAttribute('style', `transform: translateX(${ this.cx }px)`);
      this.D_tl.setAttribute('style', `transform: translateY(${ this.cy }px)`);
      this.D_cl.setAttribute('style', `transform: translateX(${ this.cx }px)`);
      this.D_ct.setAttribute('style', `transform: translateY(${ this.cy }px)`);

      this.updateMsg();

      CH.painter.startChartlet(toViewArea(this.cx, 'x'), toViewArea(this.cy, 'y'));
    };

    // 鼠标点击事件
    this.D_editor.onclick = (event) => {
      const cArr = Object.assign([], window.$vue.$store.getters.getCArr);
      let isSame = false;

      const lastPoints = cArr[cArr.length - 1] || {};

      if (lastPoints.x === toViewArea(event.clientX - this.ox, 'x') && lastPoints.y === toViewArea(event.clientY - this.oy, 'y')) {
        isSame = true;
      }


      if (!isSame) {
        cArr.push({
          x: toViewArea(event.clientX - this.ox, 'x'),
          y: toViewArea(event.clientY - this.oy, 'y'),
        });
      }

      window.$vue.$store.dispatch('setCArr', cArr);
    };

    // 鼠标右击事件
    this.D_editor.oncontextmenu = () => {
      CH.painter.endChartlet();

      return false;
    };

    // 鼠标滚轮缩放事件
    this.D_editor.onmousewheel = (event) => {
      const delta = getDelta(event);
      const oldZoom = this.vb.zm;
      const newZoom = this.getScale(oldZoom,delta >= 0 ? 0 : 1);
      const { nx, ny, nw, nh } = this.zoomTo(this.cx, this.cy, oldZoom, newZoom, this.vb);

      Object.assign(this.vb, {
        vx: nx,
        vy: ny,
        vw: nw,
        vh: nh,
        zm: newZoom,
      });

      this.setViewBox();
      this.updateMsg();
    };

    // 窗口缩放事件
    window.onresize = () => {
      this.updateSize();
      this.setViewBox();
    }
  }

  updateMsg () {
    this.updateCMsg();
    this.updateVMsg();
  }

  updateCMsg () {
    const cMsg = Object.assign({}, window.$vue.$store.getters.getCMsg);

    cMsg.cx = toViewArea(this.cx, 'x');
    cMsg.cy = -toViewArea(this.cy, 'y');
    cMsg.cw = this.cw;
    cMsg.ch = this.ch;
    cMsg.zm = this.vb.zm;
    cMsg.gd = this.gd;

    window.$vue.$store.dispatch('setCMsg', cMsg);
  }

  updateVMsg () {
    const vMsg = Object.assign({}, this.vb);

    window.$vue.$store.dispatch('setVMsg', vMsg);
  }

  updateSize () {
    this.cw = this.D_draw.clientWidth;
    this.ch = this.D_draw.clientHeight;
    this.vb.vw = this.D_draw.clientWidth * (1 / this.vb.zm);
    this.vb.vh = this.D_draw.clientHeight * (1 / this.vb.zm);
    this.ox = this.D_draw.getBoundingClientRect().left;
    this.oy = this.D_draw.getBoundingClientRect().top;

    this.updateMsg();
    this.C_ruler.updateSize();
  }

  setViewBox (type) {
    const { vx, vy, vw, vh } = this.vb;

    const px = 1 / this.vb.zm;
    const zoom = this.vb.zm;
    let gridSize = 10;

    if (!type) {
      this.C_ruler.drawRuler(gridSize, zoom, vx, vy);
    }

    if (gridSize * zoom < 5) {
      if (gridSize * zoom * 2 >= 5) {
        gridSize = gridSize * 2;
      } else {
        if (gridSize * zoom * 5 >= 5) {
          gridSize = gridSize * 5;
        } else {
          gridSize = gridSize * 10;
        }
      }
    }

    if (zoom === 0.2) {
      gridSize = 20;
    }

    this.setAttrs(this.D_draw, {
      viewBox: `${ vx } ${ vy } ${ vw } ${ vh }`
    });
    this.setAttrs(this.D_gp, {
      width: gridSize,
      height: gridSize,
      x: px,
      y: px,
    });
    this.setAttrs(this.D_gc, {
      'stroke-width': px,
      d: 'M10 0V10H-10'.replace(/10/g, gridSize),
    });
    this.setAttrs(this.D_gd, {
      x: vx,
      y: vy,
      width: vw,
      height: vh,
    });
    this.setAttrs(this.D_gx, {
      'stroke-width': px,
      x1: vx,
      x2: vx + vw,
      y1: 0,
      y2: 0,
      stroke: '#656463',
    });
    this.setAttrs(this.D_gy, {
      'stroke-width': px,
      x1: 0,
      x2: 0,
      y1: vy,
      y2: vy + vh,
      stroke: '#656463',
    })
  }

  setAttrs (el, attrs) {
    for (let attr in attrs) {
      el.setAttribute(attr, attrs[attr]);
    }
  }

  // 鼠标滚轮缩放算法
  zoomTo (x, y, oldZoom, newZoom, params) {
    const { vx, vy, vw, vh } = params;

    return {
      nx: x * (1 / oldZoom - 1 / newZoom) + vx,
      ny: y * (1 / oldZoom - 1 / newZoom) + vy,
      nw: vw * oldZoom / newZoom,
      nh: vh * oldZoom / newZoom,
    }
  }

  // 获取缩放精度
  getScale (scale, type) {
    const scaleArr = [0.2, 0.25, 0.35, 0.5, 1, 1.35, 2, 4, 10, 13, 20, 25, 40, 60, 100];
    const _index = scaleArr.indexOf(scale);

    if (!type) {
      return scaleArr[_index + 1] ? scaleArr[_index + 1] : scaleArr[scaleArr.length - 1];
    } else {
      return scaleArr[_index - 1] ? scaleArr[_index - 1] : scaleArr[0];
    }
  }
}
