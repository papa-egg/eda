import Sketch from './sektch';

export default class Text extends Sketch {
  constructor (attrs, params, parent) {
    super(attrs, params, parent);

    this.type = 'text';

    this.extract = {
      'content': attrs.content,
      'font-family': attrs['font-family'],
      'font-size': attrs['font-size'],
      'font-weight': attrs['font-weight'],
      'font-style': attrs['font-style'],
      'x': attrs.x,
      'y': attrs.y,
    };

    // this.getPathArr();
    this.setPathArr(this.extract);
    this.bindAttrs(attrs);

  }

  setPathArr (attrs) {
    const box = this.dom.getBBox();

    this.pathArr = this.getProfile({
      type: this.type,
      attrs,
      box,
    });

    this.setBox();
    this.setOBox();
    this.renderPath(this.pathArr);
  }

  /*setPathArr () {
    const pathArr = [];
    const box = this.dom.getBBox();
    pathArr[0] = `M ${ box.x } ${ box.y }h${ box.width }v${ box.height }h-${ box.width } z`;

    this.getProfile = this.getProfile({
      type: 'text',
      box,
    })

    // this.pathArr = this.getPoly(pathArr);
    this.setBox();
    this.setOBox();
    this.renderPath(this.pathArr);
  }*/
}
