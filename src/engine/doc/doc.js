import { editor } from '@/engine/common/plugin';
import DomConfig from '@/engine/common/dom-config';

export default class Doc {
  constructor () {
    this.curClickPt = [];
    this.curClickBox = {vx: 0, vy: 0};
    this.dragFlagType = 0;
    this.curDragIdList = [];
    this.aimList = [];
  }

  rectSelect (x, y) {
    if (this.dragFlagType === 3) {
      const xArr = [x, this.curClickPt[0]];
      const yArr = [y, this.curClickPt[1]];

      xArr.sort((a, b) => a - b);
      yArr.sort((a, b) => a - b);

      DomConfig.setAttrs('selectBox' + editor().idx, {
        x: xArr[0],
        y: yArr[0],
        width: xArr[1] - xArr[0],
        height: yArr[1] - yArr[0],
        'stroke-dasharray': '3,3',
        display: 'block',
      })
    }
  }

  deleteElem () {
    const sIdList = editor().outline.selectIdList;

    if (sIdList.length > 0) {
      const CH = window.$vue.$store.getters.getCH;
      const sElems = CH.sElems;

      for (let sId of sIdList) {
        const ssId = sId.id || sId;

        for (let [index, elem] of sElems.entries()) {
          if (elem.id == ssId) {
            sElems.splice(index, 1);

            break;
          }
        }
      }
    }
  }

  rotateElem (angle) {
    const sIdList = editor().outline.selectIdList;
    const idList = [];

    for (let item of sIdList) {
      idList.push(item.id);
    }
    console.log(idList);

    if (sIdList.length > 0) {
      const CH = window.$vue.$store.getters.getCH;
      const sElems = CH.sElems;

      for (let elem of sElems) {
        if (idList.indexOf(elem.id) > -1) {
          const originalAngle = elem.sign.angle || 0;

          elem.rotateElem(originalAngle + angle);
        }
      }
    }
  }

  getFixedStatus (uId) {
    const CH = window.$vue.$store.getters.getCH;
    const sElems = CH.sElems;
    let selElem = null;

    for (let elem of sElems) {
      if (elem.id === uId) {
        selElem = elem;

        break;
      }
    }

    if (!selElem) return false;

    if (selElem && selElem.sign && selElem.sign.fixed == 1) {
      return true;
    } else {
      return false;
    }
  }

  getNotFixedList (list) {
    const rel = [];

    for (let uId of list) {
      if (!this.getFixedStatus(uId)) {
        rel.push(uId);
      }
    }

    return rel;
  }

  getPositionById (id) {
    for (let item of this.aimList) {
      if (item.id === id) {
        return item.position;
      }
    }
  }

  resetAimList (curDragIdList) {
    this.aimList = [];

    for (let id of curDragIdList) {
      const elem = this.getElemById(id);

      this.aimList.push({
        id,
        position: {
          x: Number(elem.sign.px),
          y: Number(elem.sign.py),
        }
      });
    }
  }

  initDragStuff ([cx, cy], isLeft, vb) {
    if (editor().painter.motif) return;
    this.curClickPt = [cx, cy];
    const CH = window.$vue.$store.getters.getCH;

    if (isLeft) {
      const selIdList = editor().outline.getSelectIdList();

      if (selIdList.length > 0) {
        const notfixedList = this.getNotFixedList(selIdList);

        this.dragFlagType = 1;
        this.curDragIdList = notfixedList;

        this.resetAimList(this.curDragIdList);

        DomConfig.addClass(CH.proId, 'cursor-move');
      } else {
        this.dragFlagType = 3;
      }
    } else {
      this.dragFlagType = 2;

      this.curClickBox = { vx: vb.vx, vy: vb.vy };
      DomConfig.addClass(CH.proId, 'cursor-grabbing');
    }
  }

  getRecentGp (bgPt) {
    const editor = window.$vue.$store.getters.getCH;

    if (editor && editor.msg.attrs['cell-adsorb'] == 1) {
      let cellGrid = editor.msg.attrs['cell-size'];

      const rtPt = [
        Math.round(bgPt[0] / cellGrid) * cellGrid,
        Math.round(bgPt[1] / cellGrid) * cellGrid,
      ];

      return [bgPt[0] - rtPt[0], bgPt[1] - rtPt[1]];
    } else {

      return [0, 0];
    }
  }

  moveElemDist (gx, gy, curDragId, curClickPt) {
    const selectIdList = editor().outline.selectIdList;
    const aimElem = this.getElemById(curDragId);
    const getMoveDist = this.getMoveDist(gx, gy, aimElem);
    const starPosition = this.getPositionById(curDragId);

    if (!aimElem.childs && selectIdList.length === 1) {
      aimElem.dragElem(getMoveDist[0] + starPosition.x, getMoveDist[1] + starPosition.y, getMoveDist[0], getMoveDist[1]);
    } else {
      if (aimElem.childs) {
        aimElem.dragElem(getMoveDist[0] + starPosition.x, getMoveDist[1] + starPosition.y, getMoveDist[0], getMoveDist[1]);
      } else {
        aimElem.dragElem(gx + starPosition.x, gy + starPosition.y, gx, gy);
      }
    }
  }

  getMoveDist (gx, gy, elems) {
    const bgPt = this.getFocusPt(elems);
    const rtGp = this.getRecentGp(bgPt);

    return [Number(gx) - Number(rtGp[0]), Number(gy) - Number(rtGp[1])];
  }

  getFocusPt (elems) {
    return elems.getCorePoint();
    if (!elems.childs) return elems.getCorePoint();

    const focusPtArr = [];
    let startElem = null;

    eachElems(elems.childs);

    function eachElems (elemArr) {
      for (let elem of elemArr) {
        if (elem.childs && elem.childs.length > 0) {
          eachElems(elem.childs);
        } else {
          if (elem.type !== 'text') {
            focusPtArr.push(elem.getBeginPoint());
          }

          if (elem.params && elem.params.start) {
            startElem = elem;
          }
        }
      }
    }

    focusPtArr.sort((a, b) => a[0] - b[0]);
    focusPtArr.sort((a, b) => a[1] - b[1]);

    if (!startElem) {
      return focusPtArr[0];
    } else {
      return startElem.getBeginPoint();
    }
  }

  startDragStuff (apt, pt) {
    if (!this.dragFlagType) return;

    if (this.dragFlagType === 1) {
      let gx = apt[0] - this.curClickPt[0];
      let gy = apt[1] - this.curClickPt[1];

      for (let curDragId of this.curDragIdList) {

        this.moveElemDist(gx, gy, curDragId, this.curClickPt);
      }
    } else if (this.dragFlagType === 2) {
      const gx = pt[0] - this.curClickPt[0];
      const gy = pt[1] - this.curClickPt[1];

      editor().mouse.setViewBox({
        vx: this.curClickBox.vx - gx,
        vy: this.curClickBox.vy - gy,
      });
    }
  }

  selectRect () {
    const x = DomConfig.getDom('selectBox' + editor().idx).getBBox().x;
    const y = DomConfig.getDom('selectBox' + editor().idx).getBBox().y;
    const width = DomConfig.getDom('selectBox' + editor().idx).getBBox().width;
    const height = DomConfig.getDom('selectBox' + editor().idx).getBBox().height;

    const selArea = {
      minX: x,
      maxX: x + width,
      minY: y,
      maxY: y + height,
    };

    editor().outline.selectRect(selArea);
  }

  endDragStuff () {
    if (this.dragFlagType === 1) {
      for (let id of this.curDragIdList) {
        const aimElem = this.getElemById(id);

        if (aimElem) {
          aimElem.endDragElem();
        }
      }
    } else if (this.dragFlagType === 2) {
      editor().mouse.updateMsg();
    } else if (this.dragFlagType === 3) {
      this.selectRect();
      DomConfig.setAttrs('selectBox' + editor().idx, {
        display: 'none',
      })
    }

    const CH = window.$vue.$store.getters.getCH;

    this.dragFlagType = 0;
    this.curDragIdList = [];
    DomConfig.removeClass(CH.proId, 'cursor-move');
    DomConfig.removeClass(CH.proId, 'cursor-grabbing');
  }

  getElemById (aimId) {
    const CH = window.$vue.$store.getters.getCH;
    const sElems = CH ? CH.sElems : [];
    let rel = null;

    eachElems(sElems);

    function eachElems (elemArr) {
      for (let elem of elemArr) {
        if (elem.id === aimId) {
          rel = elem;

          return;
        }

        if (elem.childs && elem.childs.length > 0) {
          eachElems(elem.childs);
        }
      }
    }

    return rel;
  }

  startPathContour (cx, cy) {
    editor().painter.startChartlet(cx, cy);
  }

  endPathContour () {
    editor().painter.endChartlet();
  }

  setAuxLine (x, y) {
    DomConfig.setAttrs('ruler-topNd', { 'style': `transform: translateX(${ x }px)` });
    DomConfig.setAttrs('ruler-leftNd', { 'style': `transform: translateY(${ y }px)` });
    DomConfig.setAttrs('cross-x', { 'style': `transform: translateY(${ y }px)` });
    DomConfig.setAttrs('cross-y', { 'style': `transform: translateX(${ x }px)` });
  }

  trackMonitor (cx, cy) {
    if (this.dragFlagType === 0) {
      editor().outline.moveTrack(cx, cy);
    }
  }

  checkTrack () {
    editor().outline.clickTrack();
  }
}
