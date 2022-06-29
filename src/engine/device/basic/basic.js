import { getUUID } from '@/engine/common/plugin';
import DomConfig from '@/engine/common/dom-config';

export default class Basic {
  constructor (type, attrs = {}, params = {}) {
    this.attrs = Object.assign({
      mType: type,
    }, attrs);

    params = Object.assign(attrs, params);

    this.sign = {
      mType: type,
      layer: params.layer || '',
      vHide: params.vHide || false,
      fixed: 0,
    };

    this.params = params;

    if (params.position) {
      this.sign.px = params.position.x;
      this.sign.py = params.position.y;
    }

    if (params.content) {
      this.sign.content = params.content;
    }

    if (params.angle) {
      this.sign.angle = params.angle;
    }

    this.bindId();
  }

  getCorePoint () {
    return [this.sign.px, this.sign.py];
  }

  endDragElem () {
    if (this.params && this.params.ops) {
      const xx = this.params.ops.x + Number(this.params.gx);
      const yy = this.params.ops.y + Number(this.params.gy);

      this.params.ops.x = xx;
      this.params.ops.y = yy;
    }
  }

  // 旋转元素
  rotateElem (angle) {
    // const corePt = this.getCorePoint();
    this.sign.angle = angle;

    // this.attrs.transform = `rotate(${ angle || 0 }, ${  corePt[0] || 0 }, ${ corePt[1] || 0 })`;
  }

  // 拖动元素
  dragElem (x, y, gx, gy) {
    /*console.log('888888888888888888888');
    console.log(this.sign.px);
    console.log(this.sign.py);
    console.log(x);
    console.log(y);*/

    this.sign.px =  Number(x);
    this.sign.py =  Number(y);
    this.params.gx = Number(gx);
    this.params.gy = Number(gy);
  }

  alterEmit () {
    clearTimeout(this.timer);

    this.timer = setTimeout(() => {

      if (this.updateSignMsg) {
        this.updateSignMsg();
      }
    }, 100);
  }

  bindSign () {
    const excludePropertyArr = ['mType', 'vHide', 'fixed'];

    this.sign = new Proxy(this.sign, {
      set: (receiver, property, value) => {
        receiver[property] = value;

        if (excludePropertyArr.indexOf(property) < 0) {

          if (property == 'px' || property == 'py') {
            if (this.updateSignMsg) {
              this.updateSignMsg();
            }
          } else {
            this.alterEmit();
          }
        }

        return true;
      }
    });
  }

  bindId () {
    const id = getUUID();

    this.id = id;
    this.attrs.id = id;
    this.sign.id = id;

    if (this.sign.angle) {
      const corePt = this.getCorePoint();
      this.attrs.transform = `rotate(${ this.sign.angle || 0 }, ${  corePt[0] || 0 }, ${ corePt[1] || 0 })`;
    }
  }

  addHover () {
    this.addClass('is-hover');
  }

  removeHover () {
    this.removeClass('is-hover');
  }

  addSelect () {
    this.addClass('is-select');
  }

  removeSelect () {
    this.removeClass('is-select');
  }

  addClass (className) {
    let classAttr = this.attrs.class || '';

    if (classAttr.indexOf(className) > -1) return;
    if (classAttr) classAttr += ' ';

    DomConfig.setAttrs(this.id, { 'class': classAttr + className });
    this.attrs.class = classAttr + className;
  }

  removeClass (className) {
    const classAttr = this.attrs.class || '';

    if (classAttr.indexOf(className) > -1) {
      const classArr = classAttr.split(' ');
      const _index = classArr.indexOf(className);

      classArr.splice(_index, 1);

      if (classArr.join(' ').trim() === '') {
        DomConfig.setAttrs(this.id, { 'class': '' });
        delete this.attrs.class;
      } else {
        DomConfig.setAttrs(this.id, { 'class': this.attrs.class });
        this.attrs.class = classArr.join(' ').trim();
      }
    }
  }
}
