import Group from '../basic/group';

export default class SchNetGnd extends Group {
  constructor(type, attrs, params) {
    super(type, attrs, params);

    this.sign = Object.assign(this.sign, {
      content: 'GND',
    });

    this.bindChilds();
    this.bindNature();
    this.bindSign();
  }

  bindChilds () {
    const { px, py, content } = this.sign;
    let ox = 0;
    let oy = 22;
    let childs = [];

    if (this.childs) {
      ox =(Number(this.childs[3].params.ops.x));
      oy =(Number(this.childs[3].params.ops.y));
    }

    const netPortPts = [[0, 10], [10, 10], [0, 16], [-10, 10], [0, 10]];
    const pointStrArr = [];

    for (let pt of netPortPts) {
      pointStrArr.push([pt[0] + px, pt[1] +  py].join(' '));
    }

    childs = [
      {
        type: 'sch_circle',
        attrs: {
          cx: px,
          cy: py,
          stroke: 'none',
          r: 1,
          fill: 'silver',
          'fill-opacity': 1,
          class: 'pindot',
        },
        params: {
          position: {
            x: px,
            y: py,
          },
          r: 1,
        }
      },

      {
        type: 'sch_line',
        attrs: {
          'x1': px,
          'y1': py,
          'x2': px,
          'y2': py + 10,
          stroke: '#800000',
          "stroke-width": 1,
        },
        params: {
          position: {
            x: px,
            y: py,
          },
        },
      },
      {
        type: 'sch_polyline',
        attrs: {
          points: pointStrArr.join(' '),
          stroke: '#800000',
          'stroke-width': 1,
          fill: 'transparent',
          "fill-opacity": 1,
        },
        params: {
          position: {
            x: px,
            y: py + 10,
          },
        },
      },
      {
        type: 'sch_text',
        attrs: {
          x: Number(px) + ox,
          y: Number(py) + oy,
          'content': 'GND',
          'stroke': 'none',
          'stroke-width': 0,
          'fill-opacity': 1,
          'font-family': 'Verdana',
          'font-size': '10',
          'text-anchor': 'middle',
          'dominant-baseline': 'central',
        },
        params: {
          position: {
            x: Number(px) + ox,
            y: Number(py) + oy,
          },
          ops: {
            x: ox,
            y: oy,
          },
          content: content,
          moved: true,
        },
      },
    ];

    this.childs = this.alterChilds(childs);
  }

  bindNature () {
    const self = this;

    this.nature = [
      {
        title: '接地标识符',
        list: [
          {
            type: 'text',
            name: '名称',
            get model () {
              return self.childs[3].attrs['content'] || '';
            },
            set model (value) {
              if (value) {
                self.childs[3].attrs['content'] = value;
              } else {
                self.childs[3].attrs['content'] = '';
              }
            },
          },
          {
            type: 'select',
            name: '显示名称',
            get model () {
              if (!self.childs[3].attrs['display']) {
                return 1;
              } else {
                if (self.childs[3].attrs['display'] === 'block') {
                  return 1;
                } else {
                  return 0;
                }
              }
            },
            set model (value) {
              if (value === 1) {
                self.childs[3].attrs['display'] = 'block';
              } else {
                self.childs[3].attrs['display'] = 'none';
              }
            },
            options: [
              {
                value: 1,
                label: '是',
              },
              {
                value: 0,
                label: '否',
              },
            ]
          },
          {
            type: 'color',
            name: '颜色',
            get model () {
              return self.childs[1].attrs.stroke;
            },
            set model (value) {
              self.childs[1].attrs.stroke = value;
            },
          },
          {
            type: 'select',
            name: '字体',
            get model () {
              return self.childs[1].attrs['font-family'];
            },
            set model (value) {
              self.childs[1].attrs['font-family'] = value;
              self.childs[2].attrs['font-family'] = value;
            },
            options: [
              {
                value: 'Verdana',
                label: 'Verdana',
              },
              {
                value: 'Arial',
                label: 'Arial',
              },
              {
                value: 'Times New Roman',
                label: 'Times New Roman',
              },
            ],
          },
          {
            type: 'select',
            name: '字体大小',
            get model () {
              return self.childs[1].attrs['font-size'];
            },
            set model (value) {
              self.childs[1].attrs['font-size'] = value;
              self.childs[2].attrs['font-size'] = value;
            },
            options: [
              {
                value: '4',
                label: '4',
              },
              {
                value: '5',
                label: '5',
              },
              {
                value: '6',
                label: '6',
              },
              {
                value: '7',
                label: '7',
              },
              {
                value: '8',
                label: '8',
              },
              {
                value: '9',
                label: '9',
              },
              {
                value: '10',
                label: '10',
              },
              {
                value: '11',
                label: '11',
              },
              {
                value: '12',
                label: '12',
              },
              {
                value: '14',
                label: '14',
              },
              {
                value: '16',
                label: '16',
              },
              {
                value: '18',
                label: '18',
              },
              {
                value: '20',
                label: '20',
              },
              {
                value: '22',
                label: '22',
              },
              {
                value: '24',
                label: '24',
              },
              {
                value: '26',
                label: '26',
              },
              {
                value: '28',
                label: '28',
              },
              {
                value: '36',
                label: '36',
              },
              {
                value: '48',
                label: '48',
              },
              {
                value: '72',
                label: '72',
              },
            ],
          },
          {
            type: 'select',
            name: '锁定',
            get model () {
              return self.sign.fixed;
            },
            set model (value) {
              self.sign.fixed = value;
            },
            options: [
              {
                value: 1,
                label: '是',
              },
              {
                value: 0,
                label: '否',
              },
            ]
          }
        ]
      }
    ];
  }
}
