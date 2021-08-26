import { createSlice } from '@reduxjs/toolkit';
import { QUESTION_SEQ, SAMPLE_QUESTION } from '../../constants/test';

// TODO: 시간이 된다면 questrnSeq 값 변경가능하게 추가하자!(현재 임시)
// scores도 확장을 생각하면 변경해야 하는데 일단...fix
const initialState = {
  isQuestionLoaded: false,
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
        state.isQuestionLoaded = false;
        return;
      }

      state.isQuestionLoaded = true;
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
    },
  },
});

export const questionActionCreator = questionSlice.actions;
export default questionSlice.reducer;
