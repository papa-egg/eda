import Group from '../basic/group';

export default class Elliptic extends Group {
  constructor ({ params: { pointsArr } }) {
    super(arguments[0]);

    if (!pointsArr || pointsArr.length <= 0) return;

    this.childs = [];

    const childArr = [];

    if (pointsArr.length >= 2) {
      childArr.push(
        {
          type: 'ellipse',
          props: {
            attrs: {
              cx: pointsArr[0].x,
              cy: pointsArr[0].y,
              rx: Math.abs(pointsArr[1].x - pointsArr[0].x),
              ry: Math.abs(pointsArr[1].y - pointsArr[0].y),
              'stroke': 'rgb(220,220,220)',
            },
          },
        },
        {
          type: 'polygon',
          props: {
            attrs: {
              'points': `${ pointsArr[0].x } ${ pointsArr[0].y } ${ pointsArr[1].x } ${ pointsArr[1].y }`,
              'stroke': 'rgb(220,220,220)',
            },
          },
        },
        {
          type: 'circle',
          props: {
            attrs: {
              'cx': pointsArr[0].x,
              'cy': pointsArr[0].y,
              'r': 2,
            },
          },
        },
        {
          type: 'circle',
          props: {
            attrs: {
              'cx': pointsArr[1].x,
              'cy': pointsArr[1].y,
              'r': 2,
            },
          },
        },
      );
    }

    if (pointsArr.length >= 3) {
      const angle = this.getAngle(pointsArr[0], pointsArr[2]);
      const joinPos = this.getJoinPoint(Math.abs(pointsArr[1].x - pointsArr[0].x), Math.abs(pointsArr[1].y - pointsArr[0].y), angle);

      childArr.push(
        {
          type: 'polyline',
          props: {
            attrs: {
              'points': `${ pointsArr[0].x } ${ pointsArr[0].y } ${ pointsArr[2].x } ${ pointsArr[2].y }`,
              'stroke': 'rgb(220,220,220)',
            }
          },
        },
        {
          type: 'circle',
          props: {
            attrs: {
              'cx': pointsArr[2].x,
              'cy': pointsArr[2].y,
              'r': 2,
            }
          },
        },
        {
          type: 'circle',
          props: {
            attrs: {
              'cx': joinPos.x + pointsArr[0].x,
              'cy': joinPos.y + pointsArr[0].y,
              'r': 2,
              'stroke': 'rgb(255,0,0)',
            },
          },
        },
      )
    }

    if (pointsArr.length >= 4) {
      const angle = this.getAngle(pointsArr[0], pointsArr[2]);
      const joinPos = this.getJoinPoint(Math.abs(pointsArr[1].x - pointsArr[0].x), Math.abs(pointsArr[1].y - pointsArr[0].y), angle);
      const angle2 = this.getAngle(pointsArr[0], pointsArr[3]);
      const joinPos2 = this.getJoinPoint(Math.abs(pointsArr[1].x - pointsArr[0].x), Math.abs(pointsArr[1].y - pointsArr[0].y), angle2);
      const lg = joinPos.x * joinPos2.y - joinPos2.x * joinPos.y;

      childArr.push(
        {
          type: 'polyline',
          props: {
            attrs: {
              'points': `${ pointsArr[0].x } ${ pointsArr[0].y } ${ pointsArr[3].x } ${ pointsArr[3].y }`,
              'stroke': 'rgb(220,220,220)',
            },
          },
        },
        {
          type: 'circle',
          props: {
            attrs: {
              'cx': pointsArr[3].x,
              'cy': pointsArr[3].y,
              'r': 2,
            },
          },
        },
        {
          type: 'circle',
          props: {
            attrs: {
              'cx': joinPos2.x + pointsArr[0].x,
              'cy': joinPos2.y + pointsArr[0].y,
              'r': 2,
              'stroke': 'rgb(0,255,0)',
            },
          },
        },
        {
          type: 'path',
          props: {
            attrs: {
              'd': `M ${ joinPos.x + pointsArr[0].x } , ${ joinPos.y + pointsArr[0].y } A ${ Math.abs(pointsArr[1].x - pointsArr[0].x) } ${ Math.abs(pointsArr[1].y - pointsArr[0].y) } 0 ${ lg > 0 ? 0 : 1 } 1 ${ joinPos2.x + pointsArr[0].x } ${ joinPos2.y + pointsArr[0].y }`,
            },
          },
        },
      );

      this.fragElem = Group.createGraphElems([{
        type: 'path',
        props: {
          attrs: {
            'd': `M ${ joinPos.x + pointsArr[0].x } , ${ joinPos.y + pointsArr[0].y } A ${ Math.abs(pointsArr[1].x - pointsArr[0].x) } ${ Math.abs(pointsArr[1].y - pointsArr[0].y) } 0 ${ lg > 0 ? 0 : 1 } 1 ${ joinPos2.x + pointsArr[0].x } ${ joinPos2.y + pointsArr[0].y }`,
          },
        },
      }])
    }

    this.childs = Group.createGraphElems(childArr);
  }

  getAngle (start, end) {
    const diff_x = end.x - start.x;
    const diff_y = end.y - start.y;

    return Math.atan2(diff_y, diff_x);
  }

  getJoinPoint (x, y, angle) {
    const majorR = x;
    const minorR = y;
    const centrifugal = Math.atan2(majorR*Math.sin(angle), minorR*Math.cos(angle));

    return {
      x: majorR*Math.cos(centrifugal),
      y: minorR*Math.sin(centrifugal),
    };
  }
}
