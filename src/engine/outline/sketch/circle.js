import Sketch from './sektch';

export default class Circle extends Sketch {
  constructor (attrs, params, parent) {
    super(attrs, params, parent);

    this.type = 'circle';

    this.extract = {
      'cx': attrs['cx'],
      'cy': attrs['cy'],
      'r': attrs['r'],
      'stroke-width': attrs['stroke-width'],
      'fill': attrs['fill'],
    };

    // this.getPathArr();
    this.setPathArr(this.extract);
    this.bindAttrs(attrs);
  }

  setPathArr (attrs) {
    this.pathArr = this.getProfile({
      type: this.type,
      attrs,
    });

    this.setBox();
    this.setOBox();
    this.renderPath(this.pathArr);
  }

  /*setPathArr ({ cx, cy, r, 'stroke-width': sw, fill }) {
    const pathArr = [];
    const pAttrs = {
      cx: cx,
      cy: cy,
      rx: r + sw / 2,
      ry: r + sw / 2,
    };

    const iAttrs = {
      cx: cx,
      cy: cy,
      rx: r - sw / 2,
      ry: r - sw / 2,
    };

    if (fill === 'none') {
      pathArr[0] = `M ${ pAttrs.cx - pAttrs.rx } ${ pAttrs.cy } 
                a${ pAttrs.rx } ${ pAttrs.ry } 0 1 0 ${ 2 * pAttrs.rx } 0
                a${ pAttrs.rx } ${ pAttrs.ry } 0 1 0 ${ -2 * pAttrs.rx } 0
                h${ sw }
                a${ iAttrs.rx } ${ iAttrs.ry } 0 1 0 ${ 2 * iAttrs.rx } 0
                a${ iAttrs.rx } ${ iAttrs.ry } 0 1 0 ${ -2 * iAttrs.rx } 0
                z `;
    } else {
      pathArr[0] = `M ${ pAttrs.cx - pAttrs.rx } ${ pAttrs.cy } a${ pAttrs.rx } ${ pAttrs.ry } 0 1 0 ${ 2 * pAttrs.rx } 0a${ pAttrs.rx } ${ pAttrs.ry } 0 1 0 ${ -2 * pAttrs.rx } 0z`;
    }

    this.pathArr = this.getPoly(pathArr);
    this.setBox();
    this.setOBox();
    this.renderPath(this.pathArr);
  }*/
}
