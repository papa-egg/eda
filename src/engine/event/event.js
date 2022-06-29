import SetRuler from '@/engine/ruler/ruler';
import DomConfig from '@/engine/common/dom-config';
import { getDelta, toViewArea, toADViewArea, toMouseArea, editor } from '@/engine/common/plugin';

export default class MouseEvent {
  constructor (proId, proMsg) {
    this.cx = 0;
    this.cy = 0;
    this.cw = 0;
    this.ch = 0;
    this.ox = 0;
    this.oy = 0;
    this.gd = 10;
    this.altPress = false;
    this.proId = proId;
    this.vb = {
      vx: 0,
      vy: -DomConfig.getDom(this.proId).clientHeight,
      vw: DomConfig.getDom(this.proId).clientWidth,
      vh: DomConfig.getDom(this.proId).clientHeight,
      zm: 1,
    };

    this.vb = Object.assign(this.vb, proMsg.vb);

    this.C_ruler = new SetRuler();

    this.updateSize();
    this.bindEvent();
  }

  bindEvent () {

    // 阻止鼠标默认右击
    document.oncontextmenu = () => {
      event.returnValue = false;
    };

    // 鼠标移动事件
    DomConfig.getDom(this.proId).onmousemove = (event) => {
      this.cx = Math.round(event.clientX - this.ox);
      this.cy = Math.round(event.clientY - this.oy);
      const adPt = [toADViewArea(this.cx, 'x'), toADViewArea(this.cy, 'y')];
      const pt = [toViewArea(this.cx, 'x'), toViewArea(this.cy, 'y')];

      // 设置辅助线
      editor().doc.setAuxLine(toMouseArea(adPt[0], 'x'), toMouseArea(adPt[1], 'y'));

      // 勾勒元素
      editor().doc.startPathContour(adPt[0], adPt[1]);

      // 监测移动轨迹所覆盖元素
      editor().doc.trackMonitor(pt[0], pt[1]);

      // 拖动元素或背景文档
      editor().doc.startDragStuff(adPt, pt);

      // 矩形选中区域
      editor().doc.rectSelect(pt[0], pt[1]);

      this.updateCMsg();
    };

    // 鼠标点击事件
    DomConfig.getDom(this.proId).onclick = (event) => {
      const cArr = Object.assign([], window.$vue.$store.getters.getCArr);
      const lastPoints = cArr[cArr.length - 1] || {};
      const ccx = toADViewArea(event.clientX - this.ox, 'x');
      const ccy = toADViewArea(event.clientY - this.oy, 'y');
      let isSame = false;

      if (lastPoints[0] === ccx && lastPoints[1] === ccy) isSame = true;

      if (!isSame) {
        cArr.push([ccx, ccy]);
      }

      // 存储点击坐标
      window.$vue.$store.dispatch('setCArr', cArr);
    };

    // 鼠标右击事件
    DomConfig.getDom(this.proId).oncontextmenu = () => {
      editor().doc.endPathContour();
    };

    // 鼠标按下事件
    DomConfig.getDom(this.proId).onmousedown = (event) => {
      const ccx = toADViewArea(event.clientX - this.ox, 'x');
      const ccy = toADViewArea(event.clientY - this.oy, 'y');

      // 初始化元素拖动
      editor().doc.initDragStuff([ccx, ccy], (event.button === 2 ? false : true), this.vb);

      // 选中元素
      if (event.button <= 1) {
        editor().doc.checkTrack();
      }
    };

    // 鼠标按起事件
    DomConfig.getDom(this.proId).onmouseup = () => {

      // 结束元素拖动
      editor().doc.endDragStuff();
    };

    // 鼠标滚轮缩放事件
    DomConfig.getDom(this.proId).onmousewheel = (event) => {
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

      this.updateViewBox();
      this.updateMsg();
    };

    // 键盘按下事件
    document.onkeydown = (event) => {
      // console.log(event.keyCode);


      // R键元素逆向翻转90度
      if (event.keyCode == 82) {
        console.log(event.keyCode);
        editor().doc.rotateElem(-90);
      }

      // alt键
      if (event.keyCode == 18) {
        this.altPress = true;
      }

      // delete
      if (event.keyCode == 46) {
        editor().doc.deleteElem();
      }
    };

    // 键盘弹起事件
    document.onkeyup = (event) => {
      // alt键
      if (event.keyCode == 18) {
        this.altPress = false;
      }
    };

    // 窗口缩放事件
    window.onresize = () => {
      this.updateSize();
      this.updateViewBox();
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
    this.cw = DomConfig.getDom(this.proId).clientWidth;
    this.ch = DomConfig.getDom(this.proId).clientHeight;
    this.ox = DomConfig.getDom(this.proId).getBoundingClientRect().left;
    this.oy = DomConfig.getDom(this.proId).getBoundingClientRect().top;
    this.vb.vw = DomConfig.getDom(this.proId).clientWidth * (1 / this.vb.zm);
    this.vb.vh = DomConfig.getDom(this.proId).clientHeight * (1 / this.vb.zm);

    this.updateMsg();
    this.C_ruler.updateSize();
  }

  setViewBox (nb) {
    this.vb = Object.assign(this.vb, nb);

    this.updateViewBox();
  }

  updateViewBox (type) {
    let { vx, vy, vw, vh } = this.vb;

    const px = 1 / this.vb.zm;
    const zoom = this.vb.zm;

    let gridSize = 10;

    if (editor() && editor().doc) {
      gridSize = editor().msg.attrs['grid-size'];
    }

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

    const CH = window.$vue.$store.getters.getCH;

    if (CH) {
      DomConfig.setAttrs (CH.proId, {
        viewBox: `${ vx } ${ vy } ${ vw } ${ vh }`,
      });
    }

    DomConfig.setAttrs('gridPattern' + CH.idx, {
      width: gridSize,
      height: gridSize,
      x: px,
      y: px,
    });

    DomConfig.setAttrs('gridPattern_tmp' + CH.idx, {
      width: gridSize,
      height: gridSize,
      x: px,
      y: px,
    });

    DomConfig.setAttrs('gridSolidCell' + CH.idx, {
      'stroke-width': px,
      'd': 'M10 0V10H-10'.replace(/10/g, gridSize),
    });

    DomConfig.setAttrs('grid' + CH.idx, {
      x: vx,
      y: vy,
      width: vw,
      height: vh,
    });

    DomConfig.setAttrs('gridAxisX' + CH.idx, {
      'stroke-width': px,
      x1: Number(vx).toFixed(2),
      x2: Number(vx + vw).toFixed(2),
      y1: 0,
      y2: 0,
      stroke: '#656463',
    });

    DomConfig.setAttrs('gridAxisY' + CH.idx, {
      'stroke-width': px,
      x1: 0,
      x2: 0,
      y1: Number(vy).toFixed(2),
      y2: Number(vy + vh).toFixed(2),
      stroke: '#656463',
    });
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
