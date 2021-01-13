import Raw from './raw';
import Graph from '../graph';

export default class Group extends Raw {
  constructor ({ props }) {
    super(props);

    this.type = 'g';
    this.attrs = Object.assign(this.attrs, {
      transform: '',
      childs: [],
    });

    this.startAssign(props);
  }

  static createGraphElems (desArr) {
    const gArr = [];

    for (let des of desArr) {
      gArr.push(new Graph().getSketchElem([des]));
    }

    return gArr;
  }
}
