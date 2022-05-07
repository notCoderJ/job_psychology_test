import psychologyAPI, { createURL } from './common';

const resultAPI = {
  getResultData: psychologyAPI.get(createURL('result', 'report')),
  getValuesDescription: psychologyAPI.get(createURL('result', 'intrprts')),
  getJobInfoByType: (type) => {
    const urlBytype = { grade: '/jobs', major: '/majors' };
    return psychologyAPI.get(createURL('result', `value${urlBytype[type]}`));
  },
};

export default resultAPI;
