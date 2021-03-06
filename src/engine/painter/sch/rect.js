import Paint from '../etc/paint';

export default class Rect extends Paint {
  constructor () {
    super();

    this.minLength = 2;
    this.maxLength = 2;
  }

  startPaint (pointsArr) {
    const elem = this.createGraphElem([
      {
        type: 'sch_rect',
        params: {
          pointsArr,
        }
      }
    ]);

    this.saveFragElem(elem);

    return elem;
  }
}
