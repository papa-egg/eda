import Polygon from '../basic/polygon';

export default class PcbPolygon extends Polygon {
  constructor(type, attrs, params) {
    super(type, attrs, params);

    this.attrs = Object.assign({
      'stroke': 'none',
      'fill': '#ff0000',
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
