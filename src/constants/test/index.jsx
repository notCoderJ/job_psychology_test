export const MAX_PAGE_QUESTION_COUNT = 5;

export const SAMPLE_DESCRIPTION =
  '직업과 관련된 두개의 가치 중에서 자기에게 더 중요한 가치에 표시하세요. 가치의 뜻을 잘모르겠다면 문항 아래에 있는 가치의 설명을 확인해보세요.';
export const SAMPLE_QUESTION = {
  questionNumber: 0,
  description: '으어어어어어어어어',
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
export const DUMMY = [];
// 중딩 - 4
DUMMY[0] = {
  qestrnSeq: 4,
  trgetSe: 100206,
  name: 'estt',
  gender: 100324,
  grade: '2',
  startDtm: new Date().getTime(),
  answers:
    'A1=4 A2=4 A3=4 A4=4 A5=4 A6=4 A7=4 A8=4 A9=4 A10=4 A11=4 A12=4 A13=4 A14=4 A15=4 A16=4 A17=4 A18=4 A19=4 A20=4 A21=4 A22=4 A23=4 A24=4 A25=4 A26=4 A27=4 A28=4 A29=4 A30=4 A31=4 A32=4 A33=4 A34=4 A35=4 A36=4 A37=4 A38=4 A39=4 A40=4 A41=4 A42=4 A43=4 A44=4 A45=4 A46=4 A47=4 A48=4 A49=4 A50=4 A51=4 A52=4 A53=4 A54=4 A55=4 A56=4 A57=4 A58=4 A59=4 A60=4 A61=4 A62=4 A63=4 A64=4 A65=4 A66=4 A67=4 A68=4 A69=4 A70=4 A71=4 A72=4 A73=4 A74=4 A75=4 A76=4 A77=4 A78=4 A79=4 A80=4 A81=4 A82=4 A83=4 A84=4 A85=4 A86=4 A87=4 A88=4 A89=4 A90=4 A91=4 A92=4 A93=4 A94=4 A95=4 A96=4 ',
};

// 고딩 - 5
DUMMY[1] = {
  qestrnSeq: 5,
  trgetSe: 100207,
  name: 'estt',
  gender: 100324,
  grade: '2',
  startDtm: new Date().getTime(),
  answers:
    'A1=4 A2=4 A3=4 A4=4 A5=4 A6=4 A7=4 A8=4 A9=4 A10=4 A11=4 A12=4 A13=4 A14=4 A15=4 A16=4 A17=4 A18=4 A19=4 A20=4 A21=4 A22=4 A23=4 A24=4 A25=4 A26=4 A27=4 A28=4 A29=4 A30=4 A31=4 A32=4 A33=4 A34=4 A35=4 A36=4 A37=4 A38=4 A39=4 A40=4 A41=4 A42=4 A43=4 A44=4 A45=4 A46=4 A47=4 A48=4 A49=4 A50=4 A51=4 A52=4 A53=4 A54=4 A55=4 A56=4 A57=4 A58=4 A59=4 A60=4 A61=4 A62=4 A63=4 A64=4 A65=4 A66=4 A67=4 A68=4 A69=4 A70=4 A71=4 A72=4 A73=4 A74=4 A75=4 A76=4 A77=4 A78=4 A79=4 A80=4 A81=4 A82=4 A83=4 A84=4 A85=4 A86=4 A87=4 A88=4 A89=4 A90=4 A91=4 A92=4 A93=4 A94=4 A95=4 A96=4 ',
};

// 진로머시기 8 === 노답
DUMMY[2] = {
  qestrnSeq: 8,
  trgetSe: 100208,
  name: 'estt',
  gender: 100324,
  grade: '2',
  startDtm: new Date().getTime(),
  answers:
    '15,25,35,45,55,65,75,85,95,105,115,125,135,145,155,165,175,185,195,205,215,225,235,245,255,265,275,285,295,305,315,325,335,345,355,',
};

// 이공계 9
DUMMY[3] = {
  qestrnSeq: 9,
  trgetSe: 100209,
  name: 'estt',
  gender: 100324,
  grade: '',
  startDtm: new Date().getTime(),
  answers:
    '15,25,35,45,55,65,75,85,95,105,115,125,135,145,155,165,175,185,195,205,215,225,235,245,255,265,275,285,295,305,315,325,335,345,355,365,375,385,395,405,415,425,435,445,455,465,475,485,495,505,515,525,535,545,555,565,575,585,595,605,615,625,635,645,655,665,675,685,695,705,715,725,735,745,755,765,775,785,795,805,815,825,835,845,855,865,875,885,895,905,915,925,935,945,955,965,975,985,995,1005,1015,1025,1035,1045,1055,1065,1072,1085,1095,1105,1115,1125,1135,1145,1155,1165,1175,1185,1195,1205,1215,1225,1235,1245,1255,1265,1275,1285,1295,1305,1315,1325,1335,1345,1355,1365,1375,1385,1395,1405,1415,1425,1435,1445,1455,1465,1475,1485,1495,1505,1515,1525,1535,1545,1555,1565,1575,1585,1595,1605,1615,1625,1635,1645,1655,1665,1675,1685,1695,1705,1715,1725,1735,1745,1755,1765,1775,1785,1795,1805,1815,1825,1835,1845,1855,1865,1875,1885,1895,1905,1915,1925,1935,1945,1955,1965,1975,1985,1995,2005,2015,2025,2035,2045,2055,2065,2075,2085,2095,2105,2115,2125,2135,2142',
};

// 주요능력 10
DUMMY[4] = {
  qestrnSeq: 10,
  trgetSe: 100209,
  name: 'estt',
  gender: 100324,
  grade: '',
  startDtm: new Date().getTime(),
  answers:
    '15,25,35,45,55,65,75,85,95,105,115,125,135,145,155,165,175,185,195,205,215,225,235,245,255,265,275,285,295,305,315,325,335,345,355,365,375,385,395,405,415,425,435,445,455,465,474,485,495,',
};

// 직업 가치관** 6
DUMMY[5] = {
  qestrnSeq: 6,
  trgetSe: 100209,
  name: 'estt',
  gender: 100324,
  grade: '',
  startDtm: new Date().getTime(),
  answers:
    'B1=2 B2=4 B3=6 B4=8 B5=10 B6=12 B7=14 B8=16 B9=18 B10=20 B11=22 B12=24 B13=26 B14=28 B15=30 B16=32 B17=34 B18=36 B19=38 B20=40 B21=42 B22=44 B23=46 B24=48 B25=50 B26=52 B27=54 B28=56 ',
};

// 직업 중딩 - 17

// 직업 고딩 - 18

// 진로 흥미 - 19

// 직업 적성 중딩 - 20

// 직업 적성 고딩 - 21

// 직업성숙 중딩 - 22

// 직업성숙 고딩 - 23

// 진로개발 중딩 - 26

// 진로개발 고딩 - 27
