import Polyline from '../basic/polyline';

export default class SchPolyline extends Polyline {
  constructor(type, attrs, params) {
    super(type, attrs, params);

    this.attrs = Object.assign({
      'stroke': 'rgb(0, 0, 255)',
      'fill': 'none',
      'fill-opacity': 1,
      'stroke-width': 1,
    }, this.attrs);

    const corePt = this.getCorePoint();

    this.sign = Object.assign(this.sign, {
      px: corePt[0],
      py: corePt[1],
    });

    this.bindNature();
    this.bindSign();
  }

  bindNature () {
    const self = this;

    this.nature = [
      {
        title: '折线',
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
              self.attrs['stroke-width'] = Number(value);
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
