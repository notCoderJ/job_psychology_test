import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  answerCount: 0,
  answers: [],
};

const answerSlice = createSlice({
  name: 'answer',
  initialState,
  reducers: {
    saveAnswer(state, action) {
      const { questionNumber, answerScore } = action.payload;
      state.answerCount += state.answers[questionNumber] ? 0 : 1;
      state.answers[questionNumber] = answerScore;
    },
  },
});

export const answerActionCreator = answerSlice.actions;
export default answerSlice.reducer;
