import Group from '../basic/group';

export default class PcbPad extends Group {
  constructor(type, attrs, params) {
    super(type, attrs, params);

    this.sign = Object.assign(this.sign, {
      width: 60,
      height: 60,
      number: 1,
      graph: 'circle',
      net: '',
      ep: 0,
      op: 4,
      holeType: 'long',
      holeLength: 0,
      holeDia: 30,
    });

    this.bindChilds();
    // this.bindNature();
    this.bindSign();
  }

  bindChilds () {
    const { px, py, width = 1, height = 1, number, holeDia, graph, holeLength, ep, op, layer } = this.sign;

    let childs = [];

    // 圆形
    if (graph == 'circle') {
      const dia = Math.min(width, height);

      if (layer == 'L_1') {
        childs = [
          {
            type: 'pcb_circle',
            attrs: {
              cx: px,
              cy: py,
              r: (dia + op) / 2,
              stroke: 'none',
              fill: 'auto',
            },
            params: {
              position: {
                x: px,
                y: py,
              },
              r: (dia + op) / 2,
              layer: 'L_7'
            }
          },
          {
            type: 'pcb_circle',
            attrs: {
              cx: px,
              cy: py,
              r: (dia + ep) / 2,
              stroke: 'none',
              fill: 'auto',
            },
            params: {
              position: {
                x: px,
                y: py,
              },
              r: (dia + ep) / 2,
              layer: 'L_5'
            }
          },
          {
            type: 'pcb_circle',
            attrs: {
              cx: px,
              cy: py,
              r: (dia) / 2,
              stroke: 'none',
              fill: 'auto',
            },
            params: {
              position: {
                x: px,
                y: py,
              },
              r: (dia) / 2,
              layer: 'L_1'
            }
          },
          {
            type: 'pcb_polyline',
            attrs: {
              points: `${ px - holeLength / 2 } ${ py } ${ px + holeLength / 2 } ${ py }`,
              'stroke': '#000000',
              'stroke-width': holeDia,
            },
            params: {
              position: {
                x: px - holeLength / 2,
                y: py,
              },
              layer: 'L_11',
              vHide: true,
            }
          },
          {
            type: 'pcb_text',
            attrs: {
              'content': number,
              'x': px,
              'y': py,
              'transform-origin': `${ px } ${ py }`,
              'font-size': '9',
              'text-anchor': 'middle',
              'dominant-baseline': 'central',
              'fill': '#ffffff',
            },
            params: {
              position: {
                x: px,
                y: py,
              },
              content: number,
              layer: 'L_1'
            }
          }
        ];
      }

      if (layer == 'L_2') {
        childs = [
          {
            type: 'pcb_circle',
            attrs: {
              cx: px,
              cy: py,
              r: (dia + op) / 2,
              stroke: 'none',
              fill: 'auto',
            },
            params: {
              position: {
                x: px,
                y: py,
              },
              r: (dia + op) / 2,
              layer: 'L_8'
            }
          },
          {
            type: 'pcb_circle',
            attrs: {
              cx: px,
              cy: py,
              r: (dia + ep) / 2,
              stroke: 'none',
              fill: 'auto',
            },
            params: {
              position: {
                x: px,
                y: py,
              },
              r: (dia + ep) / 2,
              layer: 'L_6'
            }
          },
          {
            type: 'pcb_circle',
            attrs: {
              cx: px,
              cy: py,
              r: (dia) / 2,
              stroke: 'none',
              fill: 'auto',
            },
            params: {
              position: {
                x: px,
                y: py,
              },
              r: (dia) / 2,
              layer: 'L_2'
            }
          },
          {
            type: 'pcb_polyline',
            attrs: {
              points: `${ px - holeLength / 2 } ${ py } ${ px + holeLength / 2 } ${ py }`,
              'stroke': '#000000',
              'stroke-width': holeDia,
            },
            params: {
              position: {
                x: px - holeLength / 2,
                y: py,
              },
              layer: 'L_11',
              vHide: true,
            }
          },
          {
            type: 'pcb_text',
            attrs: {
              'content': number,
              'x': px,
              'y': py,
              'transform-origin': `${ px } ${ py }`,
              'font-size': '9',
              'text-anchor': 'middle',
              'dominant-baseline': 'central',
              'fill': '#ffffff',
            },
            params: {
              position: {
                x: px,
                y: py,
              },
              content: number,
              layer: 'L_2'
            }
          }
        ];
      }

      if (layer == 'L_11') {
        childs = [
          {
            type: 'pcb_circle',
            attrs: {
              cx: px,
              cy: py,
              r: (dia + op) / 2,
              stroke: 'none',
              fill: 'auto',
            },
            params: {
              position: {
                x: px,
                y: py,
              },
              r: (dia + op) / 2,
              layer: 'L_8'
            }
          },
          {
            type: 'pcb_circle',
            attrs: {
              cx: px,
              cy: py,
              r: (dia + op) / 2,
              stroke: 'none',
              fill: 'auto',
            },
            params: {
              position: {
                x: px,
                y: py,
              },
              r: (dia + op) / 2,
              layer: 'L_7'
            }
          },
          {
            type: 'pcb_circle',
            attrs: {
              cx: px,
              cy: py,
              r: (dia) / 2,
              stroke: 'none',
              fill: 'auto',
            },
            params: {
              position: {
                x: px,
                y: py,
              },
              r: (dia) / 2,
              layer: 'L_11'
            }
          },
          {
            type: 'pcb_polyline',
            attrs: {
              points: `${ px - holeLength / 2 } ${ py } ${ px + holeLength / 2 } ${ py }`,
              'stroke': '#000000',
              'stroke-width': holeDia,
            },
            params: {
              position: {
                x: px - holeLength / 2,
                y: py,
              },
              layer: 'L_11',
            }
          },
          {
            type: 'pcb_text',
            attrs: {
              'content': number,
              'x': px,
              'y': py,
              'transform-origin': `${ px } ${ py }`,
              'font-size': '9',
              'text-anchor': 'middle',
              'dominant-baseline': 'central',
              'fill': 'auto',
            },
            params: {
              position: {
                x: px,
                y: py,
              },
              content: number,
              layer: 'L_11'
            }
          }
        ];
      }
    }

    // 矩形
    if (graph == 'rect') {

      if (layer == 'L_1') {
        childs = [
          {
            type: 'pcb_rect',
            attrs: {
              x: px - (width / 2) - op,
              y: py - (height / 2) - op,
              width: width + op * 2,
              height: height + op * 2,
              stroke: 'none',
              fill: 'auto',
            },
            params: {
              position: {
                x: px - (width / 2) - op,
                y: py - (height / 2) - op,
              },
              layer: 'L_7'
            }
          },
          {
            type: 'pcb_rect',
            attrs: {
              x: px - (width / 2) - ep,
              y: py - (height / 2) - ep,
              width: width + ep * 2,
              height: height + ep * 2,
              stroke: 'none',
              fill: 'auto',
            },
            params: {
              position: {
                x: px - (width / 2) - ep,
                y: py - (height / 2) - ep,
              },
              layer: 'L_5'
            }
          },
          {
            type: 'pcb_rect',
            attrs: {
              x: px - (width / 2),
              y: py - (height / 2),
              width: width,
              height: height,
              stroke: 'none',
              fill: 'auto',
            },
            params: {
              position: {
                x: px - (width / 2),
                y: py - (height / 2),
              },
              layer: 'L_1'
            }
          },
          {
            type: 'pcb_polyline',
            attrs: {
              points: `${ px - holeLength / 2 } ${ py } ${ px + holeLength / 2 } ${ py }`,
              'stroke': '#000000',
              'stroke-width': holeDia,
            },
            params: {
              position: {
                x: px - holeLength / 2,
                y: py,
              },
              layer: 'L_11',
              vHide: true,
            }
          },
          {
            type: 'pcb_text',
            attrs: {
              'content': number,
              'x': px,
              'y': py,
              'transform-origin': `${ px } ${ py }`,
              'font-size': '9',
              'text-anchor': 'middle',
              'dominant-baseline': 'central',
              'fill': '#ffffff',
            },
            params: {
              position: {
                x: px,
                y: py,
              },
              content: number,
              layer: 'L_1'
            }
          }
        ]
      }

      if (layer == 'L_2') {
        childs = [
          {
            type: 'pcb_rect',
            attrs: {
              x: px - (width / 2) - op,
              y: py - (height / 2) - op,
              width: width + op * 2,
              height: height + op * 2,
              stroke: 'none',
              fill: 'auto',
            },
            params: {
              position: {
                x: px - (width / 2) - op,
                y: py - (height / 2) - op,
              },
              layer: 'L_8'
            }
          },
          {
            type: 'pcb_rect',
            attrs: {
              x: px - (width / 2) - ep,
              y: py - (height / 2) - ep,
              width: width + ep * 2,
              height: height + ep * 2,
              stroke: 'none',
              fill: 'auto',
            },
            params: {
              position: {
                x: px - (width / 2) - ep,
                y: py - (height / 2) - ep,
              },
              layer: 'L_6'
            }
          },
          {
            type: 'pcb_rect',
            attrs: {
              x: px - (width / 2),
              y: py - (height / 2),
              width: width,
              height: height,
              stroke: 'none',
              fill: 'auto',
            },
            params: {
              position: {
                x: px - (width / 2),
                y: py - (height / 2),
              },
              layer: 'L_2'
            }
          },
          {
            type: 'pcb_polyline',
            attrs: {
              points: `${ px - holeLength / 2 } ${ py } ${ px + holeLength / 2 } ${ py }`,
              'stroke': '#000000',
              'stroke-width': holeDia,
            },
            params: {
              position: {
                x: px - holeLength / 2,
                y: py,
              },
              layer: 'L_11',
              vHide: true,
            }
          },
          {
            type: 'pcb_text',
            attrs: {
              'content': number,
              'x': px,
              'y': py,
              'transform-origin': `${ px } ${ py }`,
              'font-size': '9',
              'text-anchor': 'middle',
              'dominant-baseline': 'central',
              'fill': '#ffffff',
            },
            params: {
              position: {
                x: px,
                y: py,
              },
              content: number,
              layer: 'L_2'
            }
          }
        ]
      }

      if (layer == 'L_11') {
        childs = [
          {
            type: 'pcb_rect',
            attrs: {
              x: px - (width / 2) - op,
              y: py - (height / 2) - op,
              width: width + op * 2,
              height: height + op * 2,
              stroke: 'none',
              fill: 'auto',
            },
            params: {
              position: {
                x: px - (width / 2) - op,
                y: py - (height / 2) - op,
              },
              layer: 'L_8'
            }
          },
          {
            type: 'pcb_rect',
            attrs: {
              x: px - (width / 2) - op,
              y: py - (height / 2) - op,
              width: width + op * 2,
              height: height + op * 2,
              stroke: 'none',
              fill: 'auto',
            },
            params: {
              position: {
                x: px - (width / 2) - op,
                y: py - (height / 2) - op,
              },
              layer: 'L_7'
            }
          },
          {
            type: 'pcb_rect',
            attrs: {
              x: px - (width / 2),
              y: py - (height / 2),
              width: width,
              height: height,
              stroke: 'none',
              fill: 'auto',
            },
            params: {
              position: {
                x: px - (width / 2),
                y: py - (height / 2),
              },
              layer: 'L_11'
            }
          },
          {
            type: 'pcb_polyline',
            attrs: {
              points: `${ px - holeLength / 2 } ${ py } ${ px + holeLength / 2 } ${ py }`,
              'stroke': '#000000',
              'stroke-width': holeDia,
            },
            params: {
              position: {
                x: px - holeLength / 2,
                y: py,
              },
              layer: 'L_11',
            }
          },
          {
            type: 'pcb_text',
            attrs: {
              'content': number,
              'x': px,
              'y': py,
              'transform-origin': `${ px } ${ py }`,
              'font-size': '9',
              'text-anchor': 'middle',
              'dominant-baseline': 'central',
              'fill': 'auto',
            },
            params: {
              position: {
                x: px,
                y: py,
              },
              content: number,
              layer: 'L_11'
            }
          }
        ];
      }
    }

    // 长圆形
    if (graph == 'long') {
      const pArr = [];
      const sk = Math.min(Number(width), Number(height));

      if (width > height) {
        pArr[0] = {
          x: px - (width - height) / 2,
          y: py,
        }

        pArr[1] = {
          x: px + (width - height) / 2,
          y: py,
        }
      } else {
        pArr[0] = {
          x: px,
          y: py - (height - width) / 2,
        }

        pArr[1] = {
          x: px,
          y: py + (height - width) / 2,
        }
      }

      if (layer == 'L_1') {
        childs = [
          {
            type: 'pcb_polyline',
            attrs: {
              points: `${ pArr[0].x } ${ pArr[0].y } ${ pArr[1].x } ${ pArr[1].y }`,
              'stroke': 'auto',
              fill: 'none',
              'stroke-width': sk + op,
            },
            params: {
              position: {
                x: pArr[0].x,
                y: pArr[0].y,
              },
              layer: 'L_7',
            }
          },
          {
            type: 'pcb_polyline',
            attrs: {
              points: `${ pArr[0].x } ${ pArr[0].y } ${ pArr[1].x } ${ pArr[1].y }`,
              'stroke': 'auto',
              fill: 'none',
              'stroke-width': sk + ep,
            },
            params: {
              position: {
                x: pArr[0].x,
                y: pArr[0].y,
              },
              layer: 'L_5',
            }
          },
          {
            type: 'pcb_polyline',
            attrs: {
              points: `${ pArr[0].x } ${ pArr[0].y } ${ pArr[1].x } ${ pArr[1].y }`,
              'stroke': 'auto',
              fill: 'none',
              'stroke-width': sk,
            },
            params: {
              position: {
                x: pArr[0].x,
                y: pArr[0].y,
              },
              layer: 'L_1',
            }
          },
          {
            type: 'pcb_polyline',
            attrs: {
              points: `${ px - holeLength / 2 } ${ py } ${ px + holeLength / 2 } ${ py }`,
              'stroke': '#000000',
              'stroke-width': holeDia,
            },
            params: {
              position: {
                x: px - holeLength / 2,
                y: py,
              },
              layer: 'L_11',
              vHide: true,
            }
          },
          {
            type: 'pcb_text',
            attrs: {
              'content': number,
              'x': px,
              'y': py,
              'transform-origin': `${ px } ${ py }`,
              'font-size': '9',
              'text-anchor': 'middle',
              'dominant-baseline': 'central',
              'fill': '#ffffff',
            },
            params: {
              position: {
                x: px,
                y: py,
              },
              content: number,
              layer: 'L_1'
            }
          }
        ];
      }

      if (layer == 'L_2') {
        childs = [
          {
            type: 'pcb_polyline',
            attrs: {
              points: `${ pArr[0].x } ${ pArr[0].y } ${ pArr[1].x } ${ pArr[1].y }`,
              'stroke': 'auto',
              fill: 'none',
              'stroke-width': sk + op,
            },
            params: {
              position: {
                x: pArr[0].x,
                y: pArr[0].y,
              },
              layer: 'L_8',
            }
          },
          {
            type: 'pcb_polyline',
            attrs: {
              points: `${ pArr[0].x } ${ pArr[0].y } ${ pArr[1].x } ${ pArr[1].y }`,
              'stroke': 'auto',
              fill: 'none',
              'stroke-width': sk + ep,
            },
            params: {
              position: {
                x: pArr[0].x,
                y: pArr[0].y,
              },
              layer: 'L_6',
            }
          },
          {
            type: 'pcb_polyline',
            attrs: {
              points: `${ pArr[0].x } ${ pArr[0].y } ${ pArr[1].x } ${ pArr[1].y }`,
              'stroke': 'auto',
              fill: 'none',
              'stroke-width': sk,
            },
            params: {
              position: {
                x: pArr[0].x,
                y: pArr[0].y,
              },
              layer: 'L_2',
            }
          },
          {
            type: 'pcb_polyline',
            attrs: {
              points: `${ px - holeLength / 2 } ${ py } ${ px + holeLength / 2 } ${ py }`,
              'stroke': '#000000',
              'stroke-width': holeDia,
            },
            params: {
              position: {
                x: px - holeLength / 2,
                y: py,
              },
              layer: 'L_11',
              vHide: true,
            }
          },
          {
            type: 'pcb_text',
            attrs: {
              'content': number,
              'x': px,
              'y': py,
              'transform-origin': `${ px } ${ py }`,
              'font-size': '9',
              'text-anchor': 'middle',
              'dominant-baseline': 'central',
              'fill': '#ffffff',
            },
            params: {
              position: {
                x: px,
                y: py,
              },
              content: number,
              layer: 'L_2'
            }
          }
        ];
      }

      if (layer == 'L_11') {
        childs = [
          {
            type: 'pcb_polyline',
            attrs: {
              points: `${ pArr[0].x } ${ pArr[0].y } ${ pArr[1].x } ${ pArr[1].y }`,
              'stroke': 'auto',
              fill: 'none',
              'stroke-width': sk + op,
            },
            params: {
              position: {
                x: pArr[0].x,
                y: pArr[0].y,
              },
              layer: 'L_8',
            }
          },
          {
            type: 'pcb_polyline',
            attrs: {
              points: `${ pArr[0].x } ${ pArr[0].y } ${ pArr[1].x } ${ pArr[1].y }`,
              'stroke': 'auto',
              fill: 'none',
              'stroke-width': sk + op,
            },
            params: {
              position: {
                x: pArr[0].x,
                y: pArr[0].y,
              },
              layer: 'L_7',
            }
          },
          {
            type: 'pcb_polyline',
            attrs: {
              points: `${ pArr[0].x } ${ pArr[0].y } ${ pArr[1].x } ${ pArr[1].y }`,
              'stroke': 'auto',
              fill: 'none',
              'stroke-width': sk,
            },
            params: {
              position: {
                x: pArr[0].x,
                y: pArr[0].y,
              },
              layer: 'L_11',
            }
          },
          {
            type: 'pcb_polyline',
            attrs: {
              points: `${ px - holeLength / 2 } ${ py } ${ px + holeLength / 2 } ${ py }`,
              'stroke': '#000000',
              fill: 'none',
              'stroke-width': holeDia,
            },
            params: {
              position: {
                x: px - holeLength / 2,
                y: py,
              },
              layer: 'L_11',
            }
          },
          {
            type: 'pcb_text',
            attrs: {
              'content': number,
              'x': px,
              'y': py,
              'transform-origin': `${ px } ${ py }`,
              'font-size': '9',
              'text-anchor': 'middle',
              'dominant-baseline': 'central',
              'fill': 'auto',
            },
            params: {
              position: {
                x: px,
                y: py,
              },
              content: number,
              layer: 'L_11'
            }
          }
        ];
      }
    }

    this.childs = this.alterChilds(childs);
    this.bindNature();
  }

  bindNature () {
    const self = this;

    this.nature = [
      {
        title: '焊盘',
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
              self.params.layer = value;
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
                value: 'L_11',
                label: '多层',
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
                self.params['net'] = value;
              } else {
                self.sign['net'] = '';
                self.params['net'] = '';
              }
            },
          },
          {
            type: 'text',
            name: '编号',
            get model () {
              return self.sign['number'] || '';
            },
            set model (value) {
              if (value) {
                self.sign['number'] = value;
              } else {
                self.sign['number'] = '';
              }
            },
          },
          {
            type: 'select',
            name: '形状',
            self: this,
            get model () {
              return self.sign.graph;
            },
            set model (value) {
              self.sign.graph = value;
              self.params.graph = value;

              if (self.sign.graph == 'circle') {
                self.sign.height = Number(self.sign.width) || 0;
              }
            },
            options: [
              {
                value: 'circle',
                label: '圆形',
              },
              {
                value: 'rect',
                label: '矩形',
              },
              {
                value: 'long',
                label: '长圆形',
              },
            ]
          },
          {
            type: 'number',
            name: '中心X',
            get model () {
              return self.sign.px || 0;
            },
            set model (value) {
              self.sign.px = value;
            },
          },
          {
            type: 'number',
            name: '中心Y',
            get model () {
              return -self.sign.py || 0;
            },
            set model (value) {
              self.sign.py = -value;
            },
          },
          {
            type: 'number',
            name: '宽',
            get model () {
              return self.sign.width || 0;
            },
            set model (value) {
              if (self.sign.graph == 'circle') {
                self.sign.width = Number(value) || 0;
                self.sign.height = Number(value) || 0;
              } else {
                self.sign.width = Number(value) || 0;
              }
            },
          },
          {
            type: 'number',
            name: '高',
            get model () {
              return self.sign.height || 0;
            },
            set model (value) {
              if (self.sign.graph == 'circle') {
                self.sign.width = Number(value) || 0;
                self.sign.height = Number(value) || 0;
              } else {
                self.sign.height = Number(value) || 0;
              }
            },
          },
          {
            type: 'number',
            name: '孔长度',
            vHide: self.sign.layer != 'L_11',
            get model () {
              return self.sign.holeLength || 0;
            },
            set model (value) {
              self.sign.holeLength = Number(value) || 0;
            },
          },
          {
            type: 'number',
            name: '孔直径',
            vHide: self.sign.layer != 'L_11',
            get model () {
              return self.sign.holeDia || 0;
            },
            set model (value) {
              self.sign.holeDia = Number(value) || 0;
            },
          },
          {
            type: 'number',
            name: '助焊拓展',
            vHide: self.sign.layer == 'L_11',
            get model () {
              return self.sign.ep || 0;
            },
            set model (value) {
              self.sign.ep = Number(value) || 0;
            },
          },
          {
            type: 'number',
            name: '阻焊拓展',
            get model () {
              return self.sign.op || 0;
            },
            set model (value) {
              self.sign.op = Number(value) || 0;
            },
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
