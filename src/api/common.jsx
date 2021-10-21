import axios from 'axios';

const API_BASE_URL = 'https://www.career.go.kr/inspct';

export const createBaseURL = (type) => {
  const URL = { test: '/openapi/test', result: '/api/psycho' };
  return `${API_BASE_URL}${URL[type]}`;
};

const commonAPI =
  (method) =>
  (timeout = 1000) =>
  (baseURL) =>
  (url) =>
  (preData) =>
  async (data) => {
    try {
      const response = await axios({
        baseURL,
        url,
        method,
        headers: { 'Content-Type': 'application/json' },
        params:
          method === 'get'
            ? {
                ...preData,
                ...data,
              }
            : {},
        data:
          method !== 'get'
            ? {
                ...preData,
                ...data,
              }
            : {},
        timeout,
      });

      const normal = /^2[0-9]{2}$/;
      if (!normal.test(response.status)) {
        throw new Error(response.status);
      }
      return response.data;
    } catch (e) {
      throw new Error(e);
    }
  };

const psychologyAPI = {
  get: commonAPI('get')(),
  post: commonAPI('post')(),
};

export default psychologyAPI;
