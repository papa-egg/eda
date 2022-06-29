import Group from '../basic/group';

export default class SchNoConnect extends Group {
  constructor(type, attrs, params) {
    super(type, attrs, params);

    this.bindChilds();
    this.bindNature();
    this.bindSign();
  }

  bindChilds () {
    const { px, py } = this.sign;
    let childs = [];

    childs = [
      {
        type: 'sch_line',
        attrs: {
          stroke: '#E930F6',
          'stroke-width': '1',
          x1: Number(px) - 10,
          y1: Number(py) - 10,
          x2: Number(px) + 10,
          y2: Number(py) + 10,
        },
        params: {
          position: {
            x: px - 10,
            y: py - 10,
          }
        }
      },
      {
        type: 'sch_line',
        attrs: {
          'stroke-width': '1',
          stroke: '#E930F6',
          x1: Number(px) - 10,
          y1: Number(py) + 10,
          x2: Number(px) + 10,
          y2: Number(py) - 10,
        },
        params: {
          position: {
            x: px - 10,
            y: py + 10,
          }
        }
      },
    ];

    this.childs = this.alterChilds(childs);
  }

  bindNature () {
    const self = this;

    this.nature = [
      {
        title: '非连接标志',
        list: [
          {
            type: 'color',
            name: '颜色',
            get model () {
              return self.childs[0].attrs.stroke;
            },
            set model (value) {
              self.childs[0].attrs.stroke = value;
              self.childs[1].attrs.stroke = value;
            },
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
