import Graph from '@/engine/graph/graph';

export default class Paint {
  constructor () {
    this.graph = new Graph();
    this.fragElem = null;
  }

  createGraphElem (des) {
    return this.graph.getSketchElem(des);
  }

  saveFragElem (elem) {
    let fragElem = null;

    if (elem.fragElem) {

      fragElem = elem.fragElem[0];
      delete elem.fragElem;
    } else {
      fragElem = elem;
    }
    this.fragElem = JSON.parse(JSON.stringify(fragElem));
  }

  getFragElem () {
    return this.fragElem;
  }
}
