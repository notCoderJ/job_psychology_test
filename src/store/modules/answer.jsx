import { createSlice, createSelector } from '@reduxjs/toolkit';

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
const getAnswer = (number) => (state) =>
  state.answer.answers[number] ? state.answer.answers[number] : null;
const getAnswerCount = (state) => state.answer.answerCount;
const getActualAnswerCount = createSelector([getAnswerCount], (answerCount) =>
  answerCount > 0 ? answerCount - 1 : 0,
);

export const answerActions = answerSlice.actions;
export const answerSelector = {
  getAnswers,
  getAnswer,
  getAnswerCount,
  getActualAnswerCount,
};
export default answerSlice.reducer;
