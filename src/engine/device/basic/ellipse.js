import Basic from './basic';

export default class Ellipse extends Basic {
  constructor (type, attrs, params) {
    super(type, attrs, params);

    this.type = 'ellipse';
  }

  updateSignMsg () {
    const { px, py, rx, ry, angle } = this.sign;

    this.attrs.cx = px;
    this.attrs.cy = py;
    this.attrs['rx'] = rx;
    this.attrs['ry'] = ry;

    const corePt = this.getCorePoint();
    this.attrs.transform = `rotate(${ angle || 0 }, ${  corePt[0] || 0 }, ${ corePt[1] || 0 })`;
  }
}
