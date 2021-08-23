import userSelector from './user';
import qusetionSelector from './question';
import pageSelector from './page';
import answerSelector from './answer';

const selector = {
  ...userSelector,
  ...qusetionSelector,
  ...pageSelector,
  ...answerSelector,
};

export default selector;
