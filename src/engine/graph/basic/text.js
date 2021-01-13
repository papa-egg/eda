import Raw from './raw';

export default class Text extends Raw {
  constructor ({ props }) {
    super(props);

    this.type = 'text';
    this.attrs = Object.assign(this.attrs, {
      'content': '',
      'x': 0,
      'y': 0,
      'transform-origin': '',
      'stroke-width' : 0,
      'fill': 'rgb(0,0,128)',
      'fill-opacity': 1,
    });

    this.startAssign(props);
  }
}
