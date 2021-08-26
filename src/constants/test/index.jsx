export const MAX_PAGE_QUESTION_COUNT = 5;

export const SAMPLE_DESCRIPTION =
  '직업과 관련된 두개의 가치 중에서 자기에게 더 중요한 가치에 표시하세요. 가치의 뜻을 잘모르겠다면 문항 아래에 있는 가치의 설명을 확인해보세요.';
export const SAMPLE_QUESTION = {
  questionNumber: 0,
  description: '두 개 가치 중에 자신에게 더 중요한 가치를 선택하세요.',
  defaultAnswerOptions: [
    { description: '보수', score: '1' },
    { description: '사회적 인정', score: '2' },
  ],
};

export const QUESTION_SEQ = 6;
export const TARGET_SEQ = {
  초등학생: 100205,
  중학생: 100206, // 14 ~ 16세 청소년
  고등학생: 100207, // 17 ~ 19세 청소년
  대학생: 100208,
  일반: 100209,
  '일반(학부모)': 100210,
  교사: 100214,
  '교사(상담)': 100215,
}; // 임시 코드

export const TEST_TYPE = Object.freeze({
  JOB_INTEREST_KM: 4,
  JOB_INTEREST_KH: 5,
  CAREER_DEVELOPMENT_READINESS: 8,
  NATURAL_SCIENCE_MAJOR: 9,
  MAJOR_ABILITY: 10,
  JOB_INTEREST_HM: 17,
  JOB_INTEREST_HH: 18,
  CAREER_INTEREST: 19,
  JOB_FIT_M: 20,
  JOB_FIT_H: 21,
  CAREER_MATURITY_M: 22,
  CAREER_MATURITY_H: 23,
  JOB_VALUES_M: 24,
  JOB_VALUES_H: 25,
  JOB_VALUES_NORMAL: 6,
  CAREER_DEVELOPMENT_ABILITY_M: 26,
  CAREER_DEVELOPMENT_ABILITY_H: 27,
});

export const TEST_NAMES = [];
TEST_NAMES[4] = '직업흥미검사(K,중)';
TEST_NAMES[5] = '직업흥미검사(K,고)';
TEST_NAMES[6] = '직업가치관검사(일,대)';
TEST_NAMES[8] = '진로개발준비도검사';
TEST_NAMES[9] = '이공계전공적합도검사';
TEST_NAMES[10] = '주요능력효능감검사';
TEST_NAMES[17] = '직업흥미검사(H,중)';
TEST_NAMES[18] = '직업흥미검사(H,고)';
TEST_NAMES[19] = '진로흥미탐색';
TEST_NAMES[20] = '직업적성검사(중)';
TEST_NAMES[21] = '직업적성검사(고)';
TEST_NAMES[22] = '진로성숙도검사(중)';
TEST_NAMES[23] = '진로성숙도검사(고)';
TEST_NAMES[24] = '직업가치관검사(중)';
TEST_NAMES[25] = '직업가치관검사(고)';
TEST_NAMES[26] = '진로개발역량검사(중)';
TEST_NAMES[27] = '진로개발역량검사(고)';

// 검사 결과 요청 시 검사 번호별 답변 형식
const FORM_TYPE = Object.freeze({
  A: { prefix: 'A', infix: '=', postfix: ' ' },
  B: { prefix: 'B', infix: '=', postfix: ' ' },
  NORMAL: { prefix: '', infix: '=', postfix: ' ' },
  NONE: { prefix: '', infix: '', postfix: ',' },
});

export const RESULT_ANSWER_FORM = {
  4: FORM_TYPE.A,
  5: FORM_TYPE.A,
  6: FORM_TYPE.B,
  8: FORM_TYPE.NONE,
  9: FORM_TYPE.NONE,
  10: FORM_TYPE.NONE,
  17: FORM_TYPE.A,
  18: FORM_TYPE.A,
  19: FORM_TYPE.NORMAL,
  20: FORM_TYPE.NORMAL,
  21: FORM_TYPE.NORMAL,
  22: FORM_TYPE.NORMAL,
  23: FORM_TYPE.NORMAL,
  24: FORM_TYPE.NORMAL,
  25: FORM_TYPE.NORMAL,
  26: FORM_TYPE.NORMAL,
  27: FORM_TYPE.NORMAL,
};

// TEST DUMMY
export const DUMMY = {
  qestrnSeq: 6,
  trgetSe: 100209,
  name: 'estt',
  gender: 100324,
  grade: '',
  startDtm: new Date().getTime(),
  answers:
    'B1=2 B2=4 B3=6 B4=8 B5=10 B6=12 B7=14 B8=16 B9=18 B10=20 B11=22 B12=24 B13=26 B14=28 B15=30 B16=32 B17=34 B18=36 B19=38 B20=40 B21=42 B22=44 B23=46 B24=48 B25=50 B26=52 B27=54 B28=56 ',
};
