import Paint from '../etc/paint';

export default class SchText extends Paint {
  constructor () {
    super();

    this.minLength = 1;
    this.maxLength = 1;
    this.shortElem = null;
    this.finalElem = null;
  }

  startPaint (pointArr) {
    this.shortElem = this.device.createElem({
      type: 'sch_text',
      attrs: {
        'content': 'Text',
        'x': pointArr[0][0],
        'y': pointArr[0][1],
        'transform-origin': `${ pointArr[0][0] } ${ pointArr[0][1] }`,
        'font-size': '9',
      },
      params: {
        position: {
          x: pointArr[0][0],
          y: pointArr[0][1],
        },
        content: 'Text',
      }
    });

    this.finalElem = this.shortElem;
  }
}
