import Raw from './raw';

export default class Polygon extends Raw {
  constructor ({ props }) {
    super(props);

    this.type = 'polygon';
    this.attrs = Object.assign(this.attrs, {
      'points': '',
    });

    this.startAssign(props);
  }
}
