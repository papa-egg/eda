import { editor } from '@/engine/common/plugin';

export default class SchDoc {
  constructor (type, attrs) {
    this.attrs = Object.assign({
      'background-color': '#fffCf8',
      'show-grid': 1,
      'grid-color': '#cccccc',
      'grid-type': 1,
      'grid-size': 10,
      'cell-adsorb': 1,
      'cell-size': 10,
      'alt-cell-size': 5,
    }, attrs);

    this.bindNature();
  }

  bindNature () {
    const self = this;

    this.nature = [
      {
        title: '画布属性',
        list: [
          {
            type: 'color',
            name: '背景色',
            get model () {
              return self.attrs['background-color'];
            },
            set model (value) {
              self.attrs['background-color'] = value;
            },
          },
          {
            type: 'select',
            name: '网格可见',
            self: this,
            get model () {
              return self.attrs['show-grid'];
            },
            set model (value) {
              self.attrs['show-grid'] = value;
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
            type: 'color',
            name: '网格颜色',
            self: this,
            get model () {
              return self.attrs['grid-color'];
            },
            set model (value) {
              self.attrs['grid-color'] = value;
            },
          },
          {
            type: 'select',
            name: '网格样式',
            self: this,
            get model () {
              return self.attrs['grid-type'];
            },
            set model (value) {
              self.attrs['grid-type'] = value;
            },
            options: [
              {
                value: 1,
                label: '实线',
              },
              {
                value: 0,
                label: '点',
              },
            ]
          },
          {
            type: 'number',
            name: '网格大小',
            self: this,
            get model () {
              return self.attrs['grid-size'];
            },
            set model (value) {
              if (Number(value)) {
                self.attrs['grid-size'] = Number(value);

                const CH = window.$vue.$store.getters.getCH;

                CH.mouse.updateViewBox();

              } else {
                self.attrs['grid-size'] = '';
              }
            },
          },
          {
            type: 'select',
            name: '吸附',
            self: this,
            get model () {
              return self.attrs['cell-adsorb'];
            },
            set model (value) {
              self.attrs['cell-adsorb'] = Number(value);
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
            type: 'number',
            name: '栅格尺寸',
            self: this,
            get model () {
              return self.attrs['cell-size'];
            },
            set model (value) {
              if (Number(value)) {
                self.attrs['cell-size'] = Number(value);
                editor().mouse.gd = Number(value);
              } else {
                self.attrs['cell-size'] = '';
              }
            },
          },
          {
            type: 'number',
            name: 'ALT键栅格',
            self: this,
            get model () {
              return self.attrs['alt-cell-size'];
            },
            set model (value) {
              if (Number(value)) {
                self.attrs['alt-cell-size'] = Number(value);
              } else {
                self.attrs['alt-cell-size'] = '';
              }
            },
          },
        ],
      }
    ]
  }
}
