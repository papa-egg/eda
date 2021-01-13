import Raw from './raw';

export default class Path extends Raw {
  constructor ({ props }) {
    super(props);

    this.type = 'path';

    this.startAssign(props);
  }
}
