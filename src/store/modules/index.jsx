// import { all } from 'redux-saga/effects';
import psychologyTestReducer, {
  psychologyTestActions,
  psychologyTestSelector,
} from './page';
import userReducer, { userActions, userSelector } from './user';
import questionReducer, { questionActions, questionSelector } from './question';
import answerReducer, { answerActions, answerSelector } from './answer';
import resultReducer, { resultActions, resultSelector } from './result';

export const actions = {
  ...userActions,
  ...questionActions,
  ...psychologyTestActions,
  ...answerActions,
  ...resultActions,
};

export function* rootSaga() {
  // yield all[];
}

const reducer = {
  user: userReducer,
  question: questionReducer,
  answer: answerReducer,
  psychologyTest: psychologyTestReducer,
  result: resultReducer,
};

export const selector = {
  ...userSelector,
  ...questionSelector,
  ...psychologyTestSelector,
  ...answerSelector,
  ...resultSelector,
};

export default reducer;
