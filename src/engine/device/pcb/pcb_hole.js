import Group from '../basic/group';

export default class PcbHole extends Group {
  constructor(type, attrs, params) {
    super(type, attrs, params);

    this.sign = Object.assign(this.sign, {
      layer: 'L_11',
      net: '',
      dia: 30,
    });

    this.bindChilds();
    this.bindNature();
    this.bindSign();
  }

  bindChilds () {
    const { px, py, dia } = this.sign;
    let childs = [];

    childs = [
      {
        type: 'pcb_line',
        attrs: {
          x1: px - 8 - (dia / 2),
          y1: py + 8 + (dia / 2),
          x2: px + 8 + (dia / 2),
          y2: py - 8 - (dia / 2),
          stroke: 'auto',
          'stroke-width': 2,
        },
        params: {
          position: {
            x: px - 8 - (dia / 2),
            y: py + 8 + (dia / 2),
          },
          layer: 'L_11',
        }
      },
      {
        type: 'pcb_line',
        attrs: {
          x1: px - 8 - (dia / 2),
          y1: py - 8 - (dia / 2),
          x2: px + 8 + (dia / 2),
          y2: py + 8 + (dia / 2),
          stroke: 'auto',
          'stroke-width': 2,
        },
        params: {
          position: {
            x: px - 8 - (dia / 2),
            y: py - 8 - (dia / 2),
          },
          layer: 'L_11',
        }
      },
      {
        type: 'pcb_circle',
        attrs: {
          cx: px,
          cy: py,
          r: (dia + 4) / 2,
          stroke: 'none',
          "stroke-width": '0',
          fill: 'auto',
        },
        params: {
          position: {
            x: px,
            y: py,
          },
          r: (dia + 4) / 2,
          layer: 'L_11'
        }
      },
      {
        type: 'pcb_circle',
        attrs: {
          cx: px,
          cy: py,
          r: (dia) / 2,
          stroke: 'none',
          "stroke-width": '0',
          fill: '#000000',
        },
        params: {
          position: {
            x: px,
            y: py,
          },
          r: (dia) / 2,
          layer: 'L_11'
        }
      },
    ];

    this.childs = this.alterChilds(childs);
  }

  bindNature () {
    const self = this;

    this.nature = [
      {
        title: '通孔',
        list: [
          {
            type: 'number',
            name: '孔直径',
            get model () {
              return self.sign.dia || 0;
            },
            set model (value) {
              self.sign.dia = Number(value) || 0;
            },
          },
          {
            type: 'number',
            name: '中心X',
            get model () {
              return self.sign.px || 0;
            },
            set model (value) {
              self.sign.px = value;
            },
          },
          {
            type: 'number',
            name: '中心Y',
            get model () {
              return -self.sign.py || 0;
            },
            set model (value) {
              self.sign.py = -value;
            },
          },
          {
            type: 'select',
            name: '锁定',
            self: this,
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
        ],
      }
    ];
  }
}
