import Basic from './basic';

export default class Path extends Basic {
  constructor (type, attrs, params) {
    super(type, attrs, params);

    this.getStepPath = this.stepFunc(params);
    this.type = 'path';
  }

  stepFunc (params) {
    if (params.getStepPathStr) {
      const rel = new Function('position', params.getStepPathStr);

      return rel;
    }
  }

  updateSignMsg () {
    const { px, py, angle } = this.sign;

    this.attrs.d = this.getStepPath({ x: px, y: py });

    const corePt = this.getCorePoint();
    this.attrs.transform = `rotate(${ angle || 0 }, ${  corePt[0] || 0 }, ${ corePt[1] || 0 })`;
  }
}
