import imgsrc_t from '@/assets/images/tg_tulip.png';
import imgsrc_l from '@/assets/images/lg_tulip.png';
import DomConfig from '@/engine/common/dom-config';
import { loadImage } from '@/engine/common/plugin';

export default class SetRuler {
  static hMarkNumImg = null;
  static vMarkNumImg = null;

  updateSize () {
    const { cw, ch } = window.$vue.$store.getters.getCMsg;

    DomConfig.setAttrs('ruler-x', {'width': cw, 'height': 25,});
    DomConfig.setAttrs('ruler-y', {'width': 25, 'height': ch,});
  }

  // 绘制横竖刻度尺
  drawRuler (size = 10, zoom = 1, vx, vy) {
    if (size * zoom < 5) {
      if (size * zoom * 2 >= 5) {
        size = size * 2;
      } else {
        if (size * zoom * 5 >= 5) {
          size = size * 5;
        } else {
          size = size * 10;
        }
      }
    } else {
      if (size * zoom > 10 && size * zoom <= 20) {
        size = size / 2;
      }
      if (size * zoom > 10 && size * zoom <= 50) {
        size = size / 5;
      }

      if (size * zoom > 50 && size * zoom <= 100) {
        size = size / 10;
      }

      if (size * zoom > 100 && size * zoom <= 200) {
        size = size / 20;
      }

      if (size * zoom > 200 && size * zoom <= 500) {
        size = size / 50;
      }
      if (size * zoom > 500 && size * zoom <= 1000) {
        size = size / 100;
      }
    }

    if (zoom === 0.2) {
      size = 30;
    }

    const px = size * zoom;

    this.drawRulerTop(px, Math.round(-vx * zoom - 0.5), size);
    this.drawRulerLeft(px, Math.round(-vy * zoom - 0.5), size);
  }

  // 绘制顶部刻度  间隙大小，起点位置，每刻度大小
  async drawRulerTop (sp, ox, us) {
    const D_ruler =  DomConfig.getDom('ruler-x');
    const ctx = D_ruler.getContext('2d');
    const cw = D_ruler.clientWidth;
    const ch = D_ruler.clientHeight;

    if (!SetRuler.hMarkNumImg) {
      SetRuler.hMarkNumImg = await loadImage(imgsrc_t);
    }

    ctx.clearRect(0,0, cw, ch);

    const textRects = {
      '0': {x: 0, w: 6},
      '1': {x: 6, w: 5},
      '2': {x: 12, w: 6},
      '3': {x: 18, w: 6},
      '4': {x: 24, w: 6},
      '5': {x: 30, w: 6},
      '6': {x: 36, w: 6},
      '7': {x: 42, w: 6},
      '8': {x: 48, w: 6},
      '9': {x: 54, w: 6},
      ".": {x: 60, w: 3},
      "-": {x: 63, w: 4}
    };

    ctx.beginPath();
    ctx.fillStyle = "#999999";

    ctx.fillRect(0, ch - 1, cw, 1);

    for (let i = Math.floor(ox / sp); i >= 0; i--) {
      let lh = 5;

      if (parseInt(i % 10) === 5) {
        lh = 12;
      }

      if (i % 10 === 0) {
        lh = 18;
        drawNumber(ctx, SetRuler.hMarkNumImg, -i * us, (ox - (i * sp)) + 2, ch - 18 + 2);
      }

      ctx.fillRect(ox - (i * sp), ch - lh, 1, lh);
    }

    for (let i = 1; i <= Math.ceil((cw - ox) / sp); i++) {
      let lh = 5;

      if (parseInt(i % 10) === 5) {
        lh = 12;
      }

      if (i % 10 === 0) {
        lh = 18;
        drawNumber(ctx, SetRuler.hMarkNumImg, i * us, ox + (i * sp) + 2, ch - 18 + 2);
      }

      ctx.fillRect(ox + (i * sp), ch - lh, 1, lh);
    }

    ctx.stroke();

    function drawNumber (ctx, img, nums, x, y) {
      const numsArr = ('' + nums).split('');
      let skew = Math.ceil(x);

      for (let i = 0; i < numsArr.length; i++) {
        const rect = textRects[numsArr[i]];

        ctx.drawImage(img, rect.x, 0, rect.w, 8, skew, y, rect.w, 8);
        skew += rect.w;
      }
    }
  }

  // 绘制左侧刻度
  async drawRulerLeft (sp, oy, us) {
    const D_ruler = DomConfig.getDom('ruler-y');
    const ctx = D_ruler.getContext('2d');
    const cw = D_ruler.clientWidth;
    const ch = D_ruler.clientHeight;

    if (!SetRuler.vMarkNumImg) {
      SetRuler.vMarkNumImg = await loadImage(imgsrc_l);
    }

    ctx.clearRect(0,0, cw, ch);

    const textRects = {
      '0': {x: 0, w: 6},
      '1': {x: 6, w: 5},
      '2': {x: 12, w: 6},
      '3': {x: 18, w: 6},
      '4': {x: 24, w: 6},
      '5': {x: 30, w: 6},
      '6': {x: 36, w: 6},
      '7': {x: 42, w: 6},
      '8': {x: 48, w: 6},
      '9': {x: 54, w: 6},
      ".": {x: 60, w: 3},
      "-": {x: 63, w: 4}
    };

    ctx.beginPath();
    ctx.fillStyle = "#999999";
    ctx.fillRect(cw - 1, 0, 1, ch);

    for (let i = Math.floor(oy / sp); i >= 0; i--) {
      let lh = 5;

      if (parseInt(i % 10) === 5) {
        lh = 12;
      }

      if (i % 10 === 0) {
        lh = 18;

        drawNumber(ctx, SetRuler.vMarkNumImg, i * us, cw - 18 + 2, (oy - (i * sp)) + 2);
      }

      ctx.fillRect(cw - lh, oy - (i * sp), lh, 1);
    }

    for (let i = 1; i <= Math.ceil((ch - oy) / sp); i++) {
      let lh = 5;

      if (parseInt(i % 10) === 5) {
        lh = 12;
      }

      if (i % 10 === 0) {
        lh = 18;

        drawNumber(ctx, SetRuler.vMarkNumImg, -i * us,  cw - 18 + 2, oy + (i * sp) + 2);
      }

      ctx.fillRect(cw - lh, oy + (i * sp), lh, 1)
    }

    ctx.stroke();

    function drawNumber (ctx, img, nums, x, y) {
      const numsArr = ('' + nums).split('');

      let skew = Math.ceil(y);

      for (let i = 0; i < numsArr.length; i++) {
        const rect = textRects[numsArr[i]];

        ctx.drawImage(img, 0, rect.x, 8, rect.w, x, skew, 8, rect.w);
        skew += rect.w;
      }
    }
  }
}
