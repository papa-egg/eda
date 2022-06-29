/**
 * 获取svg元素所在外界边框
 * @param { SvgElem | DOM } svgElem
 * @returns { Array }
 */
export const getSvgPath = (() => {
  document.body.insertAdjacentHTML('beforeend', `<svg style="position:absolute;visibility:hidden;display: none"><path id="pathForAreaPath" d=""/></svg>`);

  const elePath =  document.getElementById('pathForAreaPath');
  const ClipperLib = window.ClipperLib;
  let scale = 1000;

  // svg元素转路径
  function convertPathData(node) {
    if (!node.tagName) return;
    const tagName = String(node.tagName).toLowerCase();
    const regNumber = /[-+]?(?:\d*\.\d+|\d+\.?)(?:[eE][-+]?\d+)?/g;
    let path = '';

    switch (tagName) {
    case 'path': {
      path = node.getAttribute('d');

      break;
    }

    case 'text': {
      const box = node.getBBox();
      path = `M ${ box.x } ${ box.y }h${ box.width }v${ box.height }h-${ box.width } z`;

      break;
    }

    case 'rect': {
      const x = Number(node.getAttribute('x'));
      const y = Number(node.getAttribute('y'));
      const width = Number(node.getAttribute('width'));
      const height = Number(node.getAttribute('height'));

      let rx = Number(node.getAttribute('rx')) || Number(node.getAttribute('ry')) || 0;
      let ry = Number(node.getAttribute('ry')) || Number(node.getAttribute('rx')) || 0;

      rx = rx > width / 2 ? width / 2 : rx;
      ry = ry > height / 2 ? height / 2 : ry;


      if (rx === 0 || ry === 0) {

        path = 'M' + x + ' ' + y + 'h' + width + 'v' + height + 'h' + -width + 'z';
      } else {
        path = 'M' + x + ' ' + (y + ry) + 'a' + rx + ' ' + ry + ' 0 0 1 ' + rx + ' ' + -ry + 'h' + (width - rx - rx) + 'a' + rx +
          ' ' + ry + ' 0 0 1 ' + rx + ' ' + ry + 'v' + (height - ry - ry) + 'a' + rx + ' ' + ry + ' 0 0 1 ' + -rx + ' ' + ry + 'h' + (rx + rx - width) +
          'a' + rx + ' ' + ry + ' 0 0 1 ' + -rx + ' ' + -ry + 'z';
      }

      break;
    }

    case 'circle': {
      const cx = node.getAttribute('cx');
      const cy = node.getAttribute('cy');
      const r = node.getAttribute('r');

      path = 'M' + (cx - r) + ' ' + cy + 'a' + r + ' ' + r + ' 0 1 0 ' + 2 * r + ' 0' + 'a' + r + ' ' + r + ' 0 1 0 ' + -2 * r + ' 0' + 'z';

      break;
    }

    case 'ellipse': {
      const cx = node.getAttribute('cx') * 1;
      const cy = node.getAttribute('cy') * 1;
      const rx = node.getAttribute('rx') * 1;
      const ry = node.getAttribute('ry') * 1;

      if (isNaN(cx - cy + rx - ry)) return;
      path = 'M' + (cx - rx) + ' ' + cy + 'a' + rx + ' ' + ry + ' 0 1 0 ' + 2 * rx + ' 0' + 'a' + rx + ' ' + ry + ' 0 1 0 ' + -2 * rx + ' 0' + 'z';

      break;
    }

    case 'line': {
      const x1 = node.getAttribute('x1');
      const y1 = node.getAttribute('y1');
      const x2 = node.getAttribute('x2');
      const y2 = node.getAttribute('y2');
      if (isNaN(x1 - y1 + (x2 - y2))) return;

      path = 'M' + x1 + ' ' + y1 + 'L' + x2 + ' ' + y2;

      break;
    }

    case 'polygon':
    case 'polyline': {
      const points = (node.getAttribute('points').match(regNumber) || []).map(Number);

      if (points.length < 4) {
        points.push(points[0]);
        points.push(points[1]);
      }

      path = 'M' + points.slice(0, 2).join(' ') + 'L' + points.slice(2).join(' ') + (tagName === 'polygon' ? 'z' : '');

      break;
    }
    }

    return path;
  }

  // 路径转多边形
  function pathToPolygon(path) {
    elePath.setAttribute('d', path);
    const len = elePath.getTotalLength();
    const points = [];

    const num = Math.abs(len  * 5 >= 500 ? len * 5 : 500);

    for (let i = 0; i < num; i++) {
      const pt = elePath.getPointAtLength(i * len / (num - 1));

      points.push({
        X: pt.x,
        Y: pt.y
      });
    }

    return points;
  }

  // 压缩精简离散点
  function getTidyPoly(polyArr) {
    const ClipperLib = window.ClipperLib;
    let clipPolygons = scaleup(polyArr, scale);
    let polygons = ClipperLib.JS.Lighten(clipPolygons, 20);

    if (clipPolygons.length > 0 && polygons.length == 0) {
      polygons = [[]];
      polygons[0].push(clipPolygons[0][0]);
      polygons[0].push(clipPolygons[0][clipPolygons[0].length - 1]);
      clipPolygons = null;
    }

    const rel = [];

    for (let [index, polys] of polygons.entries()) {
      rel[index] = [];

      for (let poly of polys) {
        rel[index].push({
          X: poly.X / scale,
          Y: poly.Y / scale,
        });
      }

      if (Math.abs(Math.round(polyArr[0][0].X / scale) - Math.round(polyArr[0][polyArr[0].length - 1].X / scale)) <= 1 && Math.abs(Math.round(polyArr[0][0].Y / scale) - Math.round(polyArr[0][polyArr[0].length - 1].Y / scale)) <= 1) {
        rel[index].push({
          X: polys[0].X / scale,
          Y: polys[0].Y / scale,
        });
      }
    }

    return rel;

    function scaleup(poly, scale) {
      let i, j;
      if (!scale) scale = 1;
      for (i = 0; i < poly.length; i++) {
        for (j = 0; j < poly[i].length; j++) {
          poly[i][j].X = Math.round(poly[i][j].X *scale);
          poly[i][j].Y = Math.round(poly[i][j].Y *scale);
        }
      }

      return poly;
    }
  }

  // 放大坐标点
  function ZoomInScale(path, scale) {
    const rel = [];

    for (let pItem of path) {
      rel.push({
        X: Math.round(pItem.X * scale),
        Y: Math.round(pItem.Y * scale),
      })
    }

    return rel;
  }

  // 缩小坐标点
  function ZoomOutScale(path, scale) {
    const rel = [];

    for (let pItem of path) {
      rel.push({
        X: pItem.X / scale,
        Y: pItem.Y / scale,
      })
    }

    return rel;
  }

  // 通过点和点，计算该条直线所对应坐标系的角度值
  const getAngle = (start, end) => {
    const diff_x = end[0] - start[0];
    const diff_y = end[1] - start[1];

    return Math.atan2(diff_y, diff_x) * 180 / Math.PI;
  };

  // 求出绕原点旋转n度所得点坐标
  const getJoinPoint = (r = 5, angle, pt) => {
    const majorR = r;
    const minorR = r;
    const centrifugal = Math.atan2(majorR*Math.sin(angle * Math.PI / 180), minorR*Math.cos(angle * Math.PI / 180));

    return [Number(majorR*Math.cos(centrifugal)) + Number(pt[0]), Number(minorR*Math.sin(centrifugal)) + Number(pt[1])];
  };

  // 创建临时多边形svg元素
  function createSvgPolygon(points) {
    const polygonElem = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
    polygonElem.setAttribute('stroke-width', 0);
    polygonElem.setAttribute('fill', 'transparent');
    polygonElem.setAttribute('points', points);

    return polygonElem;
  }

  // 创建临时圆形svg元素
  function createSvgCircle(cx, cy, r) {
    const circleElem = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circleElem.setAttribute('stroke-width', 0);
    circleElem.setAttribute('fill', 'transparent');
    circleElem.setAttribute('cx', cx);
    circleElem.setAttribute('cy', cy);
    circleElem.setAttribute('r', r);

    return circleElem;
  }

  // 合并图形
  function mergePaths (paths, isFill) {
    const cpr = new ClipperLib.Clipper();
    const scalePaths = [];

    for (let [index, path] of paths.entries()) {
      scalePaths[index] = ZoomInScale(path, scale);
    }

    cpr.AddPaths(scalePaths, ClipperLib.PolyType.ptSubject, true);

    const mergePaths = new ClipperLib.Paths();

    if (isFill) {
      cpr.Execute(ClipperLib.ClipType.ctUnion, mergePaths, ClipperLib.PolyFillType.pftPositive, ClipperLib.PolyFillType.pftPositive);
    } else {
      cpr.Execute(ClipperLib.ClipType.ctUnion, mergePaths, ClipperLib.PolyFillType.pftNonZero, ClipperLib.PolyFillType.pftNonZero);
    }

    return mergePaths;
  }

  return (svgElem, sl) => {
    const path = convertPathData(svgElem);
    const poly = pathToPolygon(path);
    const tPoly = getTidyPoly([poly]);
    let relPaths = [];

    if (sl && Number(sl)) { scale = sl; }

    if (svgElem.getAttribute('fill') !== 'none' && Number(svgElem.getAttribute('stroke-width')) === 0) return tPoly;

    if (Number(svgElem.getAttribute('stroke-width')) > 0) {
      const fragPaths = [];
      const lineArr = [];

      for (let pArr of tPoly) {
        for (let [index] of pArr.entries()) {
          if (pArr[index + 1]) {
            lineArr.push([
              [Number(pArr[index].X), Number(pArr[index].Y)],
              [Number(pArr[index + 1].X), Number(pArr[index + 1].Y)],
            ]);
          }
        }
      }

      for (let pItem of lineArr) {
        const wiseAngle = (getAngle(pItem[0], pItem[1]) + 90);
        const anticAngle = (getAngle(pItem[0], pItem[1]) - 90);
        const sw = svgElem.getAttribute('stroke-width');

        const first = getJoinPoint(sw / 2, wiseAngle, pItem[0]);
        const second = getJoinPoint(sw / 2, wiseAngle, pItem[1]);
        const third = getJoinPoint(sw / 2, anticAngle, pItem[1]);
        const four = getJoinPoint(sw / 2, anticAngle, pItem[0]);
        const points = `${ first[0] } ${ first[1] } ${ second[0] } ${ second[1] } ${ third[0] } ${ third[1] } ${ four[0] } ${ four[1] }`;
        const polygonElem = createSvgPolygon(points);

        fragPaths.push(getSvgPath(polygonElem)[0]);
      }

      for (let pArr of tPoly) {
        for (let pt of pArr) {
          const sw = svgElem.getAttribute('stroke-width');
          const circleElem = createSvgCircle(pt.X, pt.Y, sw / 2);
          fragPaths.push(getSvgPath(circleElem)[0]);
        }
      }

      relPaths.push(...mergePaths(fragPaths));
    }

    if (svgElem.getAttribute('fill') !== 'none') {
      const insidePaths = mergePaths(tPoly, true);

      if (insidePaths.length > 0) {
        relPaths.push(...insidePaths);
      } else {
        relPaths = relPaths.slice(0, 1);
      }
    }

    const rel = [];

    for (let mItem of relPaths) {
      rel.push(ZoomOutScale(mItem, scale));
    }

    return rel;
  }
})();
