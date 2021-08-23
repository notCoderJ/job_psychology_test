import { MAX_COUNT_IN_PAGE } from '../../constants';
import { actions } from '../actions';

const {
  CHANGE_MODE, //
  LOAD_QUESTIONS,
  SAVE_NAME,
  SAVE_GENDER,
  SAVE_ANSWERS,
} = actions;

const reducer = (state, action) => {
  switch (action.type) {
    case CHANGE_MODE:
      return { ...state, isDark: !state.isDark };
    case LOAD_QUESTIONS:
      const { questions } = action.payload;
      if (!Array.isArray(questions) || questions.length === 0) {
        return { ...state, isLoaded: false };
      }

      const lastPageIndex = Math.ceil(questions.length / MAX_COUNT_IN_PAGE);
      const processedQuestions = questions.map((questionItem) => {
        const { question, qitemNo, ...rest } = questionItem;
        const fixedQuestion = question.replace('<br/>', '');
        const newQuestionItem = Object.keys(rest)
          .filter(
            (itemName) =>
              itemName.search(/^answerScore/) !== -1 && rest[itemName],
          )
          .reduce(
            (prev, answerScore) => {
              const answer = answerScore.replace('Score', '');
              return {
                ...prev,
                defaultAnswerOptions: prev.defaultAnswerOptions.concat([
                  [rest[answer], rest[answerScore]],
                ]),
              };
            },
            {
              question: fixedQuestion,
              questionNumber: qitemNo,
              defaultAnswerOptions: [],
            },
          );
        return newQuestionItem;
      });

      return {
        ...state,
        isLoaded: true,
        lastPageIndex,
        questions: state.questions.concat(processedQuestions),
      };

    case SAVE_NAME:
      const { name } = action.payload;
      return { ...state, name };

    case SAVE_GENDER:
      const { gender } = action.payload;
      return { ...state, gender };

    case SAVE_ANSWERS:
      const { questionNumber, answerScore } = action.payload;
      const newAnswer = [...state.answers];
      newAnswer[questionNumber] = answerScore;
      return {
        ...state,
        answerCount: state.answers[questionNumber]
          ? state.answerCount
          : state.answerCount + 1,
        answers: newAnswer,
      };

    default:
      return state;
  }
};

export default reducer;
