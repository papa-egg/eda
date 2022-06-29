import Sketch from './sektch';
import { getAngle, getJoinPoint } from '@/engine/common/plugin';

export default class Path extends Sketch {
  constructor (attrs, params, parent) {
    super(attrs, params, parent);

    this.type = 'path';

    this.extract = {
      'd': attrs['d'],
      'stroke-width': attrs['stroke-width'],
      'fill': attrs['fill'],
    };

    // this.getPathArr();
    this.setPathArr(this.extract);
    this.bindAttrs(attrs);
  }

  setPathArr (attrs) {
    const { d: path } = attrs;

    const ptArr = this.getPoly([path])[0];

    this.pathArr = this.getProfile({
      type: 'path',
      attrs,
      ptArr,
    });

    this.setBox();
    this.setOBox();
    this.renderPath(this.pathArr);
  }

  setPathArr22 ({ d: path, 'stroke-width': sw, fill }) {
    const pArr = this.getPoly([path])[0];

    const pointArr = [];
    const pathArr = [];

    if (fill === 'none') {

      this.pathArr = [];

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

        this.pathArr.push([first, second, third, four]);

        const pAttrs = {
          cx: pItem[0][0],
          cy: pItem[0][1],
          rx: sw/2,
          ry: sw/2,
        };

        const iAttrs = {
          cx: pItem[1][0],
          cy: pItem[1][1],
          rx: sw/ 2,
          ry: sw/ 2,
        };

        const path1 = `M ${ pAttrs.cx - pAttrs.rx } ${ pAttrs.cy } a${ pAttrs.rx } ${ pAttrs.ry } 0 1 0 ${ 2 * pAttrs.rx } 0a${ pAttrs.rx } ${ pAttrs.ry } 0 1 0 ${ -2 * pAttrs.rx } 0z`;
        const path2 = `M ${ iAttrs.cx - iAttrs.rx } ${ iAttrs.cy } a${ iAttrs.rx } ${ iAttrs.ry } 0 1 0 ${ 2 * iAttrs.rx } 0a${ iAttrs.rx } ${ iAttrs.ry } 0 1 0 ${ -2 * iAttrs.rx } 0z`;

        this.pathArr.push(this.getPoly([path1])[0]);
        this.pathArr.push(this.getPoly([path2])[0]);
      }

    } else {
      const pointsArr = [];

      for (let pItem of pArr) {
        pointsArr.push(pItem.join(','));
      }

      const points = pointsArr.join(' ');
      const pStrArr = points.trim().split(' ');
      let pathStr = '';

      pStrArr.push(...pStrArr.slice(0, 2));

      pathStr = 'M' + pStrArr.slice(0, 2).join(' ') +
        'L' + pStrArr.slice(2).join(' ') + 'z';

      pathArr.push(pathStr);

      this.pathArr = this.getPoly(pathArr);
    }

    this.setBox();
    this.setOBox();

    this.renderPath(this.pathArr);
  }
}
