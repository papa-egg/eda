import Paint from '../etc/paint';

export default class SchBessel extends Paint {
  constructor () {
    super();

    this.minLength = 2;
    this.maxLength = 4;
    this.shortElem = null;
    this.finalElem = null;
  }

  startPaint (pointArr) {
    let pathStr = '';
    let getStepPathStr = '';

    if (pointArr.length === 2) {
      pathStr += `M ${ pointArr[0][0] } ${ pointArr[0][1] } L ${ pointArr[1][0] } ${ pointArr[1][1] }`;

    } else if (pointArr.length === 3) {
      pathStr += `M ${ pointArr[0][0] } ${ pointArr[0][1] } S ${ pointArr[1][0] } ${ pointArr[1][1] } ${ pointArr[2][0] } ${ pointArr[2][1] }`;
    } else if (pointArr.length === 4) {
      pathStr += `M ${ pointArr[0][0] } ${ pointArr[0][1] } C ${ pointArr[1][0] } ${ pointArr[1][1] } ${ pointArr[2][0] } ${ pointArr[2][1] } ${ pointArr[3][0] } ${ pointArr[3][1] }`;
      getStepPathStr = `const pos = {x: position.x - ${ pointArr[0][0] }, y: position.y - ${ pointArr[0][1] }};return 'M ' + (${ pointArr[0][0] } + pos.x) + ' ' + (${ pointArr[0][1] } + pos.y) + ' C ' + (${ pointArr[1][0] } + pos.x) + ' ' + (${ pointArr[1][1] } + pos.y)  + ' ' +  (${ pointArr[2][0] } + pos.x)  + ' ' + (${ pointArr[2][1] } + pos.y)+ ' ' + (${ pointArr[3][0] } + pos.x) + ' ' +(${ pointArr[3][1] } + pos.y)`;
    }

    this.shortElem = this.device.createElem({
      type: 'sch_bessel',
      attrs: {
        'd': pathStr,
      },
      params: {
        position: {
          x: pointArr[0][0],
          y: pointArr[0][1],
        },
        // getStepPathStr: `const pos = {x: position.x - ${ pointArr[0][0] }, y: position.y - ${ pointArr[0][1] }};`,
        getStepPathStr,
        getStepPath (position) {
          const pos = {
            x: position.x - pointArr[0][0],
            y: position.y - pointArr[0][1],
          };
          return `M ${ pointArr[0][0] + pos.x } ${ pointArr[0][1] + pos.y } C ${ pointArr[1][0] + pos.x } ${ pointArr[1][1] + pos.y }
           ${ pointArr[2][0] + pos.x } ${ pointArr[2][1] + pos.y } ${ pointArr[3][0] + pos.x } ${ pointArr[3][1] + pos.y }`;
        }
      }
    });

    this.finalElem = this.shortElem;
  }
}
