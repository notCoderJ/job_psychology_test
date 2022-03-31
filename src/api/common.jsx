import axios from 'axios';

const API_BASE_URL = 'https://www.career.go.kr/inspct';

export const createURL = (type, url) =>
  type === 'test' ? `/openapi/test/${url}` : `/api/psycho/${url}`;

const commonAPI = (method) => (url, preData) => async (data) => {
  try {
    const response = await axios({
      baseURL: API_BASE_URL,
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
      timeout: 1000,
    });

    return response.data;
  } catch (e) {
    throw new Error(e);
  }
};

const psychologyAPI = {
  get: commonAPI('get'),
  post: commonAPI('post'),
};

export default psychologyAPI;
