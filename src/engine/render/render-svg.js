
export default {
  name: 'render-svg',
  functional: true,
  render (crateElement, { data: { attrs: { elem, zoom } } }) {
    const attributes = {};
    const childArr = [];

    if (elem.position && (elem.position.x || elem.position.y)) {
      attributes['transform'] = `translate(${ elem.position.x }, ${ -(elem.position.y + elem.attrs.width) })`;
    }

    if (elem.type === 'g') {
      for (let child of elem.childs) {
        childArr.push(
          crateElement('render-svg', { attrs: { elem: child, zoom } }),
        )
      }
    }

    for (let attr in elem.attrs) {
      if (attr === 'stroke-width' && Math.abs(Number(elem.attrs[attr])) > 0) {
        attributes[attr] = Number(elem.attrs[attr]) / (zoom > 1 ? 1 : zoom);
      } else {
        attributes[attr] = elem.attrs[attr];
      }
    }

    if (elem.content || elem.attrs.content) {
      return crateElement(elem.type, { attrs: attributes, domProps: { innerHTML: (elem.content || elem.attrs.content) } }, childArr.length > 0 ? childArr : undefined);
    } else {
      return crateElement(elem.type, { attrs: attributes }, childArr.length > 0 ? childArr : undefined);
    }

  }
}
