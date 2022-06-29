import Group from '../basic/group';

export default class SchBusEntry extends Group {
  constructor(type, attrs, params) {
    super(type, attrs, params);

    this.bindChilds();
    this.bindNature();
    this.bindSign();
  }

  bindChilds () {
    const { px, py } = this.sign;
    let childs = [];

    const netPortPts = [[0, 0], [10, -10]];
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
        type: 'sch_circle',
        attrs: {
          cx: px + 10,
          cy: py - 10,
          stroke: 'none',
          r: 1,
          fill: 'silver',
          'fill-opacity': 1,
          class: 'pindot',
        },
        params: {
          position: {
            x: px + 10,
            y: py - 10,
          },
          r: 1,
        }
      },
      {
        type: 'sch_polyline',
        attrs: {
          points: pointStrArr.join(' '),
          stroke: '#008800',
          'stroke-width': 1,
        },
        params: {
          position: {
            x: px,
            y: py,
          }
        },
      },
    ];

    this.childs = this.alterChilds(childs);
  }

  bindNature () {
    const self = this;

    this.nature = [
      {
        title: '总线入口',
        list: [
          {
            type: 'color',
            name: '颜色',
            get model () {
              return self.childs[2].attrs.stroke;
            },
            set model (value) {
              self.childs[2].attrs.stroke = value;
            },
          },
          {
            type: 'select',
            name: '线宽',
            get model () {
              return Number(self.childs[2].attrs['stroke-width']);
            },
            set model (value) {
              self.childs[2].attrs['stroke-width'] = Number(value);
            },
            options: [
              {
                value: 1,
                label: '1',
              },
              {
                value: 2,
                label: '2',
              },
              {
                value: 3,
                label: '3',
              },
              {
                value: 4,
                label: '4',
              },
              {
                value: 5,
                label: '5',
              },
              {
                value: 6,
                label: '6',
              },
              {
                value: 7,
                label: '7',
              },
              {
                value: 8,
                label: '8',
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
