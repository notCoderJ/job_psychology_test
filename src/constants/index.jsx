export const API_KEY = process.env.REACT_APP_API_KEY; // 직업 심리 검사 API KEY를 넣어주세요.
export const MAX_COUNT_IN_PAGE = 5;

export const SAMPLE_QUESTION = {
  questionNumber: 0,
  question: `으어어어어어어어어`,
  defaultAnswerOptions: [
    ['창의성', '1'],
    ['도전성', '2'],
  ],
};

export const QUESTION_SEQ = 6;

/*
  중: 14 ~ 16세 청소년
  고: 17 ~ 19세 청소년
*/
export const TARGET_SEQ = {
  초등학생: 100205,
  중학생: 100206,
  고등학생: 100207,
  대학생: 100208,
  일반: 100209,
  '일반(학부모)': 100210,
  교사: 100214,
  '교사(상담)': 100215,
}; // 임시 코드

export const GENDER_TO_STRING = { 100323: '남성', 100324: '여성' };

// 검사 결과 요청 시 검사 번호별 답변 형식
const FORM_TYPE = Object.freeze({
  A: { prefix: 'A', infix: '=', postfix: ' ' },
  B: { prefix: 'B', infix: '=', postfix: ' ' },
  NORMAL: { prefix: '', infix: '=', postfix: ' ' },
  NONE: { prefix: '', infix: '', postfix: ',' },
});

export const RESULT_REQUEST_ANSWER_FORM = {
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
