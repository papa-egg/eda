import Basic from './basic';
import Device from '@/engine/device/device';

export default class Group extends Basic {
  constructor (type, attrs, params) {
    super(type, attrs, params);

    this.type = 'g';
  }

  updateSignMsg () {
    this.bindChilds();
  }

  createChildElem (childs) {
    if (!Array.isArray(childs)) return;
    const childElems = [];

    for (let child of childs) {
      if (!child.params) child.params = {};

      if (!child.params.layer) child.params.layer = this.sign.layer;

      childElems.push(Device.createElem(child));
    }

    return childElems;
    // this.childs = childElems;
  }

  alterChilds (childs) {
    if (!Array.isArray(childs)) return;

    const realChilds = this.createChildElem(childs);

    if (!this.childs || this.childs.length <= 0) return realChilds;

    const rel = [];

    for (let [index, child] of realChilds.entries()) {
      const originElem = this.childs[index];

      if (originElem.type !== child.type) {
        rel.push(child);
      } else {
        delete child.attrs.id;
        Object.assign(originElem.attrs, child.attrs);

        for (let key in child.sign) {
          if (key === 'id') continue;

          if (originElem.sign[key] instanceof Object) {
            Object.assign(originElem.sign[key], child.sign[key]);
          } else {
            originElem.sign[key] = child.sign[key]
          }
        }

        rel.push(originElem);
      }
    }

    return rel;
  }
}
