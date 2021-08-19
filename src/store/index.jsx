import { createStore } from 'redux';
import { QUESTION_SEQ } from '../api';
import reducer from './reducer';
import { SAMPLE_QUESTION, TARGET_SEQ } from '../constants';
// import { createSlice } from '@reduxjs/toolkit';

// TODO: questrnSeq, trgetSe값 변경가능하게 추가하자!(현재 임시)
const initialState = {
  name: '',
  gender: '',
  grade: '',
  email: '',
  targetSeq: TARGET_SEQ['일반'],

  isLoaded: false,
  lastPageIndex: 0,
  questionSeq: QUESTION_SEQ,
  questions: [SAMPLE_QUESTION],
  startDate: new Date().getTime(),

  answers: [],
  isDark: true,
};

const store = createStore(reducer, initialState);

export default store;
