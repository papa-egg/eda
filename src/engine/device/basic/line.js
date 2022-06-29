import Basic from './basic';

export default class Line extends Basic {
  constructor (type, attrs, params) {
    super(type, attrs, params);

    this.type = 'line';
  }

  getFirstPoint () {
    const x = this.attrs.x1;
    const y = this.attrs.y1;

    return [x, y]
  }

  updateSignMsg () {
    const { px, py, angle } = this.sign;

    const firstPt = this.getFirstPoint();
    const distX = px - firstPt[0];
    const distY = py - firstPt[1];

    this.attrs.x1 += distX;
    this.attrs.y1 += distY;
    this.attrs.x2 += distX;
    this.attrs.y2 += distY;

    const corePt = this.getCorePoint();
    this.attrs.transform = `rotate(${ angle || 0 }, ${  corePt[0] || 0 }, ${ corePt[1] || 0 })`;
  }
}
