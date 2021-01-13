import Raw from './raw';

export default class Polyline extends Raw {
  constructor ({ props }) {
    super(props);

    this.type = 'polyline';

    this.attrs = Object.assign(this.attrs, {
      'points': '',
    });

    this.startAssign(props);
  }
}
