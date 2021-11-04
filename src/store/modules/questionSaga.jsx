import { put, retry, takeEvery, getContext } from 'redux-saga/effects';
import api from '../../api';
import { reducerState } from '../../utils/reducer';
import { questionActions } from './question';

const REQ_QUESTIONS = 'question/reqQuestions';
const SECOND = 1000;

function* reqQuestions() {
  try {
    const questions = yield retry(3, 2 * SECOND, api.getQuestions);
    yield put(
      questionActions.loadQuestions(reducerState.success(questions.RESULT)),
    );
    const history = yield getContext('history');
    history.push('/test');
  } catch (err) {
    yield put(questionActions.loadQuestions(reducerState.failure(err)));
  }
}

function* questionSaga() {
  yield takeEvery(REQ_QUESTIONS, reqQuestions);
}

export default questionSaga;
