import { createSelector } from '@reduxjs/toolkit';
import { MAX_PAGE_QUESTION_COUNT } from '../../constants/test';
import answerSelector from './answer';
import questionSelector from './question';
import userSelector from './user';

const getCurrentPageIndex = (state) => state.psychologyTest.currentPageIndex;

const getPsyChologyTestActualPageInfo = createSelector(
  [questionSelector.getActualQuestionCount],
  (questionCount) => ({
    questionNumbers: Array(questionCount)
      .fill()
      .map((_, index) => index + 1),
    pageCount: Math.ceil(questionCount / MAX_PAGE_QUESTION_COUNT),
  }),
);

const getPageIndex = createSelector(
  [getCurrentPageIndex, getPsyChologyTestActualPageInfo],
  (currentPageIndex, { pageCount }) => ({
    currentPageIndex,
    lastPageIndex: pageCount,
  }),
);

const getTotalPageQuestionNumbers = createSelector(
  [getPsyChologyTestActualPageInfo],
  (pageInfo) => {
    const { questionNumbers, pageCount } = pageInfo;
    return pageCount === 0
      ? [[0]]
      : [
          [0],
          ...Array(pageCount)
            .fill()
            .map((_, index) =>
              questionNumbers.slice(
                MAX_PAGE_QUESTION_COUNT * index,
                MAX_PAGE_QUESTION_COUNT * (index + 1),
              ),
            ),
        ];
  },
);

const getVisibleQuestionNumbers = createSelector(
  [getCurrentPageIndex, getTotalPageQuestionNumbers],
  (currentPageIndex, totalPageQuestions) =>
    totalPageQuestions[currentPageIndex],
);

const getMarkedAnswerInfo = createSelector(
  [answerSelector.getAnswers, getTotalPageQuestionNumbers],
  (answers, totalPageQuestions) =>
    totalPageQuestions.map(
      (numbers) => numbers.filter((number) => !answers[number]).length === 0,
    ),
);

const isNextDisabled = createSelector(
  [
    getCurrentPageIndex,
    questionSelector.isQuestionLoaded,
    userSelector.isUserInvalid,
    getMarkedAnswerInfo,
  ],
  (currentPageIndex, isQuestionLoaded, isUserInvalid, markedAnswerInfo) => {
    if (currentPageIndex < 0) {
      return !isQuestionLoaded || isUserInvalid;
    }

    return !markedAnswerInfo[currentPageIndex];
  },
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

const psychologyTestSelector = {
  getCurrentPageIndex,
  getPageIndex,
  getVisibleQuestionNumbers,
  isNextDisabled,
  getCurrentPercentage,
};

export default psychologyTestSelector;
