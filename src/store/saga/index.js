import { all } from 'redux-saga/effects';
import testSaga from './testSaga';
import resultSaga from './resultSaga';

export default function* rootSaga() {
  yield all([testSaga(), resultSaga()]);
}
