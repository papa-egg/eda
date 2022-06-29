

export default class GetAvoidPath {
  constructor (startPt, obstaclePath) {
    this.startPt = startPt;
    this.endPt = { x: NaN, y: NaN };
    this.obstaclePath = obstaclePath;
    this.paths = obstaclePath;
    this.worker = new Worker('worker.js');
    this.path = [];
    this.passList = [];
    this.pdxList = [];
    this.ept = { x: NaN, y: NaN };

    this.spreadPaths();
  }

  destroyed () {
    this.passList = null;
    this.pdxList = null;
    this.worker.terminate();
  }

  isEqual (A, B) {
    if (A.x == B.x && A.y == B.y) {
      return true;
    } else {
      return false;
    }
  }

  toCleanLine (ptArr) {
    const rel = [];
    const angleList = [];
    let curAngle = -1;

    for (let i = 1; i < ptArr.length; i++) {
      angleList.push(this.getAngleByPoint(ptArr[i - 1], ptArr[i]));
    }

    for (let [index, angle] of angleList.entries()) {
      if (angle < 0) {
        curAngle = angle;
      } else {
        if (curAngle !== angle) {
          rel.push(ptArr[index]);
          curAngle = angle;
        }
      }
    }

    rel.push(ptArr[ptArr.length - 1]);

    return rel;
  }

  stretchPath () {

    let index = this.passList.indexOf(this.ept.x + '|' + this.ept.y);

    if (index > -1) {
      const list = this.getParentList(index);

      this.beginList = this.toCleanLine(list);
      const arr = this.getLatelyPaths(this.beginList);

      return list;
    }
  }

  stretchPath2 () {
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

  foo (ptr) {
    let rel = null;
    const pArr = ptr.split('|');
    const pt = {
      x: parseFloat(pArr[0]),
      y: parseFloat(pArr[1]),
    }

    for (let item of this.passList) {
      if (this.isEqual(item, pt)) {
        rel = item;
        break;
      }
    }

    return rel;
  }

  getParentList (index) {
    const rel = [];
    const self = this;

    traverParent(index);

    function traverParent (index) {
      const ptr = self.passList[index].split('|');
      rel.push({
        x: parseFloat(ptr[0]),
        y: parseFloat(ptr[1]),
      })

      if (self.pdxList[index] !== '') {

        traverParent(parseInt(self.pdxList[index]));
      }
    }

    rel.reverse();

    return rel;
  }

  getParentList2 (pt) {
    const rel = [];
    const self = this;

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

  navigatePath (list, idx, rel) {
    const cPt = list[idx];
    const resideArr = list.slice(idx + 1);
    let bufferLine = null;

    // if (resideArr.length <= 2) return;

    rel.push(cPt);

    for (let [index, pt] of resideArr.entries()) {
      const cLine = this.getRecentLine(cPt, pt);
      cLine.index = index;

      /*if (cLine.crash) {
        break;
      } else {
        bufferLine = cLine;
      }*/

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
    const ClipperLib = window.ClipperLib;
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

  setEndPt (pt) {
    this.endPt = pt;
    // this.worker.postMessage({ method: 'end', endPt: pt });
  }

  getParent (ptr) {
    let rel = null;
    const pArr = ptr.split('|');
    const pt = {
      x: parseFloat(pArr[0]),
      y: parseFloat(pArr[1]),
    }

    for (let item of this.passList) {
      if (this.isEqual(item, pt)) {
        rel = item;
        break;
      }
    }

    return rel;
  }

  toPass (list) {
    const rel = [];

    for (let pt of list) {
      const obj = {
        x: pt.x,
        y: pt.y,
      };

      if (pt.parent) {
        obj.parent = this.getParent(pt.parent);
      }

      rel.push(obj);
    }

    return rel;
  }

  spreadPaths () {
    this.worker.postMessage({ method: 'start', startPt: this.startPt, obstaclePath: this.obstaclePath });

    this.worker.onmessage = (event) => {
      const { list, plan } = JSON.parse(event.data);

      this.passList.push(...list);
      this.pdxList.push(...plan);
    }
  }
}
