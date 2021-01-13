import Path from '../basic/path';

export default class Bessel extends Path {
  constructor ({ params : { pointsArr } }) {
    super(arguments[0]);

    if (!pointsArr || pointsArr.length <= 0) return;

    let pathStr = '';

    if (pointsArr.length === 2) {
      pathStr += `M ${ pointsArr[0].x } ${ pointsArr[0].y } L ${ pointsArr[1].x } ${ pointsArr[1].y }`;
    } else if (pointsArr.length === 3) {
      pathStr += `M ${ pointsArr[0].x } ${ pointsArr[0].y } S ${ pointsArr[1].x } ${ pointsArr[1].y } ${ pointsArr[2].x } ${ pointsArr[2].y }`;
    } else if (pointsArr.length === 4) {
      pathStr += `M ${ pointsArr[0].x } ${ pointsArr[0].y } C ${ pointsArr[1].x } ${ pointsArr[1].y } ${ pointsArr[2].x } ${ pointsArr[2].y } ${ pointsArr[3].x } ${ pointsArr[3].y }`;
    }

    this.attrs['d'] = pathStr;
  }
}
