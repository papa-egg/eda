import Polygon from '../basic/polygon';

export default class PcbPolygon extends Polygon {
  constructor(type, attrs, params) {
    super(type, attrs, params);

    this.attrs = Object.assign({
      'stroke': 'none',
      'fill': 'auto',
      'fill-opacity': 1,
      'stroke-width': 2,
    }, this.attrs);

    this.sign = Object.assign(this.sign, {});

    this.bindNature();
    this.bindSign();
  }

  bindNature () {
    const self = this;

    this.nature = [
      {
        title: '实心填充',
        list: [
          {
            type: 'select',
            name: '层',
            self: this,
            get model () {
              return self.sign.layer;
            },
            set model (value) {
              self.sign.layer = value;
            },
            options: [
              {
                value: '顶层丝印',
                label: 'L_3',
              },
              {
                value: '底层丝印',
                label: 'L_4',
              },
              {
                value: '顶层助焊',
                label: 'L_5',
              },
              {
                value: '底层助焊',
                label: 'L_6',
              },
              {
                value: '顶层阻焊',
                label: 'L_7',
              },
              {
                value: '底层阻焊',
                label: 'L_8',
              },
              {
                value: '飞线',
                label: 'L_9',
              },
              {
                value: '边框',
                label: 'L_10',
              },
              {
                value: '多层',
                label: 'L_11',
              },
              {
                value: '文档',
                label: 'L_12',
              },
            ]
          },
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
            type: 'select',
            name: '类型',
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
