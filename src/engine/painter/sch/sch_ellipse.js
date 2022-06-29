import Paint from '../etc/paint';

export default class SchEllipse extends Paint {
  constructor () {
    super();

    this.minLength = 2;
    this.maxLength = 2;
    this.shortElem = null;
    this.finalElem = null;
  }

  startPaint (pointArr) {
    this.shortElem = this.device.createElem({
      type: 'sch_ellipse',
      attrs: {
        rx: Math.abs(pointArr[1][0] - pointArr[0][0]),
        ry: Math.abs(pointArr[1][1] - pointArr[0][1]),
        cx: pointArr[0][0],
        cy: pointArr[0][1],
      },
      params: {
        position: {
          x: pointArr[0][0],
          y: pointArr[0][1],
        },
        rx: Math.abs(pointArr[1][0] - pointArr[0][0]),
        ry: Math.abs(pointArr[1][1] - pointArr[0][1]),
      }
    });

    this.finalElem = this.shortElem;
  }
}
