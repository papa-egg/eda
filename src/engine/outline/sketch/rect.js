import Sketch from './sektch';

export default class Rect extends Sketch {
  constructor (attrs, params, parent) {
    super(attrs, params, parent);

    this.type = 'rect';

    this.extract = {
      'x': attrs['x'],
      'y': attrs['y'],
      'width': attrs['width'],
      'height': attrs['height'],
      'stroke-width': attrs['stroke-width'],
      'fill': attrs['fill'],
    };

    this.pathArr = this.getProfile({ type: 'circle', attrs: { 'cx': 0, 'cy': 0, 'r': 10,}});

    // this.getPathArr();
    this.setPathArr(this.extract);
    this.bindAttrs(attrs);

  }

  setPathArr (attrs) {
    this.pathArr = this.getProfile({
      type: this.type,
      attrs,
    });

    this.setBox();
    this.setOBox();
    this.renderPath(this.pathArr);
  }

  /*setPathArr ({ x: cx, y: cy, width: cw, height: ch, 'stroke-width': sw, fill }) {
    const pathArr = [];
    const pRect = {
      x: cx - sw / 2,
      y: cy - sw / 2,
      width: Number(cw) + sw,
      height: Number(ch) + sw,
    };

    const iRect = {
      x: cx + sw / 2,
      y: cy + sw / 2,
      width: Number(cw) - sw,
      height: Number(ch) - sw,
    };

    /!*if (fill === 'none') {
      pathArr[0] = `M ${ pRect.x } ${ iRect.y } v${ ch } h${ pRect.width }v-${ pRect.height }
                    h-${ pRect.width }v${ sw }h${ cw }v${ iRect.height }
                    h-${ iRect.width }v-${ iRect.height } z`;
    } else {
      pathArr[0] = `M ${ pRect.x } ${ pRect.y }h${ pRect.width }v${ pRect.height }h-${ pRect.width } z`;
    }*!/

    this.pathArr = this.getProfile({
      type: 'rect',

    })


    // this.pathArr = this.getPoly(pathArr);
    this.setBox();
    this.setOBox();
    this.renderPath(this.pathArr);
  }*/
}
