import { toast } from 'react-toastify';
import { put, retry, takeEvery, getContext } from 'redux-saga/effects';
import api from '../../api';
import { reducerState } from '../../utils/reducer';
import { questionActions } from './question';

const REQ_QUESTIONS = 'question/reqQuestions';
const SECOND = 1000;

function* reqQuestions() {
  try {
    const questions = yield retry(3, 2 * SECOND, api.getQuestions);
    const data = questions.RESULT;
    if (!Array.isArray(data) || data.length === 0) {
      throw new Error('검사 문항을 불러오는데 실패했습니다.');
    }
    yield put(
      questionActions.loadQuestions(reducerState.success(questions.RESULT)),
    );
    const history = yield getContext('history');
    history.push('/test');
  } catch (err) {
    yield toast.error('검사 문항을 불러오는데 실패했습니다.', {
      toastId: 'errorMsg',
      autoClose: 2000,
      hideProgressBar: true,
      draggable: true,
    });
    yield put(questionActions.loadQuestions(reducerState.failure(err.message)));
  }
}

function* questionSaga() {
  yield takeEvery(REQ_QUESTIONS, reqQuestions);
}

export default questionSaga;
