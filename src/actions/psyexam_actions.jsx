// Define actions
export const actions = Object.freeze({
    LOAD_QUESTIONS: "LOAD_QUESTIONS",
    SAVE_NAME: "SAVE_NAME",
    SAVE_GENDER: "SAVE_GENDER",
    SAVE_ANSWERS: "SAVE_ANSWERS",
});

const { LOAD_QUESTIONS, SAVE_NAME, SAVE_GENDER, SAVE_ANSWERS } = actions;

// Define action creaters
const loadQuestions = (questions) => ({ type: LOAD_QUESTIONS, payload: { questions } });
const saveName = (name) => ({ type: SAVE_NAME, payload: { name } });
const saveGender = (gender) => ({ type: SAVE_GENDER, payload: { gender } });
const saveAnswers = (qitemNo, answerScore) => ({ type: SAVE_ANSWERS, payload: { qitemNo, answerScore } });

export const actionCreators = { loadQuestions, saveName, saveGender, saveAnswers };