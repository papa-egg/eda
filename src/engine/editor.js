import MouseEvent from './event/event';
import Painter from './painter/painter';
import Bank from './bank/bank';
import Outline from './outline/outline';
import Doc from './doc/doc';
import Device from './device/device';

class Editor {
  constructor (msg) {
    this.type = msg.type;
    this.proId = msg.proId;
    this.proName = msg.proName;

    this.sElems = [];
    this.tElems = [];
    this.zoom = 1;
    this.idx = Editor.idx++;
    this.proMsg = JSON.parse(JSON.stringify(msg));

    if (this.type === 'sch' || this.type === 'sch_element') {
      this.msg = Device.createElem({ type: 'sch_doc' });
    } else if (this.type === 'pcb' || this.type === 'pcb_element') {
      this.msg = Device.createElem({ type: 'pcb_doc' });
    }

    window.$vue.$store.dispatch('setNatureList', this.msg.nature);
  }

  static idx = '0';

  initEditor () {
    this.mouse = new MouseEvent(this.proId, this.proMsg); // 鼠标键盘事件
    this.doc = new Doc(); // 当前文档信息
    this.painter = new Painter(); // 绘制画图
    this.outline = new Outline(); // 元素轮廓
    this.bank = new Bank(); // 文件库

    if (this.type === 'sch') {
      const schBox = Device.createElem({ type: 'sch_box', params: {} });

      this.sElems.unshift(schBox);
    }

    if (this.proMsg.elemList) {
      for (let elem of this.proMsg.elemList) {
        const nElem = Device.createElem({ type: elem.type, params: elem.params, attrs: elem.attrs });

        this.sElems.push(nElem);
      }
    }
  }

  deepProxy (obj, cb) {
    if (typeof obj === 'object') {

      for (let key in obj) {
        if (typeof obj[key] === 'object') {
          obj[key] = this.deepProxy(obj[key], cb);
        }
      }
    }

    return new Proxy(obj, {
      set: function (target, key, value, receiver) {

        if (typeof value === 'object') {
          value = this.deepProxy(value, cb);
        }

        let cbType = target[key] == undefined ? 'create' : 'modify';

        //排除数组修改length回调
        if (!(Array.isArray(target) && key === 'length')) {
          cb(cbType, { target, key, value });
        }
        return Reflect.set(target, key, value, receiver);

      },
      deleteProperty(target, key) {
        cb('delete', { target, key });
        return Reflect.deleteProperty(target, key);
      }
    });
  }

}

export default Editor;
