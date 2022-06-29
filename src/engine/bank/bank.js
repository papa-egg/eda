import librarys from '@/engine/library/library';

export default class Bank {
  constructor () {
    this.librarys = librarys;
    this.sLibrarys = null;
  }

  getlibrarys (id = '') {
    if (!id) {
      return [];
    }

    let sArr = null;

    for (let lib of this.librarys) {
      if (lib.id === id) {
        sArr = lib;
      }
    }

    return sArr;
  }
}
