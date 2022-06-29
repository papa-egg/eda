import Group from '../basic/group';

export default class PcbVia extends Group {
  constructor(type, attrs, params) {
    super(type, attrs, params);

    this.sign = Object.assign(this.sign, {
      od: 25,
      nd: 15,
      layer: 'L_11',
      net: '',
    });

    this.bindChilds();
    this.bindNature();
    this.bindSign();
  }

  bindChilds () {
    const { px, py, od, nd } = this.sign;

    let childs = [];

    childs = [
      {
        type: 'pcb_circle',
        attrs: {
          cx: px,
          cy: py,
          r: (od) / 2,
          stroke: 'none',
          fill: 'auto',
        },
        params: {
          position: {
            x: px,
            y: py,
          },
          r: od / 2,
          layer: 'L_11',
        }
      },
      {
        type: 'pcb_circle',
        attrs: {
          cx: px,
          cy: py,
          r: (nd) / 2,
          stroke: 'none',
          fill: '#000000',
        },
        params: {
          position: {
            x: px,
            y: py,
          },
          r: nd / 2,
          layer: 'L_11',
        }
      },
    ];

    this.childs = this.alterChilds(childs);
  }

  bindNature () {
    const self = this;

    this.nature = [
      {
        title: '过孔',
        list: [
          {
            type: 'text',
            name: '网络',
            get model () {
              return self.sign['net'] || '';
            },
            set model (value) {
              if (value) {
                self.sign['net'] = value;
              } else {
                self.sign['net'] = '';
              }
            },
          },

          {
            type: 'number',
            name: '直径',
            get model () {
              return self.sign.od || 0;
            },
            set model (value) {
              self.sign.od = Number(value) || 0;
            },
          },
          {
            type: 'number',
            name: '过孔内径',
            get model () {
              return self.sign.nd || 0;
            },
            set model (value) {
              self.sign.nd = Number(value) || 0;
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
