import Polygon from '../basic/polygon';

export default class SchPolygon extends Polygon {
  constructor ({ params: { pointsArr } }) {
    super(arguments[0]);

    if (!pointsArr || pointsArr.length <= 0) return;

    let pointsStr = '';

    for (let point of pointsArr) {
      pointsStr += `${ point.x } ${ point.y } `;
    }

    this.attrs['points'] = pointsStr;
  }
}
