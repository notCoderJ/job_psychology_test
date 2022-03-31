import { toast } from 'react-toastify';
import { put, call, takeEvery, getContext } from 'redux-saga/effects';
import api from '../../api';
import { reducerState } from '../../utils/reducer';
import { testActions } from './test';

const REQ_QUESTIONS = 'test/reqQuestions';

function* reqQuestions() {
  try {
    const questions = yield call(api.getQuestions);

    const data = questions.RESULT;
    if (!Array.isArray(data) || data.length === 0) {
      throw new Error('검사 문항을 불러오는데 실패했습니다.');
    }

    yield put(
      testActions.loadQuestions(reducerState.success(questions.RESULT)),
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

    yield put(testActions.loadQuestions(reducerState.failure(err.message)));
  }
}

function* testSaga() {
  yield takeEvery(REQ_QUESTIONS, reqQuestions);
}

export default testSaga;
