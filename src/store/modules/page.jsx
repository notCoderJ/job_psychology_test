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
    initSection() {
      return initialState;
    },
    updateSection(state, action) {
      state.currentSection = action.payload;
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
