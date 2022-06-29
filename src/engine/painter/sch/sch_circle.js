import Paint from '../etc/paint';
import { getStraightDistance } from '@/engine/common/plugin';

export default class SchCircle extends Paint {
  constructor () {
    super();

    this.minLength = 2;
    this.maxLength = 2;
    this.shortElem = null;
    this.finalElem = null;
  }

  startPaint (pointArr) {
    this.shortElem = this.device.createElem({
      type: 'sch_circle',
      attrs: {
        cx: pointArr[0][0],
        cy: pointArr[0][1],
        r: getStraightDistance([pointArr[0][0], pointArr[0][1]], [pointArr[1][0], pointArr[1][1]]),
      },
      params: {
        position: {
          x: pointArr[0][0],
          y: pointArr[0][1],
        },
        r: getStraightDistance([pointArr[0][0], pointArr[0][1]], [pointArr[1][0], pointArr[1][1]]),
      }
    });

    this.finalElem = this.shortElem;
  }
}
