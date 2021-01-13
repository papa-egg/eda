import Sch_Line from './sch/line';
import Sch_Rect from './sch/rect';
import Sch_Polygon from './sch/polygon';
import Sch_Elliptic from './sch/elliptic';
import Sch_Ellipse from './sch/ellipse';
import Sch_Text from './sch/text';
import Sch_Pin from './sch/pin';
import Sch_Bessel from './sch/bessel';
import Sch_Bank from './sch/bank';
import Sch_Image from './sch/image';

class Painter {
  constructor () {
    this.D_cross = document.getElementById('cross-bar');
    this.motif = null;
  }

  setChartlet (type) {
    this.saveCorss();
    window.$vue.$store.dispatch('setCArr', []);

    switch (type) {

    /********************sch********************/
    case 'sch_Line': {
      this.motif = new Sch_Line();

      break;
    }

    case 'sch_Rect': {
      this.motif = new Sch_Rect();

      break;
    }

    case 'sch_Polygon': {
      this.motif = new Sch_Polygon();

      break;
    }

    case 'sch_Elliptic': {
      this.motif = new Sch_Elliptic();

      break;
    }

    case 'sch_Ellipse': {
      this.motif = new Sch_Ellipse();

      break;
    }

    case 'sch_Text': {
      this.motif = new Sch_Text();

      break;
    }

    case 'sch_Pin': {
      this.motif = new Sch_Pin();

      break;
    }

    case 'sch_Bessel': {
      this.motif = new Sch_Bessel();

      break;
    }

    case 'sch_Bank': {
      this.motif = new Sch_Bank();

      break;
    }

    case 'sch_Image': {
      this.motif = new Sch_Image();

      break;
    }

    /********************pcb********************/

    }
  }

  startChartlet (cx, cy) {
    if (!this.motif) return;

    const cArr = window.$vue.$store.getters.getCArr;
    let pArr = [];

    if (cArr.length > 0 && (cArr[cArr.length - 1].x === cx && cArr[cArr.length - 1].y === cy)) {
      pArr = cArr;
    } else {
      pArr = [...cArr, { x: cx, y: cy }];
    }

    if (pArr.length < this.motif.minLength) return false;
    if (pArr.length > this.motif.maxLength) return this.endChartlet();

    window.$vue.$store.dispatch('setTElems', [this.motif.startPaint(pArr)]);
  }

  endChartlet () {
    if (!this.motif) return;

    const cArr = window.$vue.$store.getters.getCArr;

    if (!cArr.length || (cArr.length + 1 < (this.motif.maxLength !== Infinity ? this.motif.maxLength : 2))) {
      this.cancelCross();
      this.motif = null;
      window.$vue.$store.dispatch('setTElems', []);

      return;
    }

    const sElems = window.$vue.$store.getters.getSElems;
    sElems.push(this.motif.getFragElem());

    window.$vue.$store.dispatch('setSElems', sElems);
    window.$vue.$store.dispatch('setCArr', []);
    window.$vue.$store.dispatch('setTElems', []);
  }

  saveCorss () {
    this.D_cross.setAttribute('style', 'display: block');
  }

  cancelCross () {
    this.D_cross.setAttribute('style', 'display: none');
  }
}

export { Painter };

