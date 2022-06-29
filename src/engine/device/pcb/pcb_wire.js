import Polyline from '../basic/polyline';

export default class PcbWire extends Polyline {
  constructor(type, attrs, params) {
    super(type, attrs, params);

    this.attrs = Object.assign({
      stroke: 'auto',
      'fill': 'none',
      'fill-opacity': 0,
      'stroke-width': 10,
    }, this.attrs);

    const corePt = this.getCorePoint();

    this.sign = Object.assign(this.sign, {
      px: corePt[0],
      py: corePt[1],
      net: '',
      sw: 10,
    });

    this.bindNature();
    this.bindSign();
  }

  bindNature () {
    const self = this;

    this.nature = [
      {
        title: '导线',
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
                value: 'L_1',
                label: '顶层',
              },
              {
                value: 'L_2',
                label: '底层',
              },
              {
                label: '顶层丝印',
                value: 'L_3',
              },
              {
                label: '底层丝印',
                value: 'L_4',
              },
              {
                label: '顶层助焊',
                value: 'L_5',
                color: '#808080',
              },
              {
                label: '底层助焊',
                value: 'L_6',
                color: '#800000',
              },
              {
                label: '顶层阻焊',
                value: 'L_7',
              },
              {
                label: '底层阻焊',
                value: 'L_8',
              },
              {
                label: '边框',
                value: 'L_10',
                color: '#FF00FF',
              },
              {
                label: '文档',
                value: 'L_12',
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
            type: 'number',
            name: '线宽',
            get model () {
              return self.attrs['stroke-width'] || 0;
            },
            set model (value) {
              self.sign.sw = Number(value) || 0;
              self.attrs['stroke-width'] = Number(value) || 0;
            },
          },

          /*{
            type: 'number',
            name: '起点X',
            get model () {
              return self.attrs['stroke-width'] || 0;
            },
            set model (value) {
              self.sign.sw = Number(value) || 0;
              self.attrs['stroke-width'] = Number(value) || 0;
            },
          },
          {
            type: 'number',
            name: '起点Y',
            get model () {
              return self.attrs['stroke-width'] || 0;
            },
            set model (value) {
              self.sign.sw = Number(value) || 0;
              self.attrs['stroke-width'] = Number(value) || 0;
            },
          },
          {
            type: 'number',
            name: '终点X',
            get model () {
              return self.attrs['stroke-width'] || 0;
            },
            set model (value) {
              self.sign.sw = Number(value) || 0;
              self.attrs['stroke-width'] = Number(value) || 0;
            },
          },
          {
            type: 'number',
            name: '终点Y',
            get model () {
              return self.attrs['stroke-width'] || 0;
            },
            set model (value) {
              self.sign.sw = Number(value) || 0;
              self.attrs['stroke-width'] = Number(value) || 0;
            },
          },*/

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
