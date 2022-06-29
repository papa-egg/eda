import Paint from '../etc/paint';
import { getAngle, getJoinPoint, getStraightDistance } from '@/engine/common/plugin';
import GetAvoidPath from '@/engine/common/get-avoid-path';

export default class PcbWire extends Paint {
  constructor () {
    super();

    this.minLength = 2;
    this.maxLength = Infinity;
    this.shortElem = null;
    this.finalElem = null;

    this.hitHostory = [];
    this.direct = 1;
    this.worker = null;
    this.sign = '';
    this.cachePath = [];
  }

  toPt (list) {
    const rel = [];

    for (let pt of list) {
      rel.push({
        X: pt[0],
        Y: pt[1],
      })
    }

    return rel;
  }

  renderPath (paths, color) {
    const g22 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    g22.setAttribute('stroke-width', '1');
    g22.setAttribute('class', 'jyyyyyyy');
    g22.setAttribute('stroke', color ? color : fn1());
    g22.setAttribute('fill', color ? color : fn1());
    g22.setAttribute('fill-opacity', '1');
    g22.setAttribute('d', this.polys2path2(paths));

    document.querySelector('#jkk').appendChild(g22)

    function fn1(){
      return '#' + Math.floor( Math.random() * 0xffffff ).toString(16);
    }
  }

  polys2path2 (poly, scale = 1) {
    let path = "", i, j;
    if (!scale) scale = 1;
    for (i = 0; i < poly.length; i++) {
      for (j = 0; j < poly[i].length; j++) {
        if (!j) path += "M ";
        else path += " L ";
        path += (poly[i][j].X / scale) + " " + (-poly[i][j].Y / scale);
      }
      path += " Z";
    }
    return path;
  }

  getForbidPaths () {
    const editor = window.$vue.$store.getters.getCH;
    const list = editor.outline.proList;
    const rel = [];

    for (let item of list) {
      if (item.prop.mType === 'pcb_wire') {
        for (let path of item.pathArr) {
          const nPath = this.toPt(path);

          rel.push(zoomPath([nPath], 10));
        }
      }
    }

    return getMergePathsList(rel);

    function getMergePathsList (pathsList) {
      const ClipperLib = window.ClipperLib;
      const cpr = new ClipperLib.Clipper();

      for (let paths of pathsList) {
        cpr.AddPaths(paths, ClipperLib.PolyType.ptSubject, true);
      }

      const solution_path = new ClipperLib.Paths();
      cpr.Execute(ClipperLib.ClipType.ctUnion, solution_path, ClipperLib.PolyFillType.pftNonZero, ClipperLib.PolyFillType.pftNonZero);

      return solution_path;
    }

    return rel;

    function zoomPath (pathArr, size) {
      const ClipperLib = window.ClipperLib;
      const cpr = new ClipperLib.ClipperOffset(10);
      const relPath = new ClipperLib.Paths();

      cpr.AddPaths(pathArr, ClipperLib.JoinType.jtRound, ClipperLib.EndType.etClosedPolygon);
      cpr.Execute(relPath, size);

      return relPath;
    }
  }

  startPaint (pointArr) {
    if (pointArr.length >= 2) {
      const paths = this.getForbidPaths();
      const sPt = pointArr[pointArr.length - 2];
      const ePt = pointArr[pointArr.length - 1];

      const curSign  = '' + pointArr.length + '|' + sPt[0] + '|' + sPt[1];

      if (curSign != this.sign) {
        if (this.worker) {
          this.worker.destroyed();
        }

        this.worker = new GetAvoidPath(sPt, paths);
        this.sign = curSign;
      }

      this.worker.ept.x = ePt[0];
      this.worker.ept.y = ePt[1];

      const path = this.worker.stretchPath();

      if (path && path.length > 0) {
        const pointStrArr = [];

        for (let pItem of path) {
          pointStrArr.push(pItem.x + ' ' + pItem.y);
        }

        this.shortElem = this.device.createElem({
          type: 'pcb_wire',
          'stroke-width': 10,
          attrs: {
            points: pointStrArr.join(' '),
          },
          params: {
            position: {
              x: path[0].x,
              y: path[0].y,
            },
            layer: 'L_1',
          }
        });

        this.finalElem = this.shortElem;
      }
    }
  }

  startPaint22 (pointArr) {
    if (pointArr.length <= 2) {
      this.hitHostory[pointArr.length - 2] = {
        start: [],
        end: [],
      };
    } else {
      this.hitHostory[pointArr.length - 2] = {
        start: this.hitHostory[pointArr.length - 3].end,
        end: [],
      }
    }

    const wireArr = this.foo(pointArr);

    const lll = JSON.parse(JSON.stringify(wireArr));
    lll.pop();

    this.hitHostory[pointArr.length - 2].end = lll;

    let pointStrArr = [];

    for (let pItem of wireArr) {
      pointStrArr.push(pItem.join(' '));
    }

    this.shortElem = this.device.createElem({
      type: 'pcb_wire',
      'stroke-width': 10,
      attrs: {
        points: pointStrArr.join(' '),
      },
      params: {
        position: {
          x: wireArr[0][0],
          y: wireArr[0][1],
        },
        layer: 'L_1',
      }
    });

    this.finalElem = this.shortElem;
  }

  getPeakPt (pt, angle) {
    const radiam1 = angle;
    const radiam2 = (angle + 180);

    return [getJoinPoint(100000, radiam1, pt), getJoinPoint(100000, radiam2, pt)]
  }

  foo (pointArr) {
    const angle = 45;
    const activityArr = pointArr.slice(-2);
    const sPt = activityArr[0];
    const ePt = activityArr[1];
    const sLineArr = [];
    const eLineArr = [];
    const aimArr = [];

    sLineArr.push(this.getPeakPt(sPt, 0));
    sLineArr.push(this.getPeakPt(sPt, 90));

    eLineArr.push(this.getPeakPt(ePt, angle));
    eLineArr.push(this.getPeakPt(ePt, (180 - angle)));

    for (let sLine of sLineArr) {
      for (let eLine of eLineArr) {
        const cpt = this.segmentsIntr(sLine[0], sLine[1], eLine[0], eLine[1]);

        const obj = {
          pt: cpt,
          distance: Number(getStraightDistance(cpt, ePt)) + Number(getStraightDistance(cpt, sPt)),
        };

        aimArr.push(obj);
      }
    }

    aimArr.sort((a, b) => {
      return a.distance - b.distance;
    })

    if ((aimArr[0].distance !== aimArr[1].distance)) {
      activityArr.splice(1, 0, aimArr[0].pt);
    }

    activityArr.splice(1, 0, aimArr[0].pt);

    let hs = [];

    hs = this.hitHostory[pointArr.length - 2].start;

    return [...hs, ...activityArr];
  }

  segmentsIntr (a, b, c, d) {
    a[0] = Number(a[0]); a[1] = Number(a[1]); b[0] = Number(b[0]); b[1] = Number(b[1]);

    // 三角形abc 面积的2倍
    const area_abc = (a[0] - c[0]) * (b[1] - c[1]) - (a[1] - c[1]) * (b[0] - c[0]);

    // 三角形abd 面积的2倍
    const area_abd = (a[0] - d[0]) * (b[1] - d[1]) - (a[1] - d[1]) * (b[0] - d[0]);

    // 面积符号相同则两点在线段同侧,不相交 (对点在线段上的情况,本例当作不相交处理);
    if ( area_abc*area_abd>=0 ) {
      return false;
    }

    // 三角形cda 面积的2倍
    const area_cda = (c[0] - a[0]) * (d[1] - a[1]) - (c[1] - a[1]) * (d[0] - a[0]);
    // 三角形cdb 面积的2倍
    // 注意: 这里有一个小优化.不需要再用公式计算面积,而是通过已知的三个面积加减得出.
    const area_cdb = area_cda + area_abc - area_abd ;
    if (  area_cda * area_cdb >= 0 ) {
      return false;
    }

    //计算交点坐标
    const t = area_cda / ( area_abd- area_abc );
    const dx = t*(b[0] - a[0]), dy = t*(b[1] - a[1]);
    return [ (a[0] + dx).toFixed(0) , (a[1] + dy).toFixed(0) ];
  }

}
