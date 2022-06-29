import Paint from '../etc/paint';

export default class PcbPolygon extends Paint {
  constructor () {
    super();

    this.minLength = 2;
    this.maxLength = Infinity;
    this.shortElem = null;
    this.finalElem = null;
  }

  startPaint (pointArr) {
    let pointStrArr = [];

    for (let pItem of pointArr) {
      pointStrArr.push(pItem.join(' '));
    }

    this.shortElem = this.device.createElem({
      type: 'pcb_polygon',
      attrs: {
        points: pointStrArr.join(' '),
        'stroke-width': 1,
      },
      params: {
        layer: 'L_1',
        position: {
          x: pointArr[0][0],
          y: pointArr[0][1],
        },
      }
    });

    this.finalElem = this.shortElem;
  }
}
