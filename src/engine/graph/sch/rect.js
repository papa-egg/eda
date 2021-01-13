import Rect from '../basic/rect';

export default class SchRect extends Rect {
  constructor ({ params: { pointsArr } }) {
    super(arguments[0]);

    if (!pointsArr || pointsArr.length <= 0) return;

    const xArr = [];
    const yArr = [];

    for (let point of pointsArr) {
      xArr.push(point.x);
      yArr.push(point.y);
    }

    xArr.sort((a, b) => a - b);
    yArr.sort((a, b) => a - b);

    this.attrs = Object.assign(this.attrs, {
      x: Math.min(...xArr),
      y: Math.min(...yArr),
      width: (Math.max(...xArr) - Math.min(...xArr)) || 1,
      height: (Math.max(...yArr) - Math.min(...yArr)) || 1,
    })
  }
}
