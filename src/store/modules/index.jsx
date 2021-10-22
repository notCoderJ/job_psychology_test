// import { all } from 'redux-saga/effects';
import { combineReducers } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
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
