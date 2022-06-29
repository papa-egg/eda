import Sketch from './sektch';

export default class Ellipse extends Sketch {
  constructor (attrs, params, parent) {
    super(attrs, params, parent);

    this.type = 'ellipse';

    this.extract = {
      'cx': attrs['cx'],
      'cy': attrs['cy'],
      'rx': attrs['rx'],
      'ry': attrs['ry'],
      'stroke-width': attrs['stroke-width'],
      'fill': attrs['fill'],
    };

    // this.getPathArr();
    this.setPathArr(this.extract);
    this.bindAttrs(attrs);
  }

  setPathArr (attrs) {
    const { cx, cy, rx, ry, 'stroke-width': sw } = attrs;
    const pathArr = [];
    const pAttrs = {
      cx: cx,
      cy: cy,
      rx: rx + sw / 2,
      ry: ry + sw / 2,
    };

    pathArr[0] = `M ${ pAttrs.cx - pAttrs.rx } ${ pAttrs.cy } a${ pAttrs.rx } ${ pAttrs.ry } 0 1 0 ${ 2 * pAttrs.rx } 0a${ pAttrs.rx } ${ pAttrs.ry } 0 1 0 ${ -2 * pAttrs.rx } 0z`;

    const ptArr = this.getPoly(pathArr)[0];

    this.pathArr = this.getProfile({
      type: 'path',
      attrs,
      ptArr,
    });

    this.setBox();
    this.setOBox();
    this.renderPath(this.pathArr);
  }

  /*setPathArr ({ cx, cy, rx, ry, 'stroke-width': sw, fill }) {
    const pathArr = [];
    const pAttrs = {
      cx: cx,
      cy: cy,
      rx: rx + sw / 2,
      ry: ry + sw / 2,
    };

    const iAttrs = {
      cx: cx,
      cy: cy,
      rx: rx - sw / 2,
      ry: ry - sw / 2,
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

    console.log('2222222222222222222222222');
    console.log(this.pathArr);

    this.setBox();
    this.setOBox();
    this.renderPath(this.pathArr);
  }*/
}
