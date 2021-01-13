import Raw from './raw';

export default class Rect extends Raw {
  constructor ({ props }) {
    super(props);

    this.type = 'ellipse';
    this.attrs = Object.assign(this.attrs, {
      cx: 0,
      cy: 0,
      rx: 0,
      ry: 0,
    });

    this.startAssign(props);
  }
}
