import userReducer, { userActionCreator } from './user';
import questionReducer, { questionActionCreator } from './question';
import answerReducer, { answerActionCreator } from './answer';
import psychologyTestReducer, { psychologyTestActionCreator } from './page';

export const actionCreator = {
  ...userActionCreator,
  ...questionActionCreator,
  ...psychologyTestActionCreator,
  ...answerActionCreator,
};

const reducer = {
  user: userReducer,
  question: questionReducer,
  answer: answerReducer,
  psychologyTest: psychologyTestReducer,
};

export default reducer;
