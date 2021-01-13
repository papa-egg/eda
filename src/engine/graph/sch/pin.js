import Group from '../basic/group';

export default class Pin extends Group {
  constructor ({ params: { pointsArr, order } }) {
    super(arguments[0]);

    if (!pointsArr || pointsArr.length <= 0) return;

    this.childs = Group.createGraphElems([
      {
        type: 'polyline',
        props: {
          attrs: {
            stroke: 'rgb(0,0,0)',
            points: '0,0 20,0',
          }
        }
      },
      {
        type: 'circle',
        props: {
          attrs: {
            stroke: 'rgb(220,220,220)',
            cx: 20,
            cy: 0,
            r: 0,
          }
        }
      },
      {
        type: 'text',
        content: order,
        props: {
          attrs: {
            x: 8,
            y: -5,
            'content': order,
            'stroke': 'none',
            'stroke-width': 0,
            'fill': 'rgb(0,0,0)',
            'fill-opacity': 1,
            'transform': 'rotate(0 8 -5)',
            'style': 'font-family:Arial;font-size:10px',
            'text-anchor': 'middle',
            'dominant-baseline': 'central',
          }
        }
      },
      {
        type: 'text',
        content: order,
        props: {
          attrs: {
            x: -5,
            y: 0,
            'content': order,
            'stroke': 'none',
            'stroke-width': 0,
            'fill': 'rgb(0,0,0)',
            'fill-opacity': 1,
            'transform': 'rotate(0 -5 0)',
            'style': 'font-family:Arial;font-size:10px',
            'text-anchor': 'middle',
            'dominant-baseline': 'central',
          }
        }
      }
    ]);
  }
}
