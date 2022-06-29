import Paint from '../etc/paint';

export default class PcbPad extends Paint {
  constructor () {
    super();

    this.minLength = 1;
    this.maxLength = 1;
    this.shortElem = null;
    this.finalElem = null;
  }

  startPaint (pointArr) {
    this.shortElem = this.device.createElem({
      type: 'pcb_pad',
      params: {
        position: {
          x: pointArr[0][0],
          y: pointArr[0][1],
        },
        layer: 'L_1',
      },
    });

    this.finalElem = this.shortElem;
  }
}
