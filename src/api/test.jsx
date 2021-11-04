import { QUESTION_SEQ } from '../constants/test';
import psychologyAPI, { createBaseURL } from './common';

const API_KEY = process.env.REACT_APP_API_KEY;
const BASE_URL = createBaseURL('test');

const testAPI = {
  getQuestions: psychologyAPI.get(BASE_URL)('/questions')({
    apikey: API_KEY,
    q: QUESTION_SEQ,
  }),
  getResultURL: psychologyAPI.post(BASE_URL)('/report')({
    apikey: API_KEY,
  }),
};

export default testAPI;
