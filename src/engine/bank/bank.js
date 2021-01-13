import librarys from '@/engine/sch-library/sch-library';

export class Bank {
  constructor () {
    this.librarys = librarys;
    this.sLibrarys = null;
  }

  getlibrarys (id = '', name = '') {
    if (!(id && name)) {
      return this.librarys;
    }

    const sArr = [];

    for (let lib of this.librarys) {
      if (lib.id === id && lib.name === name) {
        sArr.push(lib);
      }
    }

    return sArr[0] || {};
  }

  getSLibrarys () {
    return JSON.parse(JSON.stringify(this.sLibrarys));
  }

  checklibrarys (id = '', name = '') {
    const sArr = [];

    for (let lib of this.librarys) {
      if (lib.id === id && lib.name === name) {
        sArr.push(lib);
      }
    }

    this.sLibrarys = sArr[0] || null;
  }

}
