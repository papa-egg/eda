import { layerConfig } from '../common/overall-config';

export default {
  name: 'render-svg',
  functional: true,
  render (crateElement, { data: { attrs: { elem, zoom, parent } } }) {
    const attributes = {};
    const childArr = [];

    parent = parent || elem;

    if (elem.position && (elem.position.x || elem.position.y)) {
      attributes['transform'] = `translate(${ elem.position.x }, ${ -(elem.position.y + elem.attrs.width) })`;
    }

    if (elem.type === 'g') {
      for (let child of elem.childs) {
        childArr.push(
          crateElement('render-svg', { attrs: { elem: child, zoom, parent, } }),
        )
      }
    }

    for (let attr in elem.attrs) {
      if (attr === 'stroke-width' && Math.abs(Number(elem.attrs[attr])) > 0 && elem.attrs['vector-effect'] !== 'non-scaling-stroke') {
        attributes[attr] = elem.attrs[attr];
        // attributes[attr] = Number(elem.attrs[attr]) / (zoom > 1 ? 1 : zoom);
      } else {
        attributes[attr] = elem.attrs[attr];
      }
    }

    if (parent.sign && parent.sign.layer) {
      let color = '';

      if (elem.sign && elem.sign.layer) {
        color = layerConfig.getLayerColor(elem.sign.layer);
      } else {
        color = layerConfig.getLayerColor(parent.sign.layer);
      }

      if (attributes['fill'] === 'auto') {
        attributes['fill'] = color;
      }

      if (attributes['stroke'] === 'auto') {
        attributes['stroke'] = color;
      }
    }

    if (elem.sign.vHide) {
      attributes['visibility'] = 'hidden';
    }

    if (elem && (elem.content || elem.attrs.content)) {
      return crateElement(elem.type, { attrs: attributes, domProps: { innerHTML: (elem.content || elem.attrs.content) } }, childArr.length > 0 ? childArr : undefined);
    } else {
      return crateElement(elem.type, { attrs: attributes }, childArr.length > 0 ? childArr : undefined);
    }
  }
}
