import { MouseEvent } from './event/event';
import { Painter } from './painter/painter';
import { Bank } from './bank/bank';

export class InitEditor {
  constructor () {

    this.bank = new Bank();
    this.painter = new Painter();
    this.mouse = new MouseEvent();
  }
}
