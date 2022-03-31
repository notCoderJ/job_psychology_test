import { QUESTION_SEQ } from '../constants/test';
import psychologyAPI, { createURL } from './common';

const apikey = process.env.REACT_APP_API_KEY;

const testAPI = {
  getQuestions: psychologyAPI.get(createURL('test', 'questions'), {
    apikey,
    q: QUESTION_SEQ,
  }),
  getResultURL: psychologyAPI.post(createURL('test', 'report'), { apikey }),
};

export default testAPI;
