import Group from '../basic/group';

export default class SchGroup extends Group {
  constructor (type, attrs, params) {
    super(type, attrs, params);

    this.attrs = Object.assign({}, this.attrs);

    this.sign = Object.assign(this.sign, {});

    this.childs = this.alterChilds(params.childs);
    // this.bindChilds();
    this.bindNature();
    this.bindSign();
  }

  bindNature () {
    const self = this;


  }
}


