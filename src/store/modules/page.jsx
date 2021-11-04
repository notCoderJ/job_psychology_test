import { createSlice, createSelector } from '@reduxjs/toolkit';
import { answerSelector } from './answer';
import { questionSelector } from './question';

const initialState = {
  currentSection: 0,
};

// Define Actions & Reducer
const psychologyTestSlice = createSlice({
  name: 'psychologyTest',
  initialState,
  reducers: {
    movePrev(state) {
      state.currentSection -= state.currentSection === 0 ? 0 : 1;
    },
    moveNext(state, action) {
      const isLast = action.payload;
      state.currentSection += isLast ? 0 : 1;
    },
  },
});

// Define Seletors
const getCurrentSection = (state) => state.psychologyTest.currentSection;

const getCurrentPercentage = createSelector(
  [questionSelector.getQuestionCount, answerSelector.getAnswerCount],
  (questionCount, answerCount) => {
    if (!answerCount || !questionCount) {
      return 0;
    }

    const floatPercent = ((answerCount - 1) / questionCount) * 100;
    return floatPercent > 99
      ? Math.floor(floatPercent)
      : Math.ceil(floatPercent);
  },
);

export const psychologyTestActions = psychologyTestSlice.actions;
export const psychologyTestSelector = {
  getCurrentSection,
  getCurrentPercentage,
};
export default psychologyTestSlice.reducer;
