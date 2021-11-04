import psychologyAPI, { createBaseURL } from './common';

const BASE_URL = createBaseURL('result');

const resultAPI = {
  getResultData: psychologyAPI.get(BASE_URL)('/report')(),
  getValuesDescription: psychologyAPI.get(BASE_URL)('/intrprts')(),
  getAverageJobInfoByType: (type) => {
    const urlBytype = { grade: '/jobs', major: '/majors' };
    return (highValues) =>
      psychologyAPI.get(BASE_URL)(`/value${urlBytype[type]}`)()({
        no1: highValues[0],
        no2: highValues[1],
      });
  },
};

export default resultAPI;
