

export const getSvgProfile = (() => {

  function getProfile(lead, position, net, type, angle, attrs, elem) {
    let area = {};
    let path = [];
    let cpt = {X: 0, Y:0};

    // 焊盘
    if (type === 'pad') {
      if (elem.attrs.shape == 1 || elem.attrs.shape == 2 || elem.attrs.shape == 4) {
        area = {
          minX: lead.minx + position.x,
          minY: (lead.miny + position.y),
          maxX: lead.maxx + position.x,
          maxY: (lead.maxy + position.y),
        };
      } else if (elem.attrs.shape == 0) {
        area = {
          minX: lead.c.x + position.x - lead.r,
          minY: lead.c.y + position.y - lead.r,
          maxX: lead.c.x + position.x + lead.r,
          maxY: lead.c.y + position.y + lead.r,
        };
      } else if (elem.attrs.shape == 3) {
        const xxr = [];
        const yyr = [];

        for (let pt of lead.vertices) {
          xxr.push(pt.x);
          yyr.push(pt.y);
        }

        area = {
          minX: Math.min(...xxr),
          minY: Math.min(...yyr),
          maxX: Math.max(...xxr),
          maxY:  Math.max(...yyr),
        };
      }

      if (elem.attrs.shape == 1 || elem.attrs.shape == 2 || elem.attrs.shape == 4) {
        const radio = elem.attrs.roundRadiusRatio;

        if (radio && (elem.attrs.shape == 4 || elem.attrs.shape == 2 || elem.attrs.shape == 1)) {

          if (elem.attrs.shape == 2 || elem.attrs.shape == 1) {
            const ptArr = [
              {
                X: area.minX,
                Y: area.minY,
              },
              {
                X: area.minX,
                Y: area.maxY,
              },
              {
                X: area.maxX,
                Y: area.maxY,
              },
              {
                X: area.maxX,
                Y: area.minY,
              },
              {
                X: area.minX,
                Y: area.minY,
              },
            ];

            path = [ptArr];
          } else {
            let pArr = [];

            if ((area.maxX - area.minX) > (area.maxY - area.minY)) {
              const ds = Math.min(Number(elem.attrs.width), Number(elem.attrs.height));

              pArr = [
                {
                  X: area.minX + ds / 2,
                  Y: (area.minY + area.maxY) / 2,
                },
                {
                  X: area.maxX - ds / 2,
                  Y: (area.minY + area.maxY) / 2,
                }
              ];

              path = getPolylinePaths(pArr, Math.abs(area.maxY - area.minY));
            } else {
              const ds = Math.min(Number(elem.attrs.width), Number(elem.attrs.height));

              pArr = [
                {
                  X: (area.minX + area.maxX) / 2,
                  Y: area.maxY - ds / 2,
                },
                {
                  X: (area.minX + area.maxX) / 2,
                  Y: area.minY + ds / 2,
                }
              ];

              path = getPolylinePaths(pArr, Math.abs(area.maxX - area.minX));
            }
          }

        } else {

          const pointsArr = [];
          const prr = [];
          const ptArr = [
            {
              X: area.minX,
              Y: area.minY,
            },
            {
              X: area.minX,
              Y: area.maxY,
            },
            {
              X: area.maxX,
              Y: area.maxY,
            },
            {
              X: area.maxX,
              Y: area.minY,
            },
            {
              X: area.minX,
              Y: area.minY,
            },
          ];
          const centerPt = { X: area.minX + (area.maxX - area.minX) / 2, Y: area.minY + (area.maxY - area.minY) / 2 };

          let ag = 0;

          for (let sPt of ptArr) {
            const rPt = sPt;

            prr.push({
              X: rPt[0],
              Y: rPt[1],
            });
            pointsArr.push(rPt[0]+ ',' + rPt[1]);
          }

          path = [prr];

        }
      } else if (elem.attrs.shape == 0) {

        path = getCirclePaths({ X: lead.c.x + position.x, Y: lead.c.y + position.y }, lead.r * 2);

      } else if (elem.attrs.shape == 3) {
        let points = '';
        const prr = [];

        for (let pt of lead.vertices) {

          points += ' ' + (pt.x) + ' ' + (pt.y);

          prr.push({
            X: pt.x,
            Y: pt.y,
          })
        }

        path = [prr];
      }
    }

    // 导线
    if (type === 'wire') {
      area = null;

      let points = '';
      const pArr = [];

      for (let pt of lead.vertices) {
        points += ' ' + (pt.x) + ' ' + (pt.y);
        pArr.push({
          X: pt.x,
          Y: pt.y,
        })
      }

      path = getPolylinePaths(pArr, attrs.width);
    }

    // 通孔
    if (type === 'hole') {
      area = {
        minX: lead.c.x + position.x - lead.r,
        minY: (lead.c.y + position.y - lead.r),
        maxX: lead.c.x + position.x + lead.r,
        maxY: (lead.c.y + position.y + lead.r),
      };

      path = getCirclePaths({ X: lead.c.x + position.x, Y: lead.c.y + position.y }, lead.r * 2);
    }

    // 过孔
    if (type === 'via') {
      area = {
        minX: lead.c.x + position.x - lead.r,
        minY: (lead.c.y + position.y - lead.r),
        maxX: lead.c.x + position.x + lead.r,
        maxY: (lead.c.y + position.y + lead.r),
      };

      path = getCirclePaths({ X: lead.c.x + position.x, Y: lead.c.y + position.y }, lead.r * 2);
    }

    // 贯通盘
    if (type === 'wireHole') {
      area = null;

      let points = '';
      const pArr = [];

      for (let pt of lead.vertices) {

        points += ' ' + (pt.x) + ' ' + (pt.y);
        pArr.push({
          X: pt.x,
          Y: pt.y,
        })
      }

      if (lead.vertices[0].x === lead.vertices[1].x && lead.vertices[0].y === lead.vertices[1].y) {
        path = getCirclePaths({ X: lead.vertices[0].x + position.x, Y: lead.vertices[0].y + position.y }, attrs.holeDiameter);
      } else {
        path = getPolylinePaths(pArr, attrs.holeDiameter);
      }
    }

    // 矩形填充
    if (type === 'fillrect') {
      area = {
        minX: lead.minx,
        minY: (lead.miny),
        maxX: lead.maxx,
        maxY: (lead.maxy),
      };

      const ptArr = [
        {
          X: area.minX,
          Y: area.minY,
        },
        {
          X: area.minX,
          Y: area.maxY,
        },
        {
          X: area.maxX,
          Y: area.maxY,
        },
        {
          X: area.maxX,
          Y: area.minY,
        },
        {
          X: area.minX,
          Y: area.minY,
        },
      ];

      path = [ptArr];
    }

    // 多边形填充
    if (type === 'fillRegion') {
      area = null;

      let points = '';
      const pArr = [];

      for (let { vertex } of lead.vertexNodes) {
        points += ' ' + (vertex.x) + ' ' + (vertex.y);
        pArr.push({
          X: vertex.x,
          Y: vertex.y,
        })
      }

      path = [pArr];
    }

    if (area) {
      cpt = {
        X: (area.maxX + area.minX) / 2,
        Y: (area.maxY + area.minY) / 2,
      }
    }

    let brevityPath = null;

    if (angle && area) {
      brevityPath = getAnglePaths(path, cpt, angle);
    } else {
      brevityPath = path;
    }

    return { net, path: brevityPath, type, area };
  }

  function getPolylinePaths (pArr, sw) {
    const pathsList = [];

    for (let [index, pt] of pArr.entries()) {
      if (pArr[index + 1]) {
        pathsList.push(getLinePaths([pt, pArr[index + 1]], sw));
      }
    }

    const ClipperLib = window.ClipperLib;
    const cpr = new ClipperLib.Clipper();

    for (let paths of pathsList) {
      cpr.AddPaths(paths, ClipperLib.PolyType.ptSubject, true);
    }

    const solution_path = new ClipperLib.Paths();
    cpr.Execute(ClipperLib.ClipType.ctUnion, solution_path, ClipperLib.PolyFillType.pftNonZero, ClipperLib.PolyFillType.pftNonZero);

    return solution_path;
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

    function zoomPath (pathArr, size) {
      const ClipperLib = window.ClipperLib;
      const cpr = new ClipperLib.ClipperOffset(10);
      const relPath = new ClipperLib.Paths();

      cpr.AddPaths(pathArr, ClipperLib.JoinType.jtRound, ClipperLib.EndType.etClosedPolygon);
      cpr.Execute(relPath, size);

      return relPath;
    }
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

    function zoomPath (pathArr, size) {
      const ClipperLib = window.ClipperLib;
      const cpr = new ClipperLib.ClipperOffset(10);
      const relPath = new ClipperLib.Paths();

      cpr.AddPaths(pathArr, ClipperLib.JoinType.jtRound, ClipperLib.EndType.etClosedPolygon);
      cpr.Execute(relPath, size);

      return relPath;
    }
  }

  function getAnglePaths (paths, cpt, angle) {
    let rel = [];

    for (let [index, path] of paths.entries()) {
      rel[index] = [];

      for (let pt of path) {
        const ag = Number(getAngle(cpt, pt)) + Number(angle);
        const rPt = getJoinPoint(dist(cpt, pt), ag, cpt);

        rel[index].push(rPt);
      }
    }

    return rel;
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

  return {
    getProfile,
  }
})();
