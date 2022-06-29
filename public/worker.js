importScripts('clipper_unminified.js');

/*const ClipperLib = ClipperLib;*/
let AD = null;
let oop = this;


class GetAvoidPath {
  constructor (paths, pt, ClipperLib) {

    this.gap = 5;
    this.paths = paths;

    this.ClipperLib = ClipperLib;
    this.passList = [];
    this.pdxList = [];
    this.openList = [];
    this.closeList = [];
    this.beginList = [];
    this.rel = [];

    this.map = new Map();

    this.spt = { x: NaN, y: NaN };
    this.ept = { x: NaN, y: NaN };

    this.spt.x = pt.x;
    this.spt.y = pt.y;

    this.spt.G = 0;
    this.spt.index = 0;
    this.openList.push(this.spt);
    this.spreadPath();
    this.sendLen = 0;
    this.foo();
  }

  foo2 () {
    const obj = {
      list: this.passList.slice(this.sendLen),
      plan: this.pdxList.slice(this.sendLen),
    };

    this.sendLen = this.passList.length;

    return obj;
  }

  foo () {
    const timer = setInterval(() => {
      if (this.passList.length >= 2000000) {
        clearInterval(timer);
      }

      const ps = this.foo2();
      oop.postMessage(JSON.stringify(ps));
    }, 1000);
  }

  getPath (ept) {
    if (this.passList.length > 0) {
      this.ept = ept;

      const rel = this.stretchPath();
      this.rel = rel;

      oop.postMessage(JSON.stringify(this.rel));
    }
  }

  stretchPath () {
    let pt = null;

    for (let item of this.passList) {
      if (this.isEqual(item, this.ept)) {
        pt = item;

        break;
      }
    }

    if (pt) {
      const list = this.getParentList(pt);
      this.beginList = list;

      const arr = this.getLatelyPaths(this.beginList);

      return arr;
    }
  }

  getLatelyPaths (list) {
    const rel = [];

    list.reverse();

    this.navigatePath(list, 0, rel);

    rel.reverse();

    return rel;
  }

  navigatePath (list, idx, rel) {
    const cPt = list[idx];
    const resideArr = list.slice(idx + 1);
    let bufferLine = null;

    rel.push(cPt);

    for (let [index, pt] of resideArr.entries()) {
      const cLine = this.getRecentLine(cPt, pt);
      cLine.index = index;

      if (!cLine.crash) {
        bufferLine = cLine;
      }
    }

    if (bufferLine) {
      rel.push(...bufferLine.keyPtArr);

      const lastPt = rel[rel.length - 1];

      if (!this.isEqual(lastPt, this.ept)) {
        this.navigatePath(list, idx + bufferLine.index + 1, rel);
      }
    }
  }

  getRecentLine (st, et) {
    const rx = Math.abs(et.x - st.x);
    const ry = Math.abs(et.y - st.y);
    const lpt = { x: null, y: null };
    const angle = this.getAngleByPoint(st, et);
    const rel = {
      keyPtArr: [],
      keyPathArr: [],
      crash: false,
    };

    if (angle > 0 && angle < 45) {
      lpt.x = st.x + ry;
      lpt.y = st.y + ry;
    } else if (angle > 45 && angle < 90) {
      lpt.x = st.x + rx;
      lpt.y = st.y + rx;
    } else if (angle > 90 && angle < 135) {
      lpt.x = st.x - rx;
      lpt.y = st.y + rx;
    } else if (angle > 135 && angle < 180) {
      lpt.x = st.x - ry;
      lpt.y = st.y + ry;
    } else if (angle > 180 && angle < 225) {
      lpt.x = st.x - ry;
      lpt.y = st.y - ry;
    } else if (angle > 225 && angle < 270) {
      lpt.x = st.x - rx;
      lpt.y = st.y - rx;
    } else if (angle > 270 && angle < 315) {
      lpt.x = st.x + rx;
      lpt.y = st.y - rx;
    } else if (angle > 315 && angle < 360) {
      lpt.x = st.x + ry;
      lpt.y = st.y - ry;
    }

    /*if (angle > 0 && angle < 45) {
      lpt.x = et.x - ry;
      lpt.y = st.y;
    } else if (angle > 45 && angle < 90) {
      lpt.x = st.x;
      lpt.y = et.y - rx;
    } else if (angle > 90 && angle < 135) {
      lpt.x = st.x;
      lpt.y = et.y - rx;
    } else if (angle > 135 && angle < 180) {
      lpt.x = et.x + ry;
      lpt.y = st.y;
    } else if (angle > 180 && angle < 225) {
      lpt.x = et.x + ry;
      lpt.y = st.y;
    } else if (angle > 225 && angle < 270) {
      lpt.x = st.x;
      lpt.y = et.y + rx;
    } else if (angle > 270 && angle < 315) {
      lpt.x = st.x;
      lpt.y = et.y + rx;
    } else if (angle > 315 && angle < 360) {
      lpt.x = et.x - ry;
      lpt.y = st.y;
    }*/

    if (!lpt.x) {
      const sLine = this.getStraightLine(st, et);
      rel.keyPtArr.push(et);
      rel.keyPathArr = sLine.line;
      rel.crash = sLine.crash;
    } else {
      const sLine = this.getStraightLine(st, lpt);

      if (sLine.line.length > 0) {
        const _cpt = sLine.line.pop();
        const oLine = this.getStraightLine(_cpt, et);

        if (oLine.line.length > 0) {
          rel.keyPtArr.push(lpt, et);
          rel.keyPathArr.push(...sLine.line, ...oLine.line);

          if (sLine.crash || oLine.crash) {
            rel.crash = true;
          }
        }
      }
    }

    return rel;
  }

  getStraightLine (startPt, endPt) {
    const rx = (endPt.x - startPt.x) || 0;
    const ry = (endPt.y - startPt.y) || 0;
    const len = Math.max(Math.abs(rx), Math.abs(ry));
    const rel = {
      line: [],
      crash: false,
    };

    startPt.G = startPt.G || 0;

    for (let i = 0; i <= len; i++) {
      let G = 10;

      if (rx > 0 && ry > 0) {
        G = 14;
      }

      let ax = 0;
      let ay = 0;

      if (rx > 0) {
        ax = 1;
      } else if (rx < 0) {
        ax = -1;
      }

      if (ry > 0) {
        ay = 1;
      } else if (ry < 0) {
        ay = -1;
      }

      const _pt = {
        x: startPt.x + i * ax,
        y: startPt.y + i * ay,
        G: startPt.G + i * G,
      };

      rel.line.push(_pt);

      if (this.isInForbid(_pt)) {
        rel.crash = true;
      }
    }

    return rel;
  }

  isInForbid (pt) {
    const ClipperLib = this.ClipperLib;
    let flag = false;
    const npt = {
      X: pt.x,
      Y: pt.y,
    };

    for (let item of this.paths) {

      if (ClipperLib.Clipper.PointInPolygon(npt, item) === 1) {
        flag = true;
        break;
      }
    }

    return flag;
  }

  getAngleByPoint(start, end) {
    const x = Math.abs(end.x - start.x);
    const y = Math.abs(end.y - start.y);
    const z = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));

    if(x == 0 && y == 0){ return 0; }

    const cos = y/z;
    const radina = Math.acos(cos);
    let angle = Math.floor(180/(Math.PI/radina));

    if(start.x <= end.x && start.y > end.y){
      angle = Math.abs(90 - angle);
    }

    if(start.x > end.x && start.y >= end.y){
      angle += 90;
    }

    if(start.x >= end.x && start.y < end.y){
      angle = 270 - angle;
    }

    if(start.x < end.x && start.y <= end.y){
      angle += 270;
    }

    angle = 360 - angle;

    return angle == 360 ? 0 : angle;
  }

  getParentList (pt) {
    const rel = [];

    traverParent(pt);

    function traverParent (pt) {
      rel.push({
        x: pt.x,
        y: pt.y,
      });

      if (pt.parent) {
        traverParent(pt.parent);
      }
    }

    rel.reverse();

    return rel;
  }

  spreadPath () {
    if (this.openList.length <= 0 || this.passList.length > 2000000) {
      return;
    } else {
      const newList = [];

      for (let pt of this.openList) {
        const roundList = this.getRoundList(pt);

        for (let item1 of roundList) {
          let idx = -1;

          for (let [index, item2] of newList.entries()) {
            if (this.isEqual(item1, item2)) {
              idx = index;
            }
          }

          if (idx > -1) {
            if (newList[idx].G > item1.G) {
              newList[idx].G = item1.G;
            }
          } else {
            newList.push(item1);
          }
        }
      }

      this.closeList = this.openList;

      const obj = {
        list: [],
        plan: [],
      };

      for (let pt of this.openList) {
        obj.list.push(pt.x + '|' + pt.y);
      }

      this.passList.push(...obj.list);

      for (let pt of this.openList) {
        if (pt.parent) {
          const index = this.passList.indexOf(pt.parent.x + '|' + pt.parent.y);

          if (index > -1) {
            obj.plan.push(index);
          }
        } else {
          obj.plan.push('');
        }
      }

      this.pdxList.push(...obj.plan);

      this.openList = newList;

      setTimeout(() => {
        this.spreadPath();
      }, 0)
    }
  }

  toList (list) {
    const obj = {
      list: [],
      plan: [],
    };

    for (let pt of list) {
      obj.list.push(pt.x + '|' + pt.y);

      if (pt.parent) {
        const index = this.passList.indexOf(pt.parent.x + '|' + pt.parent.y);

        if (index > -1) {
          obj.plan.push(index);
        }
      } else {
        obj.plan.push('');
      }
    }

    return obj;
  }

  getRoundList (pt) {
    const rel = [];
    const nearList = [
      { x: pt.x - (1 * this.gap), y: pt.y - 1 * this.gap },
      { x: pt.x, y: pt.y - 1 * this.gap },
      { x: pt.x + 1 * this.gap, y: pt.y - 1 * this.gap } ,
      { x: pt.x - 1 * this.gap, y: pt.y },
      { x: pt.x + 1 * this.gap, y: pt.y },
      { x: pt.x - 1 * this.gap, y: pt.y + 1 * this.gap },
      { x: pt.x, y: pt.y + 1 * this.gap },
      { x: pt.x + 1 * this.gap, y: pt.y + 1 * this.gap } ,
    ];

    for (let cpt of nearList) {
      if (true) {
        let flag = true;

        if (flag) {
          for (let item of this.closeList) {
            if (this.isEqual(item, cpt)) {
              flag = false;

              break;
            }
          }
        }

        if (flag) {
          if (this.isInForbid(cpt)) {
            flag = false;
          }
        }

        if (flag) {
          for (let item of this.openList) {
            if (this.isEqual(item, cpt)) {
              flag = false;

              break;
            }
          }
        }

        if (flag) {
          const apt = cpt;
          apt.parent = this.getParent(apt);
          const mg = this.setFGH(apt.parent, apt);

          apt.G = mg.G;

          rel.push(apt);
        }
      }
    }

    return rel;
  }

  getParent (pt) {
    const rel = [];
    const nearList = [
      { x: pt.x - (1 * this.gap), y: pt.y - 1 * this.gap },
      { x: pt.x, y: pt.y - 1 * this.gap },
      { x: pt.x + 1 * this.gap, y: pt.y - 1 * this.gap } ,
      { x: pt.x - 1 * this.gap, y: pt.y },
      { x: pt.x + 1 * this.gap, y: pt.y },
      { x: pt.x - 1 * this.gap, y: pt.y + 1 * this.gap },
      { x: pt.x, y: pt.y + 1 * this.gap },
      { x: pt.x + 1 * this.gap, y: pt.y + 1 * this.gap } ,
    ];


    for (let item of this.openList) {
      for (let item2 of nearList) {
        if (this.isEqual(item, item2)) {
          rel.push(item);
        }
      }
    }

    rel.sort((a, b) => a.G - b.G);

    return rel[0];
  }

  setFGH (spt, apt) {
    const xb = Math.abs(apt.x - spt.x);
    const yb = Math.abs(apt.y - spt.y);

    let G = spt.G || 0;

    if (xb + yb == this.gap * 2) {
      G += 14;
    } else {
      G += 10;
    }

    return {
      G,
    }
  }

  isEqual (A, B) {
    if (A.x === B.x && A.y === B.y) {
      return true;
    } else {
      return false;
    }
  }

  render (item, color = 'red', opacity = 1) {
    // if (this.isEqual(item, this.spt) || this.isEqual(item, this.ept)) return;

    const g = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    g.setAttribute('x', item.x);
    g.setAttribute('y', -item.y);
    g.setAttribute('width', this.gap);
    g.setAttribute('height', this.gap);
    g.setAttribute('fill', color);
    g.setAttribute('stroke', '#999');
    g.setAttribute('opacity', opacity);

    document.querySelector('.svg-stage').appendChild(g);
  }

  renderPolyLine (lists, color = 'green', opacity = 1) {
    // if (this.isEqual(item, this.spt) || this.isEqual(item, this.ept)) return;
    let ptstr = ' ';
    for (let item of lists) {
      ptstr += `${ item.x } -${ item.y } `;
    }

    const g = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
    g.setAttribute('class', 'oop');
    g.setAttribute('points', ptstr);
    g.setAttribute('fill', 'none');
    g.setAttribute('stroke-width', '10');
    g.setAttribute('stroke', color);
    g.setAttribute('opacity', opacity);

    document.querySelector('.jyy').appendChild(g);
  }
}

this.addEventListener('message', function (e) {
  const data = e.data;

  if (data.method === 'start') {
    const spt = data.startPt;
    const obstaclePath = data.obstaclePath;

    AD = new GetAvoidPath(obstaclePath, { x: spt[0], y: spt[1] }, ClipperLib);
  }
}, false);



