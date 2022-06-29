import Line from './sketch/line';
import Polyline from './sketch/polyline';
import Rect from './sketch/rect';
import Ellipse from './sketch/ellipse';
import Circle from './sketch/circle';
import Polygon from './sketch/polygon';
import Text from './sketch/text';
import Group from './sketch/group';
import Path from './sketch/path';

export default class Outline {
  constructor () {
    this.proList = [];
    this.uId = '';
    this.hoverIdList = [];
    this.selectIdList = [];
  }

  drawElem () {
    const CH = window.$vue.$store.getters.getCH;
    const sElems = CH ? CH.sElems : [];
    const pList = [];

    for (let elem of sElems) {
      if (elem.sign.msg && elem.sign.curdle) {
        continue;
      }

      // pList.push(this.addElem(elem));

      let mFlag = false;

      for (let profile of this.proList) {
        if (profile.id === elem.id) {
          if (elem.type == 'g' && this.foo(elem, profile)) {

            // console.log('444444444444444444444')

          } else {
            pList.push(profile);
            mFlag = true;

            break;
          }
        }
      }

      if (!mFlag) {
        pList.push(this.addElem(elem));
      } /*else if (elem.type == 'g') {
        pList.push(this.addElem(elem));
      }*/
    }

    this.proList = pList;
  }

  foo2 (elem, obj) {
    for (let child of elem.childs) {
      if (child.type == 'g') {
        this.foo2(child, obj);
      } else {
        obj[child.id] = child.type;
      }
    }
  }

  foo (elem, profile) {
    const p1 = {};
    const p2 = {};

    this.foo2(elem, p1);
    this.foo2(profile, p2);

    let flag = false;

    for (let item in p1) {
      if (p1[item] !== p2[item]) {
        flag = true;

        break;
      }
    }

    return flag;
  }

  updateElem (elem) {
    let _idx = -1;

    for (let [index, profile] of this.proList.entries()) {
      if (profile.id === elem.id) {

        _idx = index;

        break;
      }
    }

    if (_idx > -1) {
      this.proList[_idx] = this.addElem(elem);
    } else {
      this.proList.push(this.addElem(elem));
    }
  }

  addElem (elem, parent) {
    let profile = null;

    switch (elem.type) {

    case 'polyline': {
      profile = new Polyline(elem.attrs, elem.params, parent);

      break;
    }

    case 'line': {
      profile = new Line(elem.attrs, elem.params, parent);

      break;
    }

    case 'rect': {
      profile = new Rect(elem.attrs, elem.params, parent);

      break;
    }

    case 'ellipse': {
      profile = new Ellipse(elem.attrs, elem.params, parent);

      break;
    }

    case 'circle': {
      profile = new Circle(elem.attrs, elem.params, parent);

      break;
    }

    case 'polygon': {
      profile = new Polygon(elem.attrs, elem.params, parent);

      break;
    }

    case 'text': {
      profile = new Text(elem.attrs, elem.params, parent);

      break;
    }

    case 'path': {
      profile = new Path(elem.attrs, elem.params, parent);

      break;
    }

    case 'g': {
      profile = new Group(elem.attrs, elem.params, parent);
      profile.childs = [];

      for (let childElem of elem.childs) {
        profile.childs.push(this.addElem(childElem, profile));
      }

      break;
    }

    }

    return profile;
  }

  getCurOutline (id) {
    for (let profile of this.proList) {
      if (profile.id === id) {
        return profile;
      }
    }
  }

  selectRect (area) {
    const selArr = [];

    for (let { box, id } of this.proList) {
      if (area.minX < box.minX && area.maxX > box.maxX && area.minY < box.minY && area.maxY > box.maxY) {
        selArr.push(id);
      }
    }

    this.selectIdList = selArr;

    const CH = window.$vue.$store.getters.getCH;
    const sElems = CH ? CH.sElems : [];

    for (let elem of sElems) {
      if (selArr.indexOf(elem.id) > -1) {
        elem.addSelect();
      } else {
        elem.removeSelect();
      }
    }
  }

  moveTrack (cx, cy) {
    const self = this;
    let uId = '';
    let idList = [];

    gethoverIdList(this.proList, idList);

    outer:
    for (let { oBox, pathArr, id } of this.proList) {
      if (cx >= oBox.minX && cx <= oBox.maxX && cy >= oBox.minY && cy <= oBox.maxY) {

        for (let poly of pathArr) {
          const inside = this.isInside({ x: cx, y: cy }, poly);

          if (inside) {
            uId = id;

            break outer;
          }
        }
      }
    }

    if (uId !== this.uId) {
      this.uId = uId;
    }

    this.hoverIdList = idList;

    if (this.hoverIdList.length > 0) {
      this.addHover(idList[this.hoverIdList.length - 1].id);
    } else {
      this.addHover();
    }

    function gethoverIdList (prolist, idList) {
      let hoverFlag = false;
      let hoverId = [];

      for (let profile of prolist) {
        if (cx >= profile.oBox.minX && cx <= profile.oBox.maxX && cy >= profile.oBox.minY && cy <= profile.oBox.maxY) {
          if (profile.type !== 'g') {
            for (let poly of profile.pathArr) {
              const inside = self.isInside({ x: cx, y: cy }, poly);

              if (inside) {
                hoverFlag = true;
                if (profile.type === 'text') {

                  hoverId.push({
                    id: profile.id,
                    moved: profile.prop ? (profile.prop.moved ? true : false) : false,
                  })
                } else {
                  hoverId.unshift({
                    id: profile.id,
                    moved: profile.prop ? (profile.prop.moved ? true : false) : false,
                  });
                }
              }
            }
          } else {
            const isHovered = gethoverIdList(profile.childs, idList);

            if (isHovered) idList.push({
              id: profile.id,
              moved: true,
            });
          }
        }
      }

      if (hoverId.length > 0) {

        idList.push(hoverId[0]);
      }

      return hoverFlag;
    }
  }

  getSelectIdList () {
    const moveId = this.getMoveId();

    if (this.selectIdList.indexOf(moveId) > -1) {
      return this.selectIdList;
    }

    return moveId ? [moveId] : [];
  }

  getMoveId () {
    if (this.hoverIdList.length <= 0) return '';
    if (this.hoverIdList.length === 1) return this.hoverIdList[0].id;

    if (this.hoverIdList.length >= 2) {

      for (let hoverMsg of this.hoverIdList) {

        if (hoverMsg.moved) {
          return hoverMsg.id;
        }
      }

      return this.hoverIdList[this.hoverIdList.length - 1].id;
    }
  }

  clickTrack () {
    let selId = '';

    if (this.hoverIdList.length > 0) {
      selId = this.hoverIdList[this.hoverIdList.length - 1].id;
    }

    if (this.selectIdList.indexOf(selId) > -1) {

      this.addSelect(this.selectIdList);
    } else {
      this.selectIdList = this.hoverIdList;

      this.addSelect([selId]);
      this.setNatureMsg(selId);
    }
  }

  setNatureMsg (selId) {
    const CH = window.$vue.$store.getters.getCH;

    if (!CH) return;

    if (!selId) {
      return window.$vue.$store.dispatch('setNatureList', CH.msg.nature);
    }

    const sElems = CH.sElems || [];
    let selElem = null;
    let natureList = null;

    for (let elem of sElems) {
      if (elem.id === selId) {
        selElem = elem;

        break;
      }
    }

    if (selElem && selElem.nature) {
      natureList = selElem.nature;
    } else {
      natureList = CH.msg.nature;
    }

    window.$vue.$store.dispatch('setNatureList', natureList);
  }

  addHover (id) {
    const CH = window.$vue.$store.getters.getCH;
    const sElems = CH ? CH.sElems : [];

    for (let elem of sElems) {
      if (elem.id === id) {
        elem.addHover();
      } else {
        elem.removeHover();
      }
    }
  }

  addSelect (uIdList) {
    const CH = window.$vue.$store.getters.getCH;
    const sElems = CH ? CH.sElems : [];

    for (let elem of sElems) {
      if (uIdList.indexOf(elem.id) > -1) {
        elem.addSelect();
      } else {
        elem.removeSelect();
      }
    }
  }

  isInside (point, vs) {
    const x = point.x, y = point.y;

    let inside = false;
    for (let i = 0, j = vs.length - 1; i < vs.length; j = i++) {
      const xi = vs[i][0], yi = vs[i][1];
      const xj = vs[j][0], yj = vs[j][1];

      const intersect = ((yi > y) !== (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
      if (intersect) inside = !inside;
    }

    return inside;
  }
}
