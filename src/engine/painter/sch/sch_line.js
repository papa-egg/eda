import Paint from '../etc/paint';

export default class SchLine extends Paint {
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
      type: 'sch_line',
      attrs: {
        'x1': pointArr[0][0],
        'y1': pointArr[0][1],
        'x2': pointArr[1][0],
        'y2': pointArr[1][1],
      },
    });

    this.finalElem = this.shortElem;
  }
}
