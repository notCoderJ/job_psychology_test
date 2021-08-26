import userReducer, { userActionCreator } from './user';
import questionReducer, { questionActionCreator } from './question';
import answerReducer, { answerActionCreator } from './answer';
import psychologyTestReducer, { psychologyTestActionCreator } from './page';
import resultReducer, { resultActionCreator } from './result';

export const actionCreator = {
  ...userActionCreator,
  ...questionActionCreator,
  ...psychologyTestActionCreator,
  ...answerActionCreator,
  ...resultActionCreator,
};

const reducer = {
  user: userReducer,
  question: questionReducer,
  answer: answerReducer,
  psychologyTest: psychologyTestReducer,
  result: resultReducer,
};

export default reducer;
