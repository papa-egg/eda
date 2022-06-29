import Group from './basic/group';

import SchDoc from './sch/sch_doc';
import SchPolyline from './sch/sch_polyline';
import SchLine from './sch/sch_line';
import SchProbe from './sch/sch_probe';
import SchText from './sch/sch_text';
import SchCircle from './sch/sch_circle';
import SchEllipse from './sch/sch_ellipse';
import SchPath from './sch/sch_path';
import SchRect from './sch/sch_rect';
import SchPolygon from './sch/sch_polygon';
import SchBessel from './sch/sch_bessel';
import SchGroup from './sch/sch_group';
import SchPin from './sch/sch_pin';
import SchNoConnect from './sch/sch_no_connect';
import SchNetPort from './sch/sch_net_port';
import SchNetLabel from './sch/sch_net_label';
import SchBusEntry from './sch/sch_bus_entry';
import SchBusLine from './sch/sch_bus_line';
import SchWire from './sch/sch_wire';
import SchNetGnd from './sch/sch_net_gnd';
import SchNetVcc from './sch/sch_net_vcc';
import SchComponent from './sch/sch_component';

import PcbWire from './pcb/pcb_wire';
import PcbPad from './pcb/pcb_pad';
import PcbVia from './pcb/pcb_via';
import PcbHole from './pcb/pcb_hole';
import PcbLine from './pcb/pcb_line';
import PcbPath from './pcb/pcb_path';
import PcbText from './pcb/pcb_text';
import PcbGroup from './pcb/pcb_group';
import PcbCircle from './pcb/pcb_circle';
import PcbPolygon from './pcb/pcb_polygon';
import PcbRect from './pcb/pcb_rect';
import PcbPolyline from './pcb/pcb_polyline';
import PcbDoc from './pcb/pcb_doc';

const Device = (() => {

  return {
    createElem (dec) {
      const { type, attrs, params } = dec;

      const fragElem = this.produceElem(type, attrs, params);

      if (params && params.childs && params.childs.length > 0) {
        fragElem.childs = [];

        for (let child of params.childs) {
          // nchild.params.position.x += dec.params.position.x;
          // child.params.position.y += dec.params.position.y;
          fragElem.childs.push(this.createElem(child));
        }
      }

      return fragElem;
    },

    reducElem (elem) {
      const type = elem.attrs.mType;
      const attrs = Object.assign({}, elem.attrs);
      const params = Object.assign({}, elem.params);

      return {
        type,
        attrs,
        params,
      }
    },

    produceElem (type = '', attrs = {}, params = {}) {
      switch (type) {

      case 'pcb_doc': {

        return new PcbDoc(type, attrs, params);
      }

      case 'pcb_wire': {
        return new PcbWire(type, attrs, params);
      }

      case 'pcb_polyline': {
        return new PcbPolyline(type, attrs, params);
      }

      case 'pcb_rect': {
        return new PcbRect(type, attrs, params);
      }

      case 'pcb_polygon': {
        return new PcbPolygon(type, attrs, params);
      }

      case 'pcb_circle': {
        return new PcbCircle(type, attrs, params);
      }

      case 'pcb_group': {
        return new PcbGroup(type, attrs, params);
      }

      case 'pcb_text': {
        return new PcbText(type, attrs, params);
      }

      case 'pcb_path': {
        return new PcbPath(type, attrs, params);
      }

      case 'pcb_line': {
        return new PcbLine(type, attrs, params);
      }

      case 'pcb_hole': {
        return new PcbHole(type, attrs, params);
      }

      case 'pcb_via': {
        return new PcbVia(type, attrs, params);
      }

      case 'pcb_pad': {
        return new PcbPad(type, attrs, params);
      }

      case 'sch_net_vcc': {
        return new SchNetVcc(type, attrs, params);
      }

      case 'sch_net_gnd': {
        return new SchNetGnd(type, attrs, params);
      }

      case 'sch_wire': {
        return new SchWire(type, attrs, params);
      }

      case 'sch_bus_line': {
        return new SchBusLine(type, attrs, params);
      }

      case 'sch_bus_entry': {
        return new SchBusEntry(type, attrs, params);
      }

      case 'sch_net_label': {
        return new SchNetLabel(type, attrs, params);
      }

      case 'sch_net_port': {
        return new SchNetPort(type, attrs, params);
      }

      case 'sch_no_connect': {
        return new SchNoConnect(type, attrs, params);
      }

      case 'sch_pin': {
        return new SchPin(type, attrs, params);
      }

      case 'sch_group': {
        return new SchGroup(type, attrs, params);
      }

      case 'group': {

        return new Group(type, attrs, params);
      }

      case 'sch_doc': {
        return new SchDoc(type, attrs, params);
      }

      case 'sch_polyline': {
        return new SchPolyline(type, attrs, params);
      }

      case 'sch_line': {
        return new SchLine(type, attrs, params);
      }

      case 'sch_probe': {

        return new SchProbe(type, attrs, params);
      }

      case 'sch_text': {

        return new SchText(type, attrs, params);
      }

      case 'sch_circle': {

        return new SchCircle(type, attrs, params);
      }

      case 'sch_ellipse': {

        return new SchEllipse(type, attrs, params);
      }

      case 'sch_path': {

        return new SchPath(type, attrs, params);
      }

      case 'sch_rect': {

        return new SchRect(type, attrs, params);
      }

      case 'sch_polygon': {

        return new SchPolygon(type, attrs, params);
      }

      case 'sch_bessel': {

        return new SchBessel(type, attrs, params);
      }

      case 'sch_component': {
        return new SchComponent(type, attrs, params);
      }

      }
    }
  }
})();

export default Device;
