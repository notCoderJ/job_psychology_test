import { createSelector } from '@reduxjs/toolkit';
import answerSelector from './answer';

const isQuestionLoaded = (state) => state.question.isQuestionLoaded;
const getStartDate = (state) => state.question.startDate;
const getQuestionSeq = (state) => state.question.questionSeq;
const getQuestions = (state) => state.question.questions;
const getQuestion = (number) => (state) => state.question.questions[number];
const getTotalQuestionCount = (state) => state.question.questions.length;
const getActualQuestionCount = createSelector(
  [getTotalQuestionCount],
  (questionCount) => (questionCount > 1 ? questionCount - 1 : 0),
);

const getQeustionInfo = (number) =>
  createSelector(
    [getQuestion(number), answerSelector.getAnswer(number)],
    (question, answer) => ({
      description: question.description,
      defaultAnswerOptions: question.defaultAnswerOptions,
      answer,
    }),
  );

const questionSelector = {
  isQuestionLoaded,
  getQuestionSeq,
  getQuestions,
  getTotalQuestionCount,
  getActualQuestionCount,
  getStartDate,
  getQeustionInfo,
};

export default questionSelector;
