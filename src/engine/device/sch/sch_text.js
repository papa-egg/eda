import Text from '../basic/text';

export default class SchText extends Text {
  constructor (type, attrs, params) {
    super(type, attrs, params);

    this.attrs = Object.assign({
      'stroke': 'none',
      'stroke-width': 0,
      'fill': '#000080',
      'fill-opacity': 1,
      'font-family': 'Verdana',
      'font-style': undefined,
      'font-weight': undefined,
    }, this.attrs);

    this.sign = Object.assign(this.sign, {
      content: params.content,
    });

    this.bindNature();
    this.bindSign();
  }

  bindNature () {
    const self = this;

    this.nature = [
      {
        title: '文本属性',
        list: [
          {
            type: 'text',
            name: '文本',
            get model () {
              return self.sign['content'] || '';
            },
            set model (value) {
              if (value) {
                self.sign['content'] = value;
              } else {
                self.sign['content'] = '';
              }
            },
          },
          {
            type: 'color',
            name: '颜色',
            get model () {
              return self.attrs.fill;
            },
            set model (value) {
              self.attrs.fill = value;
            },
          },
          {
            type: 'select',
            name: '字体',
            get model () {
              return self.attrs['font-family'];
            },
            set model (value) {
              self.attrs['font-family'] = value;
            },
            options: [
              {
                value: 'Verdana',
                label: 'Verdana',
              },
              {
                value: 'Arial',
                label: 'Arial',
              },
              {
                value: 'Times New Roman',
                label: 'Times New Roman',
              },
            ],
          },
          {
            type: 'select',
            name: '字体大小',
            get model () {
              return self.attrs['font-size'];
            },
            set model (value) {
              self.attrs['font-size'] = value;
            },
            options: [
              {
                value: '4',
                label: '4',
              },
              {
                value: '5',
                label: '5',
              },
              {
                value: '6',
                label: '6',
              },
              {
                value: '7',
                label: '7',
              },
              {
                value: '8',
                label: '8',
              },
              {
                value: '9',
                label: '9',
              },
              {
                value: '10',
                label: '10',
              },
              {
                value: '11',
                label: '11',
              },
              {
                value: '12',
                label: '12',
              },
              {
                value: '14',
                label: '14',
              },
              {
                value: '16',
                label: '16',
              },
              {
                value: '18',
                label: '18',
              },
              {
                value: '20',
                label: '20',
              },
              {
                value: '22',
                label: '22',
              },
              {
                value: '24',
                label: '24',
              },
              {
                value: '26',
                label: '26',
              },
              {
                value: '28',
                label: '28',
              },
              {
                value: '36',
                label: '36',
              },
              {
                value: '48',
                label: '48',
              },
              {
                value: '72',
                label: '72',
              },
            ],
          },
          {
            type: 'select',
            name: '字体粗细',
            get model () {
              return self.attrs['font-weight'];
            },
            set model (value) {
              self.attrs['font-weight'] = value;
            },
            options: [
              {
                value: undefined,
                label: '自动',
              },
              {
                value: 'normal',
                label: '正常',
              },
              {
                value: 'bold',
                label: '更粗',
              },
            ],
          },
          {
            type: 'select',
            name: '样式',
            get model () {
              return self.attrs['font-style'];
            },
            set model (value) {
              self.attrs['font-style'] = value;
            },
            options: [
              {
                value: undefined,
                label: '自动',
              },
              {
                value: 'normal',
                label: '正常',
              },
              {
                value: 'italic',
                label: '斜体',
              },
            ],
          },
          {
            type: 'select',
            name: '文本类型',
            get model () {
              return self.attrs['type'];
            },
            set model (value) {
              if (!value) {
                delete self.attrs['type'];
              } else {
                self.attrs['font-style'] = 'italic';
                self.attrs.fill = '#000000';
              }

              self.attrs['type'] = value;
            },
            options: [
              {
                value: undefined,
                label: '注释',
              },
              {
                value: 'spice',
                label: 'Spice仿真',
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


