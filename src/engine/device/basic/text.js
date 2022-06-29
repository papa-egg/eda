import Basic from './basic';

export default class Text extends Basic {
  constructor (type, attrs, params) {
    super(type, attrs, params);

    this.type = 'text';
  }

  updateSignMsg () {
    const { px, py, content, angle } = this.sign;

    this.attrs.content = content;
    this.attrs.x = px;
    this.attrs.y = py;
    this.attrs['transform-origin'] = `${ px } ${ py }`;

    const corePt = this.getCorePoint();
    this.attrs.transform = `rotate(${ angle || 0 }, ${  corePt[0] || 0 }, ${ corePt[1] || 0 })`;
  }
}
