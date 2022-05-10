import { combineReducers } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage/session';
import { persistReducer } from 'redux-persist';
import userReducer, { userActions, userSelector } from './user';
import testReducer, { testActions, testSelector } from './test';
import resultReducer, { resultActions, resultSelector } from './result';

export * from './test';

export const actions = { ...userActions, ...testActions, ...resultActions };

const rootReducer = combineReducers({
  user: userReducer,
  test: testReducer,
  result: resultReducer,
});

const persistConfig = { key: 'root', storage };
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const selector = { ...userSelector, ...testSelector, ...resultSelector };

export default persistedReducer;
