import Paint from '../etc/paint';

export default class Text extends Paint {
  constructor () {
    super();

    this.minLength = 1;
    this.maxLength = 1;
  }

  startPaint (pointsArr) {
    const elem = this.createGraphElem([
      {
        type: 'sch_text',
        props: {
          content: 'Text',
          attrs: {
            'x': pointsArr[0].x,
            'y': pointsArr[0].y,
            'transform-origin': `${ pointsArr[0].x } ${ pointsArr[0].y }`,
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
