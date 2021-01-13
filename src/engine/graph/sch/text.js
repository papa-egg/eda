import Text from '../basic/text';

export default class SchText extends Text {
  constructor ({ params: { pointsArr } }) {
    super(arguments[0]);

    if (!pointsArr || pointsArr.length <= 0) return;
  }
}
