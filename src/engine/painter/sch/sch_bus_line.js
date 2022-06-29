import Paint from '../etc/paint';

export default class SchBusLine extends Paint {
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
      type: 'sch_bus_line',
      attrs: {
        'stroke-width': 4,
        'stroke': '#008800',
        points: pointStrArr.join(' '),
      },
      params: {
        position: {
          x: pointArr[0][0],
          y: pointArr[0][1],
        }
      },
    });

    this.finalElem = this.shortElem;
  }
}
