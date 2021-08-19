import { createStore } from 'redux';
import { QUESTION_SEQ } from '../api';
import reducer from '../reducer';
import { SAMPLE_QUESTION } from '../sample';
import { TARGET_SEQ } from '../utils/constants';

// TODO: questrnSeq, trgetSe값 변경가능하게 추가하자!(현재 임시)
const initialState = {
  name: '',
  gender: '',
  grade: '',
  email: '',
  questrnSeq: QUESTION_SEQ,
  trgetSe: TARGET_SEQ['일반'],
  startDtm: new Date().getTime(),
  questions: [SAMPLE_QUESTION],
  answers: [],
  isDark: true,
};

const store = createStore(reducer, initialState);

export default store;
