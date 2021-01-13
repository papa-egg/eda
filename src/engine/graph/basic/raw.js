import DEFAULT from '@/assets/js/default';

export default class Raw {
  constructor () {
    this.attrs = {
      'stroke': DEFAULT['stroke'],
      'stroke-width': DEFAULT['stroke-width'],
      'fill': DEFAULT['fill'],
      'fill-opacity': DEFAULT['fill-opacity'],
    };
  }

  startAssign (props = {}) {
    if (Object.prototype.toString.call(props) !== '[object Object]') {
      throw new Error(`属性参数不合法：${ typeof props }`);
    }

    /*if (props.props) {
      props = props.props;
    }

    console.log(props);*/

    for (let prop in props) {
      if (prop !== 'attrs') {
        this[prop] = props[prop];
      } else {
        this.setAttrs(props[prop]);
      }
    }
  }

  setAttrs (attrObj = {}) {
    if (Object.prototype.toString.call(attrObj) !== '[object Object]') {
      throw new Error(`属性参数不合法：${ typeof attrObj }`);
    }

    const unDiscernArr = [];

    for (let attrItem in attrObj) {

      this.attrs[attrItem] = attrObj[attrItem];
      /*if (true) {

      } else {
        unDiscernArr.push(attrItem);
      }*/
    }

    if (unDiscernArr.length > 0) {
      console.warn(`属性参数异常,无法设置：${ unDiscernArr.join('-') }`);
    }
  }
}
