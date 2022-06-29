import Sketch from './sektch';
import { getAngle, getJoinPoint } from '@/engine/common/plugin';

export default class Polygon extends Sketch {
  constructor (attrs, params, parent) {
    super(attrs, params, parent);

    this.type = 'polygon';

    this.extract = {
      'points': attrs.points,
      'stroke-width': attrs['stroke-width'],
      'fill': attrs['fill'],
    };

    // this.getPathArr();
    this.setPathArr(this.extract);
    this.bindAttrs(attrs);
  }

  setPathArr (attrs) {
    this.pathArr = this.getProfile({
      type: this.type,
      attrs,
    });

    this.setBox();
    this.setOBox();
    this.renderPath(this.pathArr);
  }

  /*setPathArr ({ points, fill, 'stroke-width': sw }) {
    const pathArr = [];

    if (fill === 'none') {
      const pStrArr = points.trim().split(' ');
      const pArr = [];
      const pointArr = [];

      for (let i = 0; i < pStrArr.length; i += 2) {
        pArr.push(pStrArr.slice(i, i + 2));
      }

      pArr.push(pArr[0]);

      for (let [index] of pArr.entries()) {
        if (pArr[index + 1]) {
          pointArr.push([
            [Number(pArr[index][0]), Number(pArr[index][1])],
            [Number(pArr[index + 1][0]), Number(pArr[index + 1][1])],
          ]);
        }
      }

      for (let pItem of pointArr) {
        const wiseAngle = (getAngle(pItem[0], pItem[1]) + 90);
        const anticAngle = (getAngle(pItem[0], pItem[1]) - 90);

        const first = getJoinPoint(sw / 2, wiseAngle, pItem[0]);
        const second = getJoinPoint(sw / 2, wiseAngle, pItem[1]);
        const third = getJoinPoint(sw / 2, anticAngle, pItem[1]);
        const four = getJoinPoint(sw / 2, anticAngle, pItem[0]);

        let pathStr = '';

        pathStr = `M ${ first[0] } ${ first[1] } L ${ second[0] } ${ second[1] }
                   A ${ sw / 2 } ${ sw / 2 } ${ getAngle(pItem[0], pItem[1]) } 1 0 ${ third[0] } ${ third[1] }
                   L ${ four[0] } ${ four[1] } 
                   A ${ sw / 2 } ${ sw / 2 } ${ getAngle(pItem[0], pItem[1]) } 1 0 ${ first[0] } ${ first[1] }
                   z`;

        pathArr.push(pathStr);
      }
    } else {
      const pStrArr = points.trim().split(' ');
      let pathStr = '';

      pStrArr.push(...pStrArr.slice(0, 2));

      pathStr = 'M' + pStrArr.slice(0, 2).join(' ') +
                'L' + pStrArr.slice(2).join(' ') + 'z';

      pathArr.push(pathStr);
    }

    this.pathArr = this.getPoly(pathArr);
    this.setBox();
    this.setOBox();
    this.renderPath(this.pathArr);
  }*/
}
