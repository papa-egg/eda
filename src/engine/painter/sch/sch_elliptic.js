import Paint from '../etc/paint';
import { getAngle, getJoinPoint2 } from '@/engine/common/plugin';

export default class SchEllipse extends Paint {
  constructor () {
    super();

    this.minLength = 2;
    this.maxLength = 4;
    this.shortElem = null;
    this.finalElem = null;
  }

  startPaint (pointArr) {
    const obj = {
      type: 'sch_group',
      params: {
        childs: [],
        position: {
          x: pointArr[0][0],
          y: pointArr[0][1],
        },
      },
    };

    if (pointArr.length >= 2) {
      obj.params.childs.push(
        {
          type: 'sch_ellipse',
          attrs: {
            cx: pointArr[0][0],
            cy: pointArr[0][1],
            rx: Math.abs(pointArr[1][0] - pointArr[0][0]),
            ry: Math.abs(pointArr[1][1] - pointArr[0][1]),
            'stroke': 'rgb(220,220,220)',
          },
          params: {
            position: {
              x: pointArr[0][0],
              y: pointArr[0][1],
            },
            rx: Math.abs(pointArr[1][0] - pointArr[0][0]),
            ry: Math.abs(pointArr[1][1] - pointArr[0][1]),
          }
        },
        {
          type: 'sch_polygon',
          attrs: {
            'points': `${ pointArr[0][0] } ${ pointArr[0][1] } ${ pointArr[1][0] } ${ pointArr[1][1] }`,
            'stroke': 'rgb(220,220,220)',
          },
          params: {
            position: {
              x: pointArr[0][0],
              y: pointArr[0][1],
            }
          }
        },
        {
          type: 'sch_circle',
          attrs: {
            'cx': pointArr[0][0],
            'cy': pointArr[0][1],
            'r': 2,
          },
          params: {
            position: {
              x: pointArr[0][0],
              y: pointArr[0][1],
            },
            r: 2,
          }
        },
        {
          type: 'sch_circle',
          attrs: {
            'cx': pointArr[1][0],
            'cy': pointArr[1][1],
            'r': 2,
          },
          params: {
            position: {
              x: pointArr[1][0],
              y: pointArr[1][1],
            },
            r: 2,
          }
        },
      )
    }

    if (pointArr.length >= 3) {
      const angle = getAngle(pointArr[0], pointArr[2]);
      const joinPos2 = getJoinPoint2(Math.abs(pointArr[1][0] - pointArr[0][0]), Math.abs(pointArr[1][1] - pointArr[0][1]), angle, pointArr[0]);

      obj.params.childs.push(
        {
          type: 'sch_polyline',
          attrs: {
            'points': `${ pointArr[0][0] } ${ pointArr[0][1] } ${ pointArr[2][0] } ${ pointArr[2][1] }`,
            'stroke': 'rgb(220,220,220)',
          },
          params: {
            position: {
              x: pointArr[0][0],
              y: pointArr[0][1],
            }
          }
        },
        {
          type: 'sch_circle',
          attrs: {
            'cx': pointArr[2][0],
            'cy': pointArr[2][1],
            'r': 2,
          },
          params: {
            position: {
              x: pointArr[2][0],
              y: pointArr[2][1],
            },
            r: 2,
          }
        },
        {
          type: 'sch_circle',
          attrs: {
            'cx': joinPos2[0],
            'cy': joinPos2[1],
            'r': 2,
            'stroke': 'rgb(255,0,0)',
          },
          params: {
            position: {
              x: joinPos2[0],
              y: joinPos2[1],
            },
            r: 2,
          }
        },
      )
    }

    if (pointArr.length >= 4) {
      const angle = getAngle(pointArr[0], pointArr[2]);
      const joinPos = getJoinPoint2(Math.abs(pointArr[1][0] - pointArr[0][0]), Math.abs(pointArr[1][1] - pointArr[0][1]), angle, pointArr[0]);
      const angle2 = getAngle(pointArr[0], pointArr[3]);
      const joinPos2 = getJoinPoint2(Math.abs(pointArr[1][0] - pointArr[0][0]), Math.abs(pointArr[1][1] - pointArr[0][1]), angle2, pointArr[0]);
      const lg = (joinPos[0] - pointArr[0][0]) * (joinPos2[1] - pointArr[0][1]) - (joinPos2[0] - pointArr[0][0]) * (joinPos[1] - pointArr[0][1]);

      function getStepPath1 (position = { x: 0, y: 0 }) {
        return `M${ joinPos[0] + position.x } ${ joinPos[1] + position.y } A ${ Math.abs(pointArr[1][0] - pointArr[0][0]) } ${ Math.abs(pointArr[1][1] - pointArr[0][1]) } 0 ${ lg > 0 ? 0 : 1 } 1 ${ joinPos2[0] + position.x } ${ joinPos2[1] + position.y }`
      }

      function getStepPath2 (position = { x: 0, y: 0 }) {
        const pos = {
          x: position.x - joinPos[0],
          y: position.y - joinPos[1],
        };

        return `M${ joinPos[0] + pos.x } ${ joinPos[1] + pos.y } A ${ Math.abs(pointArr[1][0] - pointArr[0][0]) } ${ Math.abs(pointArr[1][1] - pointArr[0][1]) } 0 ${ lg > 0 ? 0 : 1 } 1 ${ joinPos2[0] + pos.x } ${ joinPos2[1] + pos.y }`
      }

      const getStepPathStr = `const pos = {x: position.x - ${ joinPos[0] }, y: position.y - ${ joinPos[1] }};return 'M ' + (${ joinPos[0] } + pos.x) + ' ' + (${ joinPos[1] } + pos.y) + ' A ' + (${ Math.abs(pointArr[1][0] - pointArr[0][0]) }) + ' ' + (${ Math.abs(pointArr[1][1] - pointArr[0][1]) })  + ' 0 ' +  (${ lg > 0 ? 0 : 1 })  + ' 1 ' +  (${ joinPos2[0] } + pos.x) + ' ' +(${ joinPos2[1] } + pos.y)`;

      obj.params.childs.push(
        {
          type: 'sch_polyline',
          attrs: {
            'points': `${ pointArr[0][0] } ${ pointArr[0][1] } ${ pointArr[3][0] } ${ pointArr[3][1] }`,
            'stroke': 'rgb(220,220,220)',
          },
          params: {
            position: {
              x: pointArr[0][0],
              y: pointArr[0][1],
            }
          }
        },
        {
          type: 'sch_circle',
          attrs: {
            'cx': pointArr[3][0],
            'cy': pointArr[3][1],
            'r': 2,
          },
          params: {
            position: {
              x: pointArr[3][0],
              y: pointArr[3][1],
            },
            r: 2,
          }
        },
        {
          type: 'sch_circle',
          attrs: {
            'cx': joinPos2[0],
            'cy': joinPos2[1],
            'r': 2,
            'stroke': 'rgb(0,255,0)',
          },
          params: {
            position: {
              x: joinPos2[0],
              y: joinPos2[1],
            },
            r: 2,
          }
        },
        {
          type: 'sch_path',
          attrs: {
            'd': getStepPath1(),
          },
          params: {
            position: {
              x: joinPos[0],
              y: joinPos[1],
            },
            getStepPath: getStepPath1,
          }
        },
      );

      this.finalElem = this.device.createElem({
        type: 'sch_path',
        attrs: {
          d: getStepPath1(),
        },
        params: {
          position: {
            x: joinPos[0],
            y: joinPos[1],
          },
          keyPt: [pointArr[0][0], pointArr[0][1], pointArr[1][0], pointArr[1][1], pointArr[2][0], pointArr[2][1], pointArr[3][0], pointArr[3][1]],
          keyStep: `M k[0] k[1] A k[2] k[3] 0 k[4] 1 k[5] k[6] k[7]`,
          getStepPath: getStepPath2,
          getStepPathStr,
        }
      });
    }

    function getStepPath2 (position = { x: 0, y: 0 }) {
      const pos = {
        x: position.x - joinPos[0],
        y: position.y - joinPos[1],
      };

      return `M${ joinPos[0] + pos.x } ${ joinPos[1] + pos.y } A ${ Math.abs(pointArr[1][0] - pointArr[0][0]) } ${ Math.abs(pointArr[1][1] - pointArr[0][1]) } 0 ${ lg > 0 ? 0 : 1 } 1 ${ joinPos2[0] + pos.x } ${ joinPos2[1] + pos.y }`
    }

    this.shortElem = this.device.createElem(obj);
  }
}
