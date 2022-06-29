import DomConfig from '@/engine/common/dom-config';
import { getSvgPath } from '@/engine/common/get-svg-path';
import getProfile from '@/engine/common/get-profile';

export default class Sketch {
  constructor (attrs, params, parent) {
    this.id = attrs.id;
    this.pathArr = [];
    this.dom = document.getElementById(this.id);
    this.box = {};
    this.oBox = {};
    this.parent = parent || null;
    this.timer = null;
    this.getProfile = getProfile;

    if (Object.keys(params || {}).length > 0) {
      this.prop = Object.assign({}, params);
    }
  }

  toFoo(pathArr) {
    const rel = [];

    for (let [index, path] of pathArr.entries()) {
      rel[index] = [];

      for (let pt of path) {
        rel[index].push([pt.X, pt.Y]);
      }
    }

    return rel;
  }

  getPathArr () {
    this.pathArr = this.toFoo(getSvgPath(this.dom));

    this.setBox();
    this.setOBox();
    this.renderPath(this.pathArr);
  }

  getPoly (paths) {
    const polys = [];

    for (let path of paths) {
      DomConfig.setAttrs('pathForArea', { 'd': path });
      let poly = this.pathToPolygon();

      polys.push(poly);
    }

    return polys;
  }

  renderPath (pathArr, flag) {
    // if (!flag) return;

    if (!DomConfig.getDom(this.id + 'gee')) {
      const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      g.setAttribute('id', this.id + 'gee');

      document.querySelector('svg').appendChild(g);
      // DomConfig.getDom('draw').appendChild(g);
    }

    /*DomConfig.getDom(this.id + 'gee').innerHTML = '';
    document.querySelector('#jkk').innerHTML = '';*/

    for (let poly of pathArr) {
      for (let item of poly) {
        const c = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        c.setAttribute('cx', item[0]);
        c.setAttribute('cy', item[1]);
        c.setAttribute('r', 0.1);
        c.setAttribute('stroke', 'black');
        c.setAttribute('stroke-width', '0.5');
        c.setAttribute('fill', 'red');

        // document.querySelector('.svg-box').appendChild(c)

        document.querySelector('#jkk').appendChild(c)
        // DomConfig.getDom(this.id + 'gee').appendChild(c);
      }
    }
  }

  pathToPolygon (num = 100) {
    const len = DomConfig.getDom('pathForArea').getTotalLength();
    const points = [];
    num = len;

    for (let i = 0; i < num; i+=5) {
      const pt = DomConfig.getDom('pathForArea').getPointAtLength(i * len / (num - 1));
      points.push({
        X: pt.x,
        Y: pt.y,
      });
    }

    return points;
  }

  getProfileObj (bd = 0) {
    const xrr = [];
    const yrr = [];

    for (let path of this.pathArr) {
      for (let pt of path) {
        xrr.push(pt[0]);
        yrr.push(pt[1]);
      }
    }

    xrr.sort((a, b) => a - b);
    yrr.sort((a, b) => a - b);

    return {
      minX: xrr[0] - bd,
      maxX: xrr[xrr.length - 1] + bd,
      minY: yrr[0] - bd,
      maxY: yrr[yrr.length - 1] + bd,
    }
  }

  setBox () {
    this.box = this.getProfileObj();
    /*console.log(this.getProfileObj());
    const area = this.dom.getBBox();

    this.box = Object.assign(this.box, {
      minX: area.x,
      maxX: area.x + area.width,
      minY: area.y,
      maxY: area.y + area.height,
    });*/
  }

  setOBox () {
    /*const area = this.dom.getBBox();*/
    const bd = 5;

    this.oBox = this.getProfileObj(bd);

    /*this.oBox = Object.assign(this.oBox, {
      minX: area.x - bd,
      maxX: area.x + area.width + bd,
      minY: area.y - bd,
      maxY: area.y + area.height + bd,
    });*/
  }

  static timer = null;

  alterEmit (extract) {
    clearTimeout(this.timer);

    this.timer = setTimeout(() => {

      if (this.setPathArr) {

        this.setPathArr(extract);
        if (this.parent) {
          this.parent.setPathArr();
        }
      }
    }, 500);
  }

  bindAttrs (attrs) {
    const self = this;
    const bindObj = {};

    for (let prop in this.extract) {
      bindObj[prop] = {
        set (value) {
          self.extract[prop] = value;
          self.alterEmit(self.extract);
        },
        get () {
          return self.extract[prop];
        }
      };
    }

    Object.defineProperties(attrs, bindObj);
  }
}
