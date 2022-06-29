import Paint from '../etc/paint';

export default class SchRect extends Paint {
  constructor () {
    super();

    this.minLength = 2;
    this.maxLength = 2;
    this.shortElem = null;
    this.finalElem = null;
  }

  startPaint (pointArr) {
    if (!pointArr || pointArr.length <= 0) return;

    const xArr = [];
    const yArr = [];

    for (let point of pointArr) {
      xArr.push(point[0]);
      yArr.push(point[1]);
    }

    xArr.sort((a, b) => a - b);
    yArr.sort((a, b) => a - b);

    this.shortElem = this.device.createElem({
      type: 'sch_rect',
      attrs: {
        x: Math.min(...xArr),
        y: Math.min(...yArr),
        width: (Math.max(...xArr) - Math.min(...xArr)) || 1,
        height: (Math.max(...yArr) - Math.min(...yArr)) || 1,
      },
      params: {
        position: {
          x: Math.min(...xArr),
          y: Math.min(...yArr),
        }
      }
    });

    this.finalElem = this.shortElem;
  }
}
