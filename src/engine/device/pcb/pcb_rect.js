import Rect from '../basic/rect';

export default class PcbRect extends Rect {
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
        title: '矩形',
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
              return self.attrs['stroke-width'];
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
            type: 'number',
            name: '圆角半径',
            get model () {
              return self.attrs['rx'] || 0;
            },
            set model (value) {
              if (Number(value)) {
                self.attrs['rx'] = Number(value);
                self.attrs['ry'] = Number(value);
              } else {
                self.attrs['rx'] = 0;
              }
            },
          },
          {
            type: 'number',
            name: '宽',
            get model () {
              return self.attrs['width'] || 0;
            },
            set model (value) {
              if (Number(value)) {
                self.attrs['width'] = Number(value);
              } else {
                self.attrs['width'] = 0;
              }
            },
          },
          {
            type: 'number',
            name: '高',
            get model () {
              return self.attrs['height'] || 0;
            },
            set model (value) {
              if (Number(value)) {
                self.attrs['height'] = Number(value);
              } else {
                self.attrs['height'] = 0;
              }
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
