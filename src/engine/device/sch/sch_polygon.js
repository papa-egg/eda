import Polygon from '../basic/polygon';

export default class SchPolygon extends Polygon {
  constructor(type, attrs, params) {
    super(type, attrs, params);

    this.attrs = Object.assign({
      'stroke': 'rgb(0, 0, 255)',
      'fill': 'none',
      'fill-opacity': 1,
      'stroke-width': 2,
    }, this.attrs);

    this.bindNature();
    this.bindSign();
  }

  bindNature () {
    const self = this;

    this.nature = [
      {
        title: '多边形',
        list: [
          {
            type: 'color',
            name: '颜色',
            get model () {
              return self.attrs.stroke;
            },
            set model (value) {
              self.attrs.stroke = value;
            },
          },
          {
            type: 'select',
            name: '线宽',
            get model () {
              return Number(self.attrs['stroke-width']);
            },
            set model (value) {
              self.attrs['stroke-width'] = value;
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
            name: '样式',
            self: this,
            get model () {
              return self.attrs['stroke-dasharray'];
            },
            set model (value) {
              self.attrs['stroke-dasharray'] = value;
            },
            options: [
              {
                value: undefined,
                label: '实线',
              },
              {
                value: '6,6',
                label: '短划线',
              },
              {
                value: '3,10',
                label: '点线',
              },
            ],
          },
          {
            type: 'color',
            name: '填充颜色',
            self: this,
            get model () {
              return self.attrs.fill !== 'none' ? self.attrs.fill : '';
            },
            set model (color) {
              if (color) {
                self.attrs.fill = color;
                self.attrs['fill-opacity'] = 1;
              } else {
                self.attrs.fill = 'none';
                self.attrs['fill-opacity'] = 0;
              }
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
        ]
      }
    ];
  }
}
