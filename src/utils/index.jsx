import { API_BASE_URL } from '../constants';
import { RESULT_ANSWER_FORM, TEST_TYPE } from '../constants/test';

export const createBaseURL = (type) => {
  const URL = { test: '/openapi/test', result: '/api/psycho' };
  return `${API_BASE_URL}${URL[type]}`;
};

export const getFixedDigits = (num) => (num < 10 ? `0${num}` : `${num}`);

export const getResultRequestFormAnswer = (questionSeq, answers) => {
  const { prefix, infix, postfix } = RESULT_ANSWER_FORM[questionSeq];
  return answers
    .map((answer, index) => {
      const questionNumber = index + 1;
      return `${prefix}${questionNumber}${infix}${answer}${postfix}`;
    })
    .join('');
};
/// 여기서 부터 테스트 혀
const parseJobValuesNormal = (result) => {
  const allValues = result?.wonScore
    .trim()
    .replace(/[0-9]+=/g, '')
    .split(' ');
  const values = allValues.map((score, index) => [score, index + 1]).sort();

  return {
    allValues,
    firstHighValue: values.pop()[1],
    secondHighValue: values.pop()[1],
  };
};

export const getParsedResult = (questionSeq, result) => {
  // TODO: xxx[inspct?.qestnrSeq] = 요걸로 타입별 파슁!
  switch (questionSeq) {
    case TEST_TYPE.JOB_INTEREST_KM:
    case TEST_TYPE.JOB_INTEREST_KH:
    case TEST_TYPE.CAREER_DEVELOPMENT_READINESS:
    case TEST_TYPE.NATURAL_SCIENCE_MAJOR:
    case TEST_TYPE.MAJOR_ABILITY:
    case TEST_TYPE.JOB_INTEREST_HM:
    case TEST_TYPE.JOB_INTEREST_HH:
    case TEST_TYPE.CAREER_INTEREST:
    case TEST_TYPE.JOB_FIT_M:
    case TEST_TYPE.JOB_FIT_H:
    case TEST_TYPE.CAREER_MATURITY_M:
    case TEST_TYPE.CAREER_MATURITY_H:
    case TEST_TYPE.JOB_VALUES_M:
    case TEST_TYPE.JOB_VALUES_H:
    case TEST_TYPE.JOB_VALUES_NORMAL:
      return parseJobValuesNormal(result);
    case TEST_TYPE.CAREER_DEVELOPMENT_ABILITY_M:
    case TEST_TYPE.CAREER_DEVELOPMENT_ABILITY_H:
    default:
      return {};
  }
};

// TODO: Error handle wrapper
// export const safetyWrapper = () =>{
//   return () => {
//   }
//   try {

//   } catch(err) {
//     console.log(err);
//   }
// }
