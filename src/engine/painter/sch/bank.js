import Paint from '../etc/paint';

export default class Bank extends Paint {
  constructor () {
    super();

    this.minLength = 1;
    this.maxLength = 1;
  }

  startPaint (pointsArr) {
    const elem = this.createGraphElem([
      {
        type: 'sch_bank',
        props: {
          attrs: {
            transform: `translate(${ pointsArr[0].x }, ${ pointsArr[0].y })`,
          }
        },
        params: {
          pointsArr,
        }
      }
    ]);

    this.saveFragElem(elem);

    return elem;
  }
}
