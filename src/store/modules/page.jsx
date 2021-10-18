import { createSlice, createSelector } from '@reduxjs/toolkit';
import { MAX_PAGE_QUESTION_COUNT } from '../../constants/test';
import { answerSelector } from './answer';
import { questionSelector } from './question';

const EXAMPLE_PAGE_COUNT = 1;
const initialState = {
  totalPageCount: 0,
  currentPageIndex: 0,
  isDark: true,
};

// Define Actions & Reducer
const psychologyTestSlice = createSlice({
  name: 'psychologyTest',
  initialState,
  reducers: {
    initPage() {
      return initialState;
    },
    updatePageCount(state, action) {
      const questionCount = action.payload ? action.payload : 0;
      state.totalPageCount =
        Math.ceil(questionCount / MAX_PAGE_QUESTION_COUNT) + EXAMPLE_PAGE_COUNT;
    },
    updatePageIndex(state, action) {
      state.currentPageIndex = action.payload;
    },
  },
});

// Define Seletors
const getTotalPageCount = (state) => state.psychologyTest.totalPageCount;
const getCurrentPageIndex = (state) => state.psychologyTest.currentPageIndex;

const getTotalPages = createSelector([getTotalPageCount], (pageCount) => [
  ...Array(pageCount).keys(),
]);

const getQuestionNumbersByPage = createSelector(
  [questionSelector.getQuestionNumbers, getTotalPageCount],
  (questionNumbers, pageCount) =>
    [...Array(pageCount).keys()].map((index) =>
      index === 0
        ? [0]
        : questionNumbers.slice(
            MAX_PAGE_QUESTION_COUNT * index,
            MAX_PAGE_QUESTION_COUNT * (index + 1),
          ),
    ),
);

const getVisibleQuestionNumbers = createSelector(
  [getCurrentPageIndex, getQuestionNumbersByPage],
  (currentPageIndex, questionsByPage) => questionsByPage[currentPageIndex],
);

const getPageAnswerLog = createSelector(
  [answerSelector.getAnswers, getQuestionNumbersByPage],
  (answers, questionsByPage) =>
    questionsByPage.map(
      (numbers) => numbers.filter((number) => !answers[number]).length === 0,
    ),
);

const isNextDisabled = createSelector(
  [getCurrentPageIndex, getPageAnswerLog],
  (currentPageIndex, pageAnswerLog) => !pageAnswerLog[currentPageIndex],
);

const getCurrentPercentage = createSelector(
  [
    questionSelector.getActualQuestionCount,
    answerSelector.getActualAnswerCount,
  ],
  (questionCount, answerCount) => {
    if (answerCount === 0) {
      return 0;
    }

    const floatPercent = (answerCount / questionCount) * 100;
    return floatPercent > 99
      ? Math.floor(floatPercent)
      : Math.ceil(floatPercent);
  },
);

export const psychologyTestActions = psychologyTestSlice.actions;
export const psychologyTestSelector = {
  getTotalPageCount,
  getCurrentPageIndex,
  getTotalPages,
  getVisibleQuestionNumbers,
  isNextDisabled,
  getCurrentPercentage,
};
export default psychologyTestSlice.reducer;
