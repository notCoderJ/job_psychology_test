import {
  all,
  put,
  retry,
  select,
  takeEvery,
  getContext,
} from 'redux-saga/effects';
import api from '../../api';
import {
  QUESTION_SEQ,
  RESULT_ANSWER_FORM,
  TARGET_NORMAL,
} from '../../constants/test';
import { reducerState } from '../../utils/reducer';
import { answerSelector } from './answer';
import { resultActions, resultSelector } from './result';
import { userSelector } from './user';

const SECOND = 1000;
const REQ_RESULT_DATA = 'result/reqResult';
const REQ_VALUES_DESCRIPTION = 'result/reqValueDescriptions';
const REQ_JOB_INFO = 'result/reqJobData';

const getResultRequestFormAnswer = (rawAnswers) => {
  const { prefix, infix, postfix } = RESULT_ANSWER_FORM[QUESTION_SEQ];
  return rawAnswers
    .map((answer, index) => {
      const questionNumber = index + 1;
      return `${prefix}${questionNumber}${infix}${answer}${postfix}`;
    })
    .join('');
};

function* getRequestForm() {
  const [userData, rawAnswers] = yield all([
    select(userSelector.getUserData),
    select(answerSelector.getAnswers),
  ]);
  const answers = getResultRequestFormAnswer(rawAnswers.slice(1));

  return {
    qestrnSeq: QUESTION_SEQ,
    targetSeq: TARGET_NORMAL,
    startDtm: new Date().getTime(),
    ...userData,
    grade: '',
    answers,
  };
}

function* getResultData() {
  const sendData = yield getRequestForm();
  try {
    // Get Result API URL
    const response = yield retry(3, 2 * SECOND, api.getResultURL, sendData);
    const paramsString = new URL(response.RESULT.url).search;
    const params = new URLSearchParams(paramsString);
    const seq = params.get('seq');

    // Get Result Data
    const resultData = yield retry(3, 2 * SECOND, api.getResultData, { seq });
    yield put(resultActions.loadResult(reducerState.success(resultData)));

    // Get Values Description & Job Info
    yield all([
      put(resultActions.reqValueDescriptions(reducerState.loading())),
      put(resultActions.reqJobData(reducerState.loading())),
    ]);
  } catch (err) {
    yield put(resultActions.loadResult(reducerState.failure(err)));
  }
}

function* getValuesDescription() {
  try {
    const valuesDescription = yield retry(
      3,
      2 * SECOND,
      api.getValuesDescription,
      { qestnrseq: QUESTION_SEQ },
    );

    yield put(
      resultActions.loadValueDescriptions(
        reducerState.success(valuesDescription),
      ),
    );
  } catch (err) {
    yield put(resultActions.loadValueDescriptions(reducerState.failure(err)));
  }
}

function* getAverageJobInfo() {
  const highLevelValues = yield select(resultSelector.getTwoHighLevelValues);
  try {
    const jobInfo = yield all([
      retry(
        3,
        2 * SECOND,
        api.getAverageJobInfoByType('grade'),
        highLevelValues,
      ),
      retry(
        3,
        2 * SECOND,
        api.getAverageJobInfoByType('major'),
        highLevelValues,
      ),
    ]);
    yield put(resultActions.loadJobData(reducerState.success(jobInfo)));

    const history = yield getContext('history');
    history.replace('/complete');
  } catch (err) {
    yield put(resultActions.loadJobData(reducerState.failure(err)));
  }
}

function* resultSaga() {
  yield takeEvery(REQ_RESULT_DATA, getResultData);
  yield takeEvery(REQ_VALUES_DESCRIPTION, getValuesDescription);
  yield takeEvery(REQ_JOB_INFO, getAverageJobInfo);
}

export default resultSaga;
