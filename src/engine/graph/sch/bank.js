import Group from '../basic/group';

export default class Bank extends Group {
  constructor ({ params: { pointsArr } }) {

    const CH = window.$vue.$store.getters.getCH;
    super(arguments[0]);

    this.childs = CH.bank.getSLibrarys().childs;

    if (!pointsArr || pointsArr.length <= 0) return;

  }
}
