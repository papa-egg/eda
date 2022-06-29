import Sketch from './sektch';

export default class Group extends Sketch {
  constructor (attrs, params, parent) {
    super(attrs, params, parent);

    this.type = 'g';

    this.dom = document.getElementById(this.id);

    this.attrs = attrs;

    this.extract = {};

    // this.getPathArr();
    this.setPathArr(this.extract);
  }

  monitorChange () {}

  bindAttrs (attrs, extract) {}

  getGroupProfileBox () {
    const pathArr = [];
    const xrr = [];
    const yrr = [];

    for (let child of this.childs) {
      pathArr.push(...child.pathArr);
    }

    for (let path of pathArr) {
      for (let pt of path) {
        xrr.push(pt[0]);
        yrr.push(pt[1]);
      }
    }

    xrr.sort((a, b) => a - b);
    yrr.sort((a, b) => a - b);

    return {
      x: xrr[0],
      y: yrr[0],
      width: xrr[xrr.length - 1] - xrr[0],
      height: yrr[xrr.length - 1] - yrr[0],
    }
  }

  async setPathArr (attrs) {
    const pathArr = [];
    let box = null;

    setTimeout(() => {
      if (this.childs) {
        box = this.getGroupProfileBox();
      } else {
        box = this.dom.getBBox();
      }

      if (box.x == undefined) {
        box = this.dom.getBBox();
      }

      this.pathArr = this.getProfile({
        type: 'text',
        attrs,
        box,
      });

      /*pathArr[0] = `M ${ box.x } ${ box.y }h${ box.width }v${ box.height }h-${ box.width } z`;

      this.pathArr = this.getPoly(pathArr);*/
      this.setBox();
      this.setOBox();
      this.renderPath(this.pathArr);
    })
  }
}
