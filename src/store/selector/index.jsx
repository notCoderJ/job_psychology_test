import userSelector from './user';
import qusetionSelector from './question';
import pageSelector from './page';
import answerSelector from './answer';
import resultSelector from './result';

const selector = {
  ...userSelector,
  ...qusetionSelector,
  ...pageSelector,
  ...answerSelector,
  ...resultSelector,
};

export default selector;
