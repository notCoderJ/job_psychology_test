import { createSlice, createSelector } from '@reduxjs/toolkit';
import { QUESTION_SEQ, SAMPLE_QUESTION } from '../../constants/test';
import { answerSelector } from './answer';

const initialState = {
  isQuestionLoaded: false,
  questionSeq: QUESTION_SEQ,
  questions: [SAMPLE_QUESTION],
  startDate: new Date().getTime(),
};

// Define Actions & Reducer
const questionSlice = createSlice({
  name: 'question',
  initialState,
  reducers: {
    initQuestion() {
      return initialState;
    },
    loadQuestions(state, action) {
      const questions = action.payload;
      if (!Array.isArray(questions) || questions.length === 0) {
        state.isQuestionLoaded = false;
        return;
      }

      questions.forEach((questionItem) => {
        const { question, qitemNo, ...rest } = questionItem;
        const description = question.replace('<br/>', '');

        // TODO: answer를 다 불러오고 그다음 answerScore가 null이 아닌 걸 뽑고 남은건 보기로
        const defaultAnswerOptions = Object.keys(rest)
          .filter(
            (itemName) =>
              itemName.search(/^answerScore/) !== -1 && rest[itemName],
          )
          .map((answerScore) => ({
            description: rest[answerScore.replace('Score', '')],
            score: rest[answerScore],
          }));

        state.questions.push({
          questionNumber: qitemNo,
          description,
          defaultAnswerOptions,
        });
      });

      state.isQuestionLoaded = true;
    },
  },
});

// Define Selectors
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

const getQuestionNumbers = createSelector(
  [getActualQuestionCount],
  (questionCount) => {
    [...Array(questionCount).keys()].map((index) => index + 1);
  },
);
// TODO: 퀘스천 조져어어어
const getQuestionInfo = (number) =>
  createSelector(
    [getQuestion(number), answerSelector.getAnswer(number)],
    (question, answer) => ({
      description: question.description,
      defaultAnswerOptions: question.defaultAnswerOptions,
      answer,
    }),
  );

export const questionActions = questionSlice.actions;
export const questionSelector = {
  isQuestionLoaded,
  getStartDate,
  getQuestionSeq,
  getQuestions,
  getTotalQuestionCount,
  getActualQuestionCount,
  getQuestionNumbers,
  getQuestionInfo,
};
export default questionSlice.reducer;
