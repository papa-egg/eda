

const getProfile = ({ type, attrs, box, ptArr }) => {
  let path = [];

  if (type === 'rect') {
    const ptArr = [];
    const sw = attrs['stroke-width'] || 0;

    ptArr.push(
      {
        X: attrs.x,
        Y: attrs.y,
      },
      {
        X: attrs.x + attrs.width,
        Y: attrs.y,
      },
      {
        X: attrs.x + attrs.width,
        Y: attrs.y + attrs.height,
      },
      {
        X: attrs.x,
        Y: attrs.y + attrs.height,
      },
      {
        X: attrs.x,
        Y: attrs.y,
      },
    )

    path = getPolylinePaths(ptArr, sw);

    if (attrs.fill !== 'none') {
      path.push(
        [
          {
            X: attrs.x,
            Y: attrs.y,
          },
          {
            X: attrs.x + attrs.width,
            Y: attrs.y,
          },
          {
            X: attrs.x + attrs.width,
            Y: attrs.y + attrs.height,
          },
          {
            X: attrs.x,
            Y: attrs.y + attrs.height,
          },
          {
            X: attrs.x,
            Y: attrs.y,
          },
        ]
      )
    }
  } else if (type === 'polyline') {
    const sw = attrs['stroke-width'] || 0;
    const pStrArr = attrs.points.trim().split(' ');
    const pArr = [];
    const pointArr = [];

    for (let i = 0; i < pStrArr.length; i += 2) {
      pArr.push(pStrArr.slice(i, i + 2));
    }

    for (let [index, item] of pArr.entries()) {
      pointArr.push({
        X: parseFloat(item[0]),
        Y: parseFloat(item[1]),
      })
    }

    path = getPolylinePaths(pointArr, sw);
  } else if (type === 'text') {
    const ptArr = [];

    ptArr.push(
      {
        X: box.x,
        Y: box.y,
      },
      {
        X: box.x + box.width,
        Y: box.y,
      },
      {
        X: box.x + box.width,
        Y: box.y + box.height,
      },
      {
        X: box.x,
        Y: box.y + box.height,
      },
      {
        X: box.x,
        Y: box.y,
      },
    )

    path = [ptArr];
  } else if (type === 'polygon') {
    const sw = attrs['stroke-width'] || 0;
    const pStrArr = attrs.points.trim().split(' ');
    const pArr = [];
    const pointArr = [];

    for (let i = 0; i < pStrArr.length; i += 2) {
      pArr.push(pStrArr.slice(i, i + 2));
    }

    for (let [index, item] of pArr.entries()) {
      pointArr.push({
        X: parseFloat(item[0]),
        Y: parseFloat(item[1]),
      });

      if (index === pArr.length - 1) {
        pointArr.push({
          X: parseFloat(pArr[0][0]),
          Y: parseFloat(pArr[0][1]),
        });
      }
    }

    path = getPolylinePaths(pointArr, sw);

    if (attrs.fill !== 'none') {
      path.push(pointArr);
    }
  } else if (type === 'line') {
    const sw = attrs['stroke-width'] || 0;
    const pointArr = [
      {
        X: attrs.x1,
        Y: attrs.y1,
      },
      {
        X: attrs.x2,
        Y: attrs.y2,
      }
    ];

    path = getPolylinePaths(pointArr, sw);
  } else if (type === 'circle') {
    const sw = attrs['stroke-width'] || 0;
    const pt = {
      X: attrs.cx,
      Y: attrs.cy,
    };

    path = getCirclePaths(pt, (attrs.r + sw) * 2);
  } else if (type === 'path') {
    const sw = attrs['stroke-width'] || 0;
    const pointArr = ptArr;

    if (attrs.fill !== 'none') {
      pointArr.push(pointArr[0]);
    }

    path = getPolylinePaths(pointArr, sw);

    if (attrs.fill !== 'none') {
      path.push(pointArr);
    }
  }

  return toPt(path);
}

function toPt (pathsList) {
  const rel = [];

  for (let list of pathsList) {
    const _Arr = [];

    for (let pt of list) {
      _Arr.push([pt.X, pt.Y]);
    }

    rel.push(_Arr);
  }

  return rel;
}

function getPolylinePaths (pArr, sw) {
  const pathsList = [];

  for (let [index, pt] of pArr.entries()) {
    if (pArr[index + 1]) {
      const path = getLinePaths([pt, pArr[index + 1]], sw)[0];

      if (path) {
        pathsList.push(path);
      }

    }
  }

  return pathsList;
  /*const ClipperLib = window.ClipperLib;
  const cpr = new ClipperLib.Clipper();

  for (let paths of pathsList) {
    cpr.AddPaths(paths, ClipperLib.PolyType.ptSubject, true);
  }

  const solution_path = new ClipperLib.Paths();
  cpr.Execute(ClipperLib.ClipType.ctUnion, solution_path, ClipperLib.PolyFillType.pftNonZero, ClipperLib.PolyFillType.pftNonZero);

  return solution_path;*/
}

function getLinePaths (pArr, sw) {
  const angle = getAngle(pArr[0], pArr[1]);
  const p1 = getJoinPoint(1, angle - 90, pArr[0]);
  const p2 = getJoinPoint(1, angle + 90, pArr[0]);
  const p3 = getJoinPoint(1, angle - 90, pArr[1]);
  const p4 = getJoinPoint(1, angle + 90, pArr[1]);
  const pathArr = [[p1, p3, p4, p2]];
  const sk = Math.ceil((sw - 2) / 2);

  return zoomPath(pathArr, sk);
}

function getCirclePaths (pt, sw) {
  const pp1 = pt;
  const pp2 = {
    X: pp1.X + 1,
    Y: pp1.Y + 1,
  };

  const angle = getAngle(pp1, pp2);
  const p1 = getJoinPoint(1, angle - 90, pp1);
  const p2 = getJoinPoint(1, angle + 90, pp1);
  const p3 = getJoinPoint(1, angle - 90, pp2);
  const p4 = getJoinPoint(1, angle + 90, pp2);
  const pathArr = [[p1, p3, p4, p2]];
  const sk = Math.ceil((sw - 2) / 2);

  return zoomPath(pathArr, sk);
}

function getAngle (start, end) {
  const diff_x = end.X - start.X;
  const diff_y = end.Y - start.Y;

  return Math.atan2(diff_y, diff_x) * 180 / Math.PI;
}

function dist (start, end) {
  const p1 = start;
  const p2 = end;
  const a = p2.X - p1.X;
  const b = p2.Y - p1.Y;

  return Math.sqrt(a * a + b * b);
}

function getJoinPoint (r = 5, angle, pt) {
  const majorR = r;
  const minorR = r;
  const centrifugal = Math.atan2(majorR*Math.sin(angle * Math.PI / 180), minorR*Math.cos(angle * Math.PI / 180));

  return {
    X: Number(majorR*Math.cos(centrifugal)) + Number(pt.X),
    Y: Number(minorR*Math.sin(centrifugal)) + Number(pt.Y),
  }
}

function zoomPath (pathArr, size) {
  const ClipperLib = window.ClipperLib;
  const cpr = new ClipperLib.ClipperOffset(10);
  const relPath = new ClipperLib.Paths();

  cpr.AddPaths(pathArr, ClipperLib.JoinType.jtRound, ClipperLib.EndType.etClosedPolygon);
  cpr.Execute(relPath, size);

  return relPath;
}

export default getProfile;
