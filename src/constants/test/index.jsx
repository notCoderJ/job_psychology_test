export const MAX_PAGE_QUESTION_COUNT = 5;

export const SAMPLE_DESCRIPTION =
  '직업과 관련된 두개의 가치 중에서 자기에게 더 중요한 가치에 표시하세요. 가치의 뜻을 잘모르겠다면 문항 아래에 있는 가치의 설명을 확인해보세요.';
export const SAMPLE_QUESTION = {
  questionNumber: 0,
  description: '두 개 가치 중에 자신에게 더 중요한 가치를 선택하세요.',
  defaultAnswerOptions: [
    { option: '보수', score: '1' },
    { option: '사회적 인정', score: '2' },
  ],
};

export const QUESTION_SEQ = 6;

// 검사 결과 요청 시 검사 번호별 답변 형식
const FORM_TYPE = Object.freeze({
  A: { prefix: 'A', infix: '=', postfix: ' ' },
  B: { prefix: 'B', infix: '=', postfix: ' ' },
  NORMAL: { prefix: '', infix: '=', postfix: ' ' },
  NONE: { prefix: '', infix: '', postfix: ',' },
});
export const RESULT_ANSWER_FORM = {
  6: FORM_TYPE.B,
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
