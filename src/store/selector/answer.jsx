import { createSelector } from '@reduxjs/toolkit';

const ANSWER = Object.freeze({
  DESCRIPTION: 0,
  SCORE: 1,
});

const getAnswers = (state) => state.answer.answers;
const getAnswer = (number) => (state) =>
  state.answer.answers[number]
    ? state.answer.answers[number][ANSWER.SCORE]
    : null;
const getAnswerCount = (state) => state.answer.answerCount;
const getActualAnswerCount = createSelector([getAnswerCount], (answerCount) =>
  answerCount > 0 ? answerCount - 1 : 0,
);

const answerSelector = {
  getAnswers,
  getAnswer,
  getAnswerCount,
  getActualAnswerCount,
};

export default answerSelector;
