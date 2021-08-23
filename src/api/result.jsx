import axios from 'axios';
import { createBaseURL } from '../utils';
// import { API_KEY, QUESTION_SEQ } from '../constants';

const api = axios.create({
  baseURL: createBaseURL('result'),
  headers: {
    'Content-Type': 'application/json',
  },
});

const getResultData = async (seq) => {
  try {
    const res = await api.get('/report', {
      params: {
        seq,
      },
    });

    console.log(res);

    // Need Data
    //  1. user info (name, gender, age etc..)
    //    inspct: { nm==name, sexdstn==gender, trgetSeNm==targetNm(대상자 구분), endDtm(검사일?) } (options: email, grade )
    //  2. wonScore info
    //    result: { [wonScore,wonScore2](가치관 점수: 종사자 관련 정보 얻을 때 이용) }

    if (res.data.SUCC_YN === 'Y') {
      return res.data.RESULT;
    }

    throw new Error(res.data.ERROR_REASON);
  } catch (err) {
    throw new Error(err);
  }
};

const resultAPI = { getResultData };

export default resultAPI;
