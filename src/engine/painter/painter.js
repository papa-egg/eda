import SchPolyline from './sch/sch_polyline';
import SchRect from './sch/sch_rect';
import SchCircle from './sch/sch_circle';
import SchEllipse from './sch/sch_ellipse';
import SchElliptic from './sch/sch_elliptic';
import SchPolygon from './sch/sch_polygon';
import SchText from './sch/sch_text';
import SchLine from './sch/sch_line';
import SchPin from './sch/sch_pin';
import SchWire from './sch/sch_wire';
import SchBusLine from './sch/sch_bus_line';
import SchNetGnd from './sch/sch_net_gnd';
import SchNetVcc from './sch/sch_net_vcc';
import SchBusEntry from './sch/sch_bus_entry';
import SchNetLabel from './sch/sch_net_label';
import SchNetPort from './sch/sch_net_port';
import SchNoConnect from './sch/sch_no_connect';
import SchProbe from './sch/sch_probe';
import SchBessel from './sch/sch_bessel';
import SchComponent from './sch/sch_component';

import PcbText from './pcb/pcb_text';
import PcbPolygon from './pcb/pcb_polygon';
import PcbHole from './pcb/pcb_hole';
import PcbVia from './pcb/pcb_via';
import PcbPad from './pcb/pcb_pad';
import PcbWire from './pcb/pcb_wire';

import DomConfig from '@/engine/common/dom-config';

export default class Painter {
  constructor () {
    this.motif = null;
  }

  initChartlet (type) {
    this.saveCorss();
    window.$vue.$store.dispatch('setCArr', []);

    switch (type) {

    /********************sch********************/
    case 'sch_component': {
      this.motif = new SchComponent();

      break;
    }

    case 'sch_line': {
      this.motif = new SchLine();

      break;
    }

    case 'sch_polyline': {
      this.motif = new SchPolyline();

      break;
    }

    case 'sch_rect': {
      this.motif = new SchRect();

      break;
    }

    case 'sch_circle': {
      this.motif = new SchCircle();

      break;
    }

    case 'sch_ellipse': {
      this.motif = new SchEllipse();

      break;
    }

    case 'sch_elliptic': {
      this.motif = new SchElliptic();

      break;
    }

    case 'sch_polygon': {
      this.motif = new SchPolygon();

      break;
    }

    case 'sch_text': {
      this.motif = new SchText();

      break;
    }

    case 'sch_pin': {
      this.motif = new SchPin();

      break;
    }

    case 'sch_wire': {
      this.motif = new SchWire();

      break;
    }

    case 'sch_bus_line': {
      this.motif = new SchBusLine();

      break;
    }

    case 'sch_net_gnd': {
      this.motif = new SchNetGnd();

      break;
    }

    case 'sch_net_vcc': {
      this.motif = new SchNetVcc();

      break;
    }

    case 'sch_bus_entry': {
      this.motif = new SchBusEntry();

      break;
    }

    case 'sch_net_label': {
      this.motif = new SchNetLabel();

      break;
    }

    case 'sch_net_port': {
      this.motif = new SchNetPort();

      break;
    }

    case 'sch_no_connect': {
      this.motif = new SchNoConnect();

      break;
    }

    case 'sch_probe': {
      this.motif = new SchProbe();

      break;
    }

    case 'sch_bessel': {
      this.motif = new SchBessel();

      break;
    }

    /********************pcb********************/

    case 'pcb_text': {
      this.motif = new PcbText();

      break;
    }

    case 'pcb_polygon': {
      this.motif = new PcbPolygon();

      break;
    }

    case 'pcb_hole': {
      this.motif = new PcbHole();

      break;
    }

    case 'pcb_via': {
      this.motif = new PcbVia();

      break;
    }

    case 'pcb_pad': {
      this.motif = new PcbPad();

      break;
    }

    case 'pcb_wire': {
      this.motif = new PcbWire();

      break;
    }

    }
  }

  startChartlet (cx, cy) {
    if (!this.motif) return;

    const cArr = window.$vue.$store.getters.getCArr;
    let pArr = [];

    if (cArr.length > 0 && (cArr[cArr.length - 1].x === cx && cArr[cArr.length - 1].y === cy)) {
      pArr = cArr;
    } else {
      pArr = [...cArr, [cx, cy]];
    }

    if (pArr.length < this.motif.minLength) return false;
    if (pArr.length > this.motif.maxLength) return this.endChartlet();

    this.motif.startPaint(pArr);

    const CH = window.$vue.$store.getters.getCH;

    CH.tElems = [this.motif.shortElem];
  }

  endChartlet () {
    if (!this.motif) return false;

    const cArr = window.$vue.$store.getters.getCArr;

    if (!cArr.length || (cArr.length + 1 < (this.motif.maxLength !== Infinity ? this.motif.maxLength : 2))) {
      this.cancelCross();
      this.motif = null;

      const CH = window.$vue.$store.getters.getCH;
      CH.tElems = [];

      return true;
    }

    const CH = window.$vue.$store.getters.getCH;
    const sElems = CH.sElems;
    sElems.push(this.motif.finalElem);

    window.$vue.$store.dispatch('setCArr', []);

    CH.tElems = [];
  }

  saveCorss () {
    DomConfig.setAttrs('cross-bar', { 'style': 'display: block' });
  }

  cancelCross () {
    DomConfig.setAttrs('cross-bar', { 'style': 'display: none' });
  }
}
