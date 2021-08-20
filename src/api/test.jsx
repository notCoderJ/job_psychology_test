import axios from 'axios';
import { API_KEY, QUESTION_SEQ } from '../constants';

const BASE_URL = 'https://www.career.go.kr/inspct/openapi/test';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const getQuestions = async () => {
  try {
    const res = await api.get('/questions', {
      params: {
        apikey: API_KEY,
        q: QUESTION_SEQ,
      },
    });
    if (res.data.SUCC_YN === 'Y') {
      return res.data.RESULT;
    }

    throw new Error(res.data.ERROR_REASON);
  } catch (err) {
    throw new Error(err);
  }
};

const getResultURL = async (data) => {
  try {
    const res = await api.post(
      '/report',
      JSON.stringify({ apikey: API_KEY, ...data }),
    );
    if (res.data.SUCC_YN === 'Y') {
      return res.data.RESULT;
    }

    throw new Error(res.data.ERROR_REASON);
  } catch (err) {
    throw new Error(err);
  }
};

const testAPI = { getQuestions, getResultURL };

export default testAPI;
