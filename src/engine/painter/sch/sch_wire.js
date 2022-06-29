import Paint from '../etc/paint';

export default class SchWire extends Paint {
  constructor () {
    super();

    this.minLength = 2;
    this.maxLength = Infinity;
    this.shortElem = null;
    this.finalElem = null;

    this.hitHostory = [];
    this.direct = 1;
  }

  startPaint (pointArr) {
    let pointStrArr = [];

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

    const wireArr = this.toWireArr(pointArr);

    const newWireArr = JSON.parse(JSON.stringify(wireArr));
    newWireArr.pop();

    this.hitHostory[pointArr.length - 2].end = newWireArr;

    for (let pItem of wireArr) {
      pointStrArr.push(pItem.join(' '));
    }

    this.shortElem = this.device.createElem({
      type: 'sch_wire',
      attrs: {
        'stroke-width': 2,
        'stroke': '#008800',
        points: pointStrArr.join(' '),
      },
      params: {
        position: {
          x: wireArr[0][0],
          y: wireArr[0][1],
        }
      }
    });

    this.finalElem = this.shortElem;
  }

  toWireArr (pointArr) {
    const activityArr = pointArr.slice(-2);
    const sPt = activityArr[0];
    const ePt = activityArr[1];

    if (sPt[0] === ePt[0] && sPt[1] === ePt[1]) {
      this.direct = 0;
    } else {
      if (sPt[0] === ePt[0]) {
        this.direct = 2;
      } else if (sPt[1] === ePt[1]) {
        this.direct = 1;
      } else {
        let interimPt = [];

        if (this.direct === 1) {
          interimPt = [ePt[0], sPt[1]];
        } else {
          interimPt = [sPt[0], ePt[1]];
        }

        activityArr.splice(1, 0, interimPt);
      }
    }

    let hs = [];

    hs = this.hitHostory[pointArr.length - 2].start;

    return [...hs, ...activityArr];
  }
}
