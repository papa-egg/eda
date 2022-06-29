import Paint from '../etc/paint';

export default class PcbText extends Paint {
  constructor () {
    super();

    this.minLength = 1;
    this.maxLength = 1;
    this.shortElem = null;
    this.finalElem = null;
  }

  startPaint (pointArr) {
    this.shortElem = this.device.createElem({
      type: 'pcb_text',
      attrs: {
        'content': 'TEXT',
        'x': pointArr[0][0],
        'y': pointArr[0][1],
        'transform-origin': `${ pointArr[0][0] } ${ pointArr[0][1] }`,
        'font-size': '16',
      },
      params: {
        layer: 'L_1',
        position: {
          'x': pointArr[0][0],
          'y': pointArr[0][1],
        },
        content: 'TEXT',
      }
    });

    this.finalElem = this.shortElem;
  }
}
