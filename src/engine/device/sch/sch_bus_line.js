import Polyline from '../basic/polyline';

export default class SchBusLine extends Polyline {
  constructor(type, attrs, params) {
    super(type, attrs, params);

    this.attrs = Object.assign({
      'fill': 'none',
      'fill-opacity': 1,
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
        title: '总线',
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
