import Paint from '../etc/paint';

export default class elliptic extends Paint {
  constructor () {
    super();

    this.minLength = 2;
    this.maxLength = 4;
  }

  startPaint (pointsArr) {
    const elem = this.createGraphElem([
      {
        type: 'sch_elliptic',
        params: {
          pointsArr,
        },
      }
    ]);

    this.saveFragElem(elem);

    return elem;
  }
}
