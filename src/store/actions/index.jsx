// Define actions
export const actions = Object.freeze({
  CHANGE_MODE: 'CHANGE_MODE',
  LOAD_QUESTIONS: 'LOAD_QUESTIONS',
  SAVE_NAME: 'SAVE_NAME',
  SAVE_GENDER: 'SAVE_GENDER',
  SAVE_ANSWERS: 'SAVE_ANSWERS',
});

const {
  CHANGE_MODE, //
  LOAD_QUESTIONS,
  SAVE_NAME,
  SAVE_GENDER,
  SAVE_ANSWERS,
} = actions;

// Define action creaters
const actionCreators = {};

actionCreators.changeMode = () => ({ type: CHANGE_MODE });

actionCreators.loadQuestions = (questions) => ({
  type: LOAD_QUESTIONS,
  payload: { questions },
});

actionCreators.saveName = (name) => ({ type: SAVE_NAME, payload: { name } });

actionCreators.saveGender = (gender) => ({
  type: SAVE_GENDER,
  payload: { gender },
});

actionCreators.saveAnswers = (questionNumber, answerScore) => ({
  type: SAVE_ANSWERS,
  payload: { questionNumber, answerScore },
});

export default actionCreators;
