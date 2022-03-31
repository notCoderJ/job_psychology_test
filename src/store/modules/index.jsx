import { combineReducers } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage/session';
import { persistReducer } from 'redux-persist';
import { all } from 'redux-saga/effects';
import userReducer, { userActions, userSelector } from './user';
import testReducer, { testActions, testSelector } from './test';
import resultReducer, { resultActions, resultSelector } from './result';
import testSaga from './testSaga';
import resultSaga from './resultSaga';

export const actions = {
  ...userActions,
  ...testActions,
  ...resultActions,
};

export function* rootSaga() {
  yield all([testSaga(), resultSaga()]);
}

const rootReducer = combineReducers({
  user: userReducer,
  test: testReducer,
  result: resultReducer,
});

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const selector = {
  ...userSelector,
  ...testSelector,
  ...resultSelector,
};

export default persistedReducer;
