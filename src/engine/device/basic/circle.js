import Basic from './basic';

export default class Circle extends Basic {
  constructor (type, attrs, params) {
    super(type, attrs, params);

    this.type = 'circle';
  }

  updateSignMsg () {
    const { px, py, r, angle } = this.sign;

    this.attrs.cx = px;
    this.attrs.cy = py;
    this.attrs.r = r;

    const corePt = this.getCorePoint();
    this.attrs.transform = `rotate(${ angle || 0 }, ${  corePt[0] || 0 }, ${ corePt[1] || 0 })`;
  }
}
