import { TEST_TYPE } from '../constants/test';

const parseJobValuesNormal = (result) => {
  const allValues = result?.wonScore
    .trim()
    .replace(/[0-9]+=/g, '')
    .split(' ');
  const values = allValues.map((score, index) => [score, index + 1]).sort();

  return {
    allValues,
    firstHighLevelValue: values.pop()[1],
    secondHighLevelValue: values.pop()[1],
  };
};

// TODO: xxx[inspct?.qestnrSeq] = 요걸로 타입별 파슁!(모든 검사 확장할 때...)
export const getParsedResult = (questionSeq, result) => {
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
