import Group from '../basic/group';

export default class SchNetLabel extends Group {
  constructor(type, attrs, params) {
    super(type, attrs, params);

    this.sign = Object.assign(this.sign, {
      content: 'netLabel',
    });

    this.bindChilds();
    this.bindNature();
    this.bindSign();
  }

  bindChilds () {
    const { px, py, content } = this.sign;
    let ox = 10;
    let oy = -10;

    if (this.childs) {
      ox =(Number(this.childs[1].params.ops.x));
      oy =(Number(this.childs[1].params.ops.y));
    }

    const getStepPath = (position) => {
      return `
        M ${ position.x } ${ position.y } L ${ position.x } ${ position.y - 3 } 
        L ${ position.x } ${ position.y + 3 } M ${ position.x - 3 } ${ position.y } L ${ position.x + 3 } ${ position.y }`;
    };

    let childs = [];

    childs = [
      {
        type: 'sch_path',
        attrs: {
          d: getStepPath({ x: px, y: py }),
          stroke: '#800000',
          'stroke-width': 1,
          fill: null,
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
        title: '网络标签',
        list: [
          {
            type: 'text',
            name: '名称',
            get model () {
              return self.sign.content || '';
            },
            set model (value) {
              if (value) {
                self.sign.content = value;
              } else {
                self.sign.content = '';
              }
            },
          },
          {
            type: 'color',
            name: '标签颜色',
            get model () {
              return self.childs[0].attrs.stroke;
            },
            set model (value) {
              self.childs[0].attrs.stroke = value;
            },
          },
          {
            type: 'select',
            name: '字体',
            get model () {
              return self.childs[1].attrs['font-family'];
            },
            set model (value) {
              self.childs[1].attrs['font-family'] = value;
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
              return self.childs[1].attrs['font-size'];
            },
            set model (value) {
              self.childs[1].attrs['font-size'] = value;
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
