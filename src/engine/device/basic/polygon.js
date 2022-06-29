import Basic from './basic';

export default class Polygon extends Basic {
  constructor (type, attrs, params) {
    super(type, attrs, params);

    this.type = 'polygon';
  }

  getFirstPoint () {
    const points = this.attrs.points;
    const pStrArr = points.trim().split(' ');
    const pArr = [];

    for (let i = 0; i < pStrArr.length; i += 2) {
      pArr.push(pStrArr.slice(i, i + 2));
    }

    return pArr[0];
  }

  updateSignMsg () {
    const { px, py, angle } = this.sign;
    const firstPt = this.getFirstPoint();
    const distX = px - firstPt[0];
    const distY = py - firstPt[1];
    const points = this.attrs.points;
    const pStrArr = points.trim().split(' ');
    const pArr = [];

    for (let i = 0; i < pStrArr.length; i += 2) {
      pArr.push(pStrArr.slice(i, i + 2));
    }

    for (let pt of pArr) {
      pt[0] = Number(pt[0]) + Number(distX);
      pt[1] = Number(pt[1]) + Number(distY);
    }

    this.attrs.points = pArr.join(' ').split(',').join(' ');

    const corePt = this.getCorePoint();
    this.attrs.transform = `rotate(${ angle || 0 }, ${  corePt[0] || 0 }, ${ corePt[1] || 0 })`;
  }
}
