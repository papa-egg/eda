import Raw from './raw';

export default class Circle extends Raw {
  constructor ({ props }) {
    super(props);

    this.type = 'circle';
    this.attrs = Object.assign(this.attrs, {
      'cx': 0,
      'cy': 0,
      'r': 0,
    });

    this.startAssign(props);
  }
}
