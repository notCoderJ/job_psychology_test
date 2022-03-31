import psychologyAPI, { createURL } from './common';

const resultAPI = {
  getResultData: psychologyAPI.get(createURL('result', 'report')),
  getValuesDescription: psychologyAPI.get(createURL('result', 'intrprts')),
  getAverageJobInfoByType: (type) => {
    const urlBytype = { grade: '/jobs', major: '/majors' };
    return (highValues) =>
      psychologyAPI.get(createURL('result', `/value${urlBytype[type]}`), {
        no1: highValues[0],
        no2: highValues[1],
      });
  },
};

export default resultAPI;
