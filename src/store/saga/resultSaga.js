import {
  all,
  put,
  call,
  select,
  takeEvery,
  getContext,
} from 'redux-saga/effects';
import api from '../../api';
import { actions, selector } from '../modules';
import { getFixedDigits } from '../../utils';
import { GENDER_NAMES } from '../../constants';
import { QUESTION_SEQ, TARGET_NORMAL } from '../../constants/test';
import { MONTHS, WEEKDAYS } from '../../constants/result';

const REQ_RESULT_DATA = 'result/reqResult';

const parseAnswer = (rawAnswers) =>
  rawAnswers
    .map((answer, index) => {
      const questionNumber = index + 1;
      return `B${questionNumber}=${answer} `;
    })
    .join('');

const parseResult = (resultData) => {
  const {
    user: { name, grade, targetNm },
    inspct,
    result,
  } = resultData;

  // Parse date
  const dateInfo = new Date(inspct?.registDt);
  const testDate = `${dateInfo.getFullYear()}.${getFixedDigits(
    MONTHS[dateInfo.getMonth()],
  )}.${dateInfo.getDate()}(${WEEKDAYS[dateInfo.getDay()]})`;

  // Parse score
  const scores = result?.wonScore
    .trim()
    .split(' ')
    .map((score) => Number(score.split('=')[1]));
  const sorted = scores.map((score, index) => [score, index + 1]).sort();

  return {
    inspectInfo: {
      type: inspct.qestnrNm,
      date: testDate,
      user: { name, grade: GENDER_NAMES[grade], type: targetNm },
    },
    result: {
      scores,
      highestScore: sorted.pop()[1],
      secondHighestScore: sorted.pop()[1],
      lowestScore: sorted[0][1],
      secondLowestScore: sorted[1][1],
    },
  };
};

function* getResultData() {
  try {
    // Get data from redux
    const [name, gender, rawAnswers] = yield all([
      select(selector.getUserName),
      select(selector.getUserGender),
      select(selector.getAnswers),
    ]);

    // Get url of result page
    const response = yield call(api.getResultURL, {
      qestrnSeq: QUESTION_SEQ,
      targetSeq: TARGET_NORMAL,
      startDtm: new Date().getTime(),
      name,
      gender,
      grade: '',
      answers: parseAnswer(rawAnswers.slice(1)),
    });
    const paramsString = new URL(response.RESULT.url).search;
    const params = new URLSearchParams(paramsString);
    const seq = params.get('seq');

    // Get result data
    const resultData = yield call(api.getResultData, { seq });
    const parsedResult = parseResult(resultData);

    // Get value description & job info
    const { highestScore: no1, secondHighestScore: no2 } = parsedResult.result;
    const twoHighestValues = { no1, no2 };
    const [valuesDescription, ...jobInfo] = yield all([
      call(api.getValuesDescription, { qestnrseq: QUESTION_SEQ }),
      call(api.getJobInfoByType('grade'), twoHighestValues),
      call(api.getJobInfoByType('major'), twoHighestValues),
    ]);

    yield all([
      put(actions.loadResult(parsedResult)),
      put(actions.loadValueDescriptions(valuesDescription)),
      put(actions.loadJobInfo(jobInfo)),
    ]);
    yield put(actions.finResult('success'));

    // Move complete page
    const history = yield getContext('history');
    history.push('/complete');
  } catch (err) {
    yield put(actions.finResult(err));
  }
}

function* moveMainPage() {
  const history = yield getContext('history');
  history.replace('/');
}

function* resultSaga() {
  yield takeEvery(REQ_RESULT_DATA, getResultData);
  yield takeEvery('RESET', moveMainPage);
}

export default resultSaga;
