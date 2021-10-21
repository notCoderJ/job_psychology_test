import { createSlice, createSelector } from '@reduxjs/toolkit';
import { questionSelector } from './question';

const initialState = {
  answerCount: 0,
  answers: [],
};

// Define Actions & Reducer
const answerSlice = createSlice({
  name: 'answer',
  initialState,
  reducers: {
    initAnswer() {
      return initialState;
    },
    saveAnswer(state, action) {
      const { questionNumber, answerScore } = action.payload;
      state.answerCount += state.answers[questionNumber] ? 0 : 1;
      state.answers[questionNumber] = answerScore;
    },
  },
});

// Define Selectors
const getAnswers = (state) => state.answer.answers;
const getAnswerCount = (state) => state.answer.answerCount;
const getAnswer = (number) => (state) => state.answer.answers[number];

const isSectionAnswered = (section) =>
  createSelector(
    [getAnswers, questionSelector.getQuestionNumbers(section)],
    (answers, questions) =>
      questions.filter((number) => !answers[number]).length === 0,
  );

export const answerActions = answerSlice.actions;
export const answerSelector = {
  getAnswers,
  getAnswerCount,
  getAnswer,
  isSectionAnswered,
};
export default answerSlice.reducer;
