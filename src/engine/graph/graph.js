import Circle from './basic/circle';
import Ellipse from './basic/ellipse';
import Group from './basic/group';
import Polygon from './basic/polygon';
import Polyline from './basic/polyline';
import Rect from './basic/rect';
import Text from './basic/text';
import Path from './basic/path';

import Sch_Line from './sch/line';
import Sch_Rect from './sch/rect';
import Sch_Polygon from './sch/polygon';
import Sch_Elliptic from './sch/elliptic';
import Sch_Ellipse from './sch/ellipse';
import Sch_Text from './sch/text';
import Sch_Pin from './sch/pin';
import Sch_Bessel from './sch/bessel';
import Sch_Bank from './sch/bank';


export default class Graph {
  constructor () {}

  getSketchElem (desArr) {
    if (!Array.isArray(desArr)) {
      throw new Error(`属性参数不合法，不是数组：${ typeof desArr }`);
    }

    let elem = {};

    for (let desItem of desArr) {
      desItem = Object.assign({ type: '', props: { attrs: {} }, params: {} }, desItem);
      elem = Graph.getSketchMatch(desItem);
    }

    return elem;
  }

  static getSketchMatch (desItem) {
    switch (desItem.type) {

    /******************************basic*********************************/

    case 'circle': {
      return new Circle(desItem);
    }

    case 'ellipse': {
      return new Ellipse(desItem);
    }

    case 'group': {
      return new Group(desItem);
    }

    case 'polygon': {
      return new Polygon(desItem);
    }

    case 'polyline': {
      return new Polyline(desItem);
    }

    case 'rect': {
      return new Rect(desItem);
    }

    case 'text': {
      return new Text(desItem);
    }

    case 'path': {
      return new Path(desItem);
    }

    /******************************sch*********************************/

    case 'sch_line': {
      return new Sch_Line(desItem);
    }

    case 'sch_rect': {
      return new Sch_Rect(desItem);
    }

    case 'sch_polygon': {
      return new Sch_Polygon(desItem);
    }

    case 'sch_elliptic': {
      return new Sch_Elliptic(desItem);
    }

    case 'sch_ellipse': {
      return new Sch_Ellipse(desItem);
    }

    case 'sch_text': {
      return new Sch_Text(desItem);
    }

    case 'sch_pin': {
      return new Sch_Pin(desItem);
    }

    case 'sch_bessel': {
      return new Sch_Bessel(desItem);
    }

    case 'sch_bank': {
      return new Sch_Bank(desItem);
    }

    /******************************pcb*********************************/

    }

  }
}
