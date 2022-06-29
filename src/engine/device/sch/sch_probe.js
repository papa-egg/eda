import Group from '../basic/group';

export default class SchProbe extends Group {
  constructor(type, attrs, params) {
    super(type, attrs, params);

    this.sign = Object.assign(this.sign, {
      content: 'volProbe',
    });

    this.bindChilds();
    this.bindNature();
    this.bindSign();
  }

  bindChilds () {
    const { px, py, content, rx, ry, angle } = this.sign;
    let ox = 20;
    let oy = -5;

    // this.attrs.style = `transform: rotate(${ angle }deg);transform-origin: ${ rx } ${ ry }`;

    /*this.attrs.transform = `rotate(${ this.sign.angle }deg)`;
    this.attrs['transform-origin'] = `${ rx } ${ ry }`;*/

    if (this.childs) {
      ox =(Number(this.childs[2].params.ops.x));
      oy =(Number(this.childs[2].params.ops.y));
    }

    const getStepPath = (position) => {
      return `
        M ${ position.x } ${ position.y } L ${ position.x + 6 } ${ position.y - 6 } 
        L ${ position.x + 8 } ${ position.y - 10 } L ${ position.x + 18 } ${ position.y - 20 } 
        L ${ position.x + 20 } ${ position.y - 18 } L ${ position.x + 10 } ${ position.y - 8 } 
        L ${ position.x + 6 } ${ position.y - 6 }
        M ${ position.x + 19 } ${ position.y - 19 } C ${ position.x + 28 } ${ position.y - 29 } ${ position.x + 27 } ${ position.y - 14 } ${ position.x + 38 } ${ position.y - 23 }`;
    };
    let childs = [];

    childs = [
      {
        type: 'sch_circle',
        attrs: {
          cx: px,
          cy: py,
          stroke: 'none',
          r: 1,
          fill: 'silver',
          'fill-opacity': 1,
          class: 'pindot',
        },
        params: {
          position: {
            x: px,
            y: py,
          },
          r: 1,
        }
      },
      {
        type: 'sch_path',
        attrs: {
          d: getStepPath({ x: px, y: py }),
          stroke: 'rgb(128, 0, 0)',
          'stroke-width': 1,
          fill: 'transparent',
        },
        params: {
          position: {
            x: px,
            y: py,
          },
          getStepPath,
        }
      },
      {
        type: 'sch_text',
        attrs: {
          x: px + ox,
          y: py + oy,
          'content': content,
          'stroke': 'none',
          'stroke-width': 0,
          'fill-opacity': 1,
          'font-family': 'Verdana',
          'font-size': '10',
          'text-anchor': 'start',
          'dominant-baseline': 'central',
        },
        params: {
          position: {
            x: px + ox,
            y: py + oy,
          },
          ops: {
            x: ox,
            y: oy,
          },
          content: content,
          moved: true,
        },
      },
    ];

    this.childs = this.alterChilds(childs);
  }

  bindNature () {
    const self = this;

    this.nature = [
      {
        title: '电压探针',
        list: [
          {
            type: 'text',
            name: '名称',
            get model () {
              return self.childs[2].attrs['content'] || '';
            },
            set model (value) {
              if (value) {
                self.childs[2].attrs['content'] = value;
              } else {
                self.childs[2].attrs['content'] = '';
              }
            },
          },
          {
            type: 'select',
            name: '显示名称',
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
            type: 'color',
            name: '颜色',
            get model () {
              return self.childs[1].attrs.stroke;
            },
            set model (value) {
              self.childs[1].attrs.stroke = value;
            },
          },
          {
            type: 'select',
            name: '字体',
            get model () {
              return self.childs[2].attrs['font-family'];
            },
            set model (value) {
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
            name: '字体大小',
            get model () {
              return self.childs[2].attrs['font-size'];
            },
            set model (value) {
              self.childs[2].attrs['font-size'] = value;
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
        ]
      }
    ];
  }
}
