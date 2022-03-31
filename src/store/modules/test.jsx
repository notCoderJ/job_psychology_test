import { createSlice, createSelector } from '@reduxjs/toolkit';
import { SAMPLE_QUESTION } from '../../constants/test';
import { reducerState } from '../../utils/reducer';

const MAX_PAGE_QUESTION_COUNT = 5;
const EXAMPLE_COUNT = 1;
const initialState = {
  questions: reducerState.initial([]),
  questionCount: 0,
  answers: [],
  answerCount: 0,
};

// Define Actions & Reducer
const testSlice = createSlice({
  name: 'test',
  initialState,
  reducers: {
    reqQuestions(state, action) {
      state.questions = action.payload;
    },
    loadQuestions(state, action) {
      const { loading, data, error } = action.payload;
      state.questions.loading = loading;
      state.questions.error = error;
      if (!data) return;

      state.questionCount = data.length;
      state.questions.data = [SAMPLE_QUESTION].concat(
        data.map(
          ({
            question,
            qitemNo,
            answer01,
            answer02,
            answer03,
            answer04,
            answerScore01,
            answerScore02,
          }) => ({
            questionNumber: qitemNo,
            description: question,
            defaultAnswerOptions: [
              {
                option: answer01,
                score: answerScore01,
                optionDesc: answer03,
              },
              {
                option: answer02,
                score: answerScore02,
                optionDesc: answer04,
              },
            ],
          }),
        ),
      );
    },
    saveAnswer(state, action) {
      const { questionNumber, answerScore } = action.payload;
      state.answerCount += state.answers[questionNumber] ? 0 : 1;
      state.answers[questionNumber] = answerScore;
    },
  },
});

// Define Selectors
// Question Selectors
const isQuestionLoading = (state) => state.test.questions.loading;
const errorQuestionLoad = (state) => state.test.questions.error;
const getQuestions = (state) => state.test.questions.data;
const getQuestionCount = (state) => state.test.questionCount;
const getQuestion = (number) => (state) => state.test.questions.data[number];

const getPageCount = createSelector([getQuestionCount], (questionCount) => {
  if (questionCount === 0) {
    return 0;
  }
  return Math.ceil(questionCount / MAX_PAGE_QUESTION_COUNT) + EXAMPLE_COUNT;
});

const getQuestionsByPage = createSelector(
  [getQuestionCount, getPageCount],
  (questionCount, pageCount) => {
    if (!questionCount) {
      return [[]];
    }

    const questionNumbers = [...Array(questionCount).keys()].map(
      (num) => num + 1,
    );
    return [[0]].concat(
      [...Array(pageCount - EXAMPLE_COUNT).keys()].map((index) =>
        questionNumbers.slice(
          MAX_PAGE_QUESTION_COUNT * index,
          MAX_PAGE_QUESTION_COUNT * (index + 1),
        ),
      ),
    );
  },
);

const getQuestionNumbers = (page) =>
  createSelector([getQuestionsByPage], (questions) => questions[page]);

// Answer Selectors
const getAnswers = (state) => state.test.answers;
const getAnswerCount = (state) => state.test.answerCount;
const getAnswer = (number) => (state) => state.test.answers[number];
const isPageAnswered = (questions) => (state) => {
  if (!questions || questions.length === 0) {
    return false;
  }
  return questions.filter((number) => !state.test.answers[number]).length === 0;
};

// Progress Bar Selector
const getCurrentPercentage = createSelector(
  [getQuestionCount, getAnswerCount],
  (questionCount, answerCount) => {
    if (answerCount <= 1 || !questionCount) {
      return 0;
    }

    const floatPercent = ((answerCount - 1) / questionCount) * 100;
    return floatPercent > 99
      ? Math.floor(floatPercent)
      : Math.ceil(floatPercent);
  },
);

export const testActions = testSlice.actions;
export const testSelector = {
  isQuestionLoading,
  errorQuestionLoad,
  getQuestions,
  getPageCount,
  getQuestionCount,
  getQuestionNumbers,
  getQuestion,
  getAnswers,
  getAnswerCount,
  getAnswer,
  isPageAnswered,
  getCurrentPercentage,
};
export default testSlice.reducer;
