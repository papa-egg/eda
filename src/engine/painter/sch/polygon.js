import Paint from '../etc/paint';

export default class Polygon extends Paint {
  constructor () {
    super();

    this.minLength = 2;
    this.maxLength = Infinity;
  }

  startPaint (pointsArr) {
    const elem = this.createGraphElem([
      {
        type: 'sch_polygon',
        params: {
          pointsArr,
        }
      }
    ]);

    this.saveFragElem(elem);

    return elem;
  }
}
