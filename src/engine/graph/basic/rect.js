import Raw from './raw';

export default class Rect extends Raw {
  constructor ({ props }) {
    super(props);

    this.type = 'rect';
    this.attrs = Object.assign(this.attrs, {
      x: 0,
      y: 0,
      width: 0,
      height: 0,
    });

    this.startAssign(props);
  }
}
