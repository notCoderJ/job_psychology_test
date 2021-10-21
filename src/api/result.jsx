import psychologyAPI, { createBaseURL } from './common';

const BASE_URL = createBaseURL('result');

// getResultData
// { params: { seq } }

// getValuesDescription
// params: {
//   qestnrseq: questionSeq,
// },

// getAverageJobInfoByType
// [...highScore]
// params: {
//   no1: highScore[0],
//   no2: highScore[1],
// },

const resultAPI = {
  getResultData: psychologyAPI.get(BASE_URL)('/report')(),
  getValuesDescription: psychologyAPI.get(BASE_URL)('/intrprts')(),
  getAverageJobInfoByType: (type) => {
    const urlBytype = { grade: '/jobs', major: '/majors' };
    return psychologyAPI.get(BASE_URL)(`/value${urlBytype[type]}`)();
  },
};

export default resultAPI;
