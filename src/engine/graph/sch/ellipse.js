import Ellipse from '../basic/ellipse';

export default class SchEllipse extends Ellipse {
  constructor ({ params: { pointsArr } }) {
    super(arguments[0]);

    if (!pointsArr || pointsArr.length <= 0) return;

    this.attrs = Object.assign(this.attrs, {
      cx: pointsArr[0].x,
      cy: pointsArr[0].y,
      rx: Math.abs(pointsArr[1].x - pointsArr[0].x),
      ry: Math.abs(pointsArr[1].y - pointsArr[0].y),
    })
  }
}
