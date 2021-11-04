import { combineReducers } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import { all } from 'redux-saga/effects';
import psychologyTestReducer, {
  psychologyTestActions,
  psychologyTestSelector,
} from './page';
import userReducer, { userActions, userSelector } from './user';
import questionReducer, { questionActions, questionSelector } from './question';
import answerReducer, { answerActions, answerSelector } from './answer';
import resultReducer, { resultActions, resultSelector } from './result';
import questionSaga from './questionSaga';
import resultSaga from './resultSaga';

export const actions = {
  ...userActions,
  ...questionActions,
  ...psychologyTestActions,
  ...answerActions,
  ...resultActions,
};

export function* rootSaga() {
  yield all([questionSaga(), resultSaga()]);
}

const rootReducer = combineReducers({
  user: userReducer,
  question: questionReducer,
  answer: answerReducer,
  psychologyTest: psychologyTestReducer,
  result: resultReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['result'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const selector = {
  ...userSelector,
  ...questionSelector,
  ...psychologyTestSelector,
  ...answerSelector,
  ...resultSelector,
};

export default persistedReducer;
