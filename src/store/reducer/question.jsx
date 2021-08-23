import { createSlice } from '@reduxjs/toolkit';
import { QUESTION_SEQ, SAMPLE_QUESTION } from '../../constants/test';

// TODO: questrnSeq 값 변경가능하게 추가하자!(현재 임시)
const initialState = {
  isLoaded: false, // 임시 테스트
  questionSeq: QUESTION_SEQ,
  questions: [SAMPLE_QUESTION],
  startDate: new Date().getTime(),
};

const questionSlice = createSlice({
  name: 'question',
  initialState,
  reducers: {
    loadQuestions(state, action) {
      const questions = action.payload;
      if (!Array.isArray(questions) || questions.length === 0) {
        state.isLoaded = false;
        return;
      }

      state.isLoaded = true;
      questions.forEach((questionItem) => {
        const { question, qitemNo, ...rest } = questionItem;
        const description = question.replace('<br/>', '');
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
    },
  },
});

export const questionActionCreator = questionSlice.actions;
export default questionSlice.reducer;
