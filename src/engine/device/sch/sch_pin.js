import Group from '../basic/group';

export default class SchPin extends Group {
  constructor(type, attrs, params) {
    super(type, attrs, params);

    this.sign = Object.assign(this.sign, {
      fline: 20,
      name: params.name || '1',
      number: params.id || '1',
    });

    this.bindChilds();
    this.bindNature();
    this.bindSign();
  }

  bindChilds () {
    const { px, py, name, number, fline } = this.sign;
    let ox1 = -fline + 7;
    let oy1 = -5;
    let ox2 = -fline - 5;
    let oy2 = 0;

    if (this.childs) {
      ox1 =(Number(this.childs[2].params.ops.x));
      oy1 =(Number(this.childs[2].params.ops.y));
    }

    let childs = [];

    childs = [
      {
        type: 'sch_circle',
        attrs: {
          cx: Number(px),
          cy: Number(py),
          stroke: 'none',
          r: 2,
          fill: 'silver',
          'fill-opacity': 1,
          class: 'pindot',
        },
        params: {
          position: {
            x: Number(px),
            y: Number(py),
          },
          r: 2,
        }
      },
      {
        type: 'sch_line',
        attrs: {
          stroke: '#880000',
          'stroke-width': 1,
          x1: Number(px),
          y1: Number(py),
          x2: Number(px) - fline,
          y2: Number(py),
        },
        params: {
          position: {
            x: px,
            y: py,
          }
        }
      },
      {
        type: 'sch_text',
        attrs: {
          x: Number(px) + ox1,
          y: Number(py) + oy1,
          'content': number,
          'stroke': 'none',
          'stroke-width': 0,
          'fill-opacity': 1,
          'style': 'font-family:Arial;font-size:10px',
          'text-anchor': 'start',
          'dominant-baseline': 'central',
        },
        params: {
          content: number,
          position: {
            x: Number(px) + ox1,
            y: Number(py) + oy1,
          },
          ops: {
            x: ox1,
            y: oy1,
          },
          moved: true,
        },
      },
      {
        type: 'sch_text',
        attrs: {
          x: Number(px) + ox2,
          y: Number(py) + oy2,
          'content': name,
          'stroke': 'none',
          'stroke-width': 0,
          'fill-opacity': 1,
          'style': 'font-family:Arial;font-size:10px',
          'text-anchor': 'end',
          'dominant-baseline': 'central',
        },
        params: {
          content: name,
          position: {
            x: Number(px) + ox2,
            y: Number(py) + oy2,
          },
          ops: {
            x: ox2,
            y: oy2,
          },
          moved: true,
        },
      }
    ];

    this.childs = this.alterChilds(childs);
  }

  bindNature () {
    const self = this;

    this.nature = [
      {
        title: '引脚属性',
        list: [
          {
            type: 'text',
            name: '名称',
            get model () {
              return self.sign.name || '';
            },
            set model (value) {
              if (value) {
                self.sign.name = value;
              } else {
                self.sign.name = '';
              }
            },
          },
          {
            type: 'text',
            name: '编号',
            get model () {
              return self.sign.number || '';
            },
            set model (value) {
              if (value) {
                self.sign.number = value;
              } else {
                self.sign.number = '';
              }
            },
          },
          {
            type: 'select',
            name: '显示名称',
            get model () {
              if (!self.childs[3].attrs['display']) {
                return 1;
              } else {
                if (self.childs[3].attrs['display'] === 'block') {
                  return 1;
                } else {
                  return 0;
                }
              }
            },
            set model (value) {
              if (value === 1) {
                self.childs[3].attrs['display'] = 'block';
              } else {
                self.childs[3].attrs['display'] = 'none';
              }
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
            name: '显示编号',
            get model () {
              if (!self.childs[2].attrs['display']) {
                return 1;
              } else {
                if (self.childs[2].attrs['display'] === 'block') {
                  return 1;
                } else {
                  return 0;
                }
              }
            },
            set model (value) {
              if (value === 1) {
                self.childs[2].attrs['display'] = 'block';
              } else {
                self.childs[2].attrs['display'] = 'none';
              }
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
            name: '长度',
            get model () {
              return self.sign.fline;
            },
            set model (value) {
              self.sign.fline = Number(value) || 0;
            },
          },
          {
            type: 'number',
            name: '起点X',
            get model () {
              return self.sign.px;
            },
            set model (value) {
              self.sign.px = Number(value) || 0;
            },
          },
          {
            type: 'number',
            name: '起点Y',
            get model () {
              return -self.sign.py;
            },
            set model (value) {
              self.sign.px = -Number(value);
            },
          },
          {
            type: 'color',
            name: '引脚颜色',
            get model () {
              return self.childs[1].attrs.stroke;
            },
            set model (value) {
              self.childs[1].attrs.stroke = value;
            },
          },
          {
            type: 'color',
            name: '名称颜色',
            get model () {
              return self.childs[3].attrs.fill;
            },
            set model (value) {
              self.childs[3].attrs.fill = value;
            },
          },
          {
            type: 'color',
            name: '编号颜色',
            get model () {
              return self.childs[2].attrs.fill;
            },
            set model (value) {
              self.childs[2].attrs.fill = value;
            },
          },
          {
            type: 'select',
            name: '字体',
            get model () {
              return self.childs[3].attrs['font-family'];
            },
            set model (value) {
              self.childs[3].attrs['font-family'] = value;
              self.childs[2].attrs['font-family'] = value;
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
    ]
  }
}
