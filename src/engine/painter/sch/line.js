import Paint from '../etc/paint';

export default class Line extends Paint {
  constructor () {
    super();

    this.minLength = 2;
    this.maxLength = Infinity;
  }

  startPaint (pointsArr) {
    const elem = this.createGraphElem([
      {
        type: 'sch_line',
        params: {
          pointsArr,
        }
      }
    ]);


    this.saveFragElem(this.createGraphElem([
      {
        type: 'sch_line',
        params: {
          pointsArr: pointsArr.slice(0, pointsArr.length - 1),
        }
      }
    ]));

    return elem;
  }
}
