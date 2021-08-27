import axios from 'axios';
import { createBaseURL } from '../utils';
// import { API_KEY, QUESTION_SEQ } from '../constants';

const api = axios.create({
  baseURL: createBaseURL('result'),
  headers: {
    'Content-Type': 'application/json',
  },
});

// TODO: interceptor 처리
const getResultData = async (seq) => {
  try {
    const res = await api.get('/report', { params: { seq } });

    if (res.status === 200) {
      return res.data;
    }

    throw new Error(res.statusText);
  } catch (err) {
    throw new Error(err);
  }
};

const getValuesDescription = async (questionSeq) => {
  try {
    const res = await api.get('/intrprts', {
      params: {
        qestnrseq: questionSeq,
      },
    });

    if (res.status === 200) {
      return res.data;
    }

    throw new Error(res.statusText);
  } catch (err) {
    throw new Error(err);
  }
};

// TODO: api들 interceptor 처리
const getAverageJobInfoByType = async (type, [...highScore]) => {
  const urlBytype = { grade: '/jobs', major: '/majors' };
  try {
    const res = await api.get(`/value${urlBytype[type]}`, {
      params: {
        no1: highScore[0],
        no2: highScore[1],
      },
    });

    if (res.status === 200) {
      return res.data;
    }

    throw new Error(res.statusText);
  } catch (err) {
    throw new Error(err);
  }
};

const resultAPI = {
  getResultData,
  getAverageJobInfoByType,
  getValuesDescription,
};

export default resultAPI;
