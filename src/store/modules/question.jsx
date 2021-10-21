import { createSlice, createSelector } from '@reduxjs/toolkit';
import {
  MAX_PAGE_QUESTION_COUNT,
  QUESTION_SEQ,
  SAMPLE_QUESTION,
} from '../../constants/test';
import { reducerState } from '../../utils/reducer';

const EXAMPLE_COUNT = 1;
const initialState = {
  sectionCount: 0,
  questionSeq: QUESTION_SEQ,
  questions: reducerState.initial([]),
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
    reqQuestions(state, action) {
      state.questions = action.payload;
    },
    loadQuestions(state, action) {
      const { loading, data, error } = action.payload;
      state.questions.loading = loading;
      state.questions.error = error;
      if (!Array.isArray(data) || data.length === 0) {
        return;
      }

      state.sectionCount +=
        Math.ceil(data.length / MAX_PAGE_QUESTION_COUNT) + EXAMPLE_COUNT;
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
  },
});

// Define Selectors
const isQuestionLoading = (state) => state.question.questions.loading;
const errorQuestionLoad = (state) => state.question.questions.error;
const getStartDate = (state) => state.question.startDate;
const getQuestionSeq = (state) => state.question.questionSeq;
const getQuestions = (state) => state.question.questions.data;
const getSectionCount = (state) => state.question.sectionCount;
const getQuestionCount = createSelector([getQuestions], (questions) =>
  !questions ? 0 : questions.length - 1,
);
const getQuestion = (number) => (state) =>
  state.question.questions.data[number];

const getQuestionsBySection = createSelector(
  [getQuestionCount, getSectionCount],
  (questionCount, sectionCount) => {
    if (!questionCount) {
      return [[0]];
    }

    const questionNumbers = [...Array(questionCount).keys()].map(
      (num) => num + 1,
    );
    return [[0]].concat(
      [...Array(sectionCount - 1).keys()].map((index) =>
        questionNumbers.slice(
          MAX_PAGE_QUESTION_COUNT * index,
          MAX_PAGE_QUESTION_COUNT * (index + 1),
        ),
      ),
    );
  },
);

const getQuestionNumbers = (section) =>
  createSelector(
    [getQuestionsBySection],
    (questionsBySection) => questionsBySection[section],
  );

export const questionActions = questionSlice.actions;
export const questionSelector = {
  isQuestionLoading,
  errorQuestionLoad,
  getStartDate,
  getQuestionSeq,
  getQuestions,
  getSectionCount,
  getQuestionCount,
  getQuestionNumbers,
  getQuestion,
};
export default questionSlice.reducer;
