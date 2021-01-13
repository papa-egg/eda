import Paint from '../etc/paint';

export default class Pin extends Paint {
  constructor () {
    super();

    this.minLength = 1;
    this.maxLength = 1;
  }

  static order = 1;

  startPaint (pointsArr) {
    const elem = this.createGraphElem([
      {
        type: 'sch_pin',
        props: {
          attrs: {
            transform: `translate(${ pointsArr[0].x }, ${ pointsArr[0].y })`,
          }
        },
        params: {
          pointsArr,
          order: Pin.order,
        }
      }
    ]);

    this.saveFragElem(elem);

    return elem;
  }

  getFragElem () {
    Pin.order++;

    return this.fragElem;
  }
}
