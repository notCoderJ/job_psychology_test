import { DataState, NullableOne } from 'job-test';
import { createSlice, createSelector, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/store';
import { SAMPLE_QUESTION } from '@/constants/test';

const MAX_PAGE_QUESTION_COUNT: number = 5;
const EXAMPLE_COUNT: number = 1;

export type Questions = {
  questionNumber: number;
  description: string;
  defaultAnswerOptions: AnswerOption[];
};
export type QuestionNumbers = number[];
export type Answer = string | undefined;

type AnswerPayload = {
  questionNumber: number;
  answerScore: string;
};

type AnswerOption = {
  option: string;
  score: string;
  optionDesc: string;
};

interface QuestionState {
  questions: DataState<Questions[]>;
  questionCount: number;
  answers: Answer[];
  answerCount: number;
}

const initialState: QuestionState = {
  questions: { state: 'init' },
  questionCount: 0,
  answers: [],
  answerCount: 0,
};

// Define Actions & Reducer
const testSlice = createSlice({
  name: 'test',
  initialState,
  reducers: {
    reqQuestions(state) {
      state.questions = { state: 'loading' };
    },
    //
    loadQuestions(state, action: PayloadAction<DataState<any>>) {
      const { state: loadState } = action.payload;
      if (loadState === 'fail') {
        const { reason } = action.payload;
        state.questions = { state: loadState, reason };
        return;
      }

      if (loadState === 'success') {
        const { data: loadData } = action.payload;
        const data = [SAMPLE_QUESTION].concat(
          loadData.map((question: any) => ({
            questionNumber: question.qitemNo,
            description: question.question,
            defaultAnswerOptions: [
              {
                option: question.answer01,
                score: question.answerScore01,
                optionDesc: question.answer03,
              },
              {
                option: question.answer02,
                score: question.answerScore02,
                optionDesc: question.answer04,
              },
            ],
          })),
        );

        state.questions = { state: loadState, data };
        state.questionCount = loadData.length;
      }
    },
    saveAnswer(state, action: PayloadAction<AnswerPayload>) {
      const { questionNumber, answerScore } = action.payload;
      state.answerCount += state.answers[questionNumber] ? 0 : 1;
      state.answers[questionNumber] = answerScore;
    },
  },
});

// Define Selectors
// Question Selectors
const isQuestionLoading = (state: RootState): boolean =>
  state.test.questions.state === 'loading';

const errorQuestionLoad = (state: RootState): NullableOne<string> =>
  state.test.questions.state === 'fail' ? state.test.questions.reason : null;

const getQuestions = (state: RootState): NullableOne<Questions[]> =>
  state.test.questions.state === 'success' ? state.test.questions.data : null;

const getQuestionCount = (state: RootState): number => state.test.questionCount;
const getQuestion =
  (number: number) =>
  (state: RootState): NullableOne<Questions> =>
    state.test.questions.state === 'success'
      ? state.test.questions.data[number]
      : null;

const getPageCount = createSelector(
  [getQuestionCount],
  (questionCount: number): number =>
    questionCount &&
    Math.ceil(questionCount / MAX_PAGE_QUESTION_COUNT) + EXAMPLE_COUNT,
);

const getQuestionsByPage = createSelector(
  [getQuestionCount, getPageCount],
  (
    questionCount: number,
    pageCount: number,
  ): NullableOne<QuestionNumbers[]> => {
    if (questionCount === 0) {
      return null;
    }

    const questionNumbers = [...Array(questionCount)].map((_, i) => i + 1);

    return [[0]].concat(
      [...Array(pageCount - EXAMPLE_COUNT)].map((_, i) =>
        questionNumbers.slice(
          MAX_PAGE_QUESTION_COUNT * i,
          MAX_PAGE_QUESTION_COUNT * (i + 1),
        ),
      ),
    );
  },
);

const getQuestionNumbers = (page: number) =>
  createSelector(
    [getQuestionsByPage],
    (questions: NullableOne<QuestionNumbers[]>): NullableOne<QuestionNumbers> =>
      questions && questions[page],
  );

// Answer Selectors
const getAnswers = (state: RootState): Answer[] => state.test.answers;
const getAnswerCount = (state: RootState): number => state.test.answerCount;
const getAnswer =
  (number: number) =>
  (state: RootState): Answer =>
    state.test.answers[number];
const isPageAnswered =
  (questions: NullableOne<QuestionNumbers>) =>
  (state: RootState): boolean =>
    !!questions &&
    questions.filter((number) => !state.test.answers[number]).length === 0;

// Progress Bar Selector
const getCurrentPercentage = createSelector(
  [getQuestionCount, getAnswerCount],
  (questionCount: number, answerCount: number): number => {
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
