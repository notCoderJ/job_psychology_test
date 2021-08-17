import { useReducer } from 'react';
import { actions, actionCreators } from '../actions/psyexam_actions';
import { SAMPLE_QUESTION } from '../sample/sample';

const initialState = {
    name: "",
    gender: "",
    grade: "",
    email: "",
    questrnSeq: "",
    startDtm: new Date().getTime(),
    questions: [SAMPLE_QUESTION],
    answers: [],
}

const { LOAD_QUESTIONS, SAVE_NAME, SAVE_GENDER, SAVE_ANSWERS } = actions;

const reducer = (state, action) => {
    switch(action.type) {
        case LOAD_QUESTIONS:
            const { questions } = action.payload;
            if (!Array.isArray(questions)) {
                return state;
            }
            return {...state, questions: state.questions.concat(questions) };
        case SAVE_NAME:
            const { name } = action.payload;
            return { ...state, name };
        case SAVE_GENDER:
            const { gender } = action.payload;
            return { ...state, gender };
        case SAVE_ANSWERS:
            const { qitemNo, answerScore } = action.payload;
            const newAnswer = [ ...state.answers ];
            newAnswer[qitemNo] = answerScore;
            return { ...state, answers: newAnswer };
        default:
            return state;
    }
}

export const usePsyExamState = () => {
    const [ state, dispatch ] = useReducer(reducer, initialState);

    const loadQuestions = (questions) => dispatch(actionCreators.loadQuestions(questions));
    const saveName = (name) => dispatch(actionCreators.saveName(name));
    const saveGender = (gender) => dispatch(actionCreators.saveGender(gender));
    const saveAnswers = (qitemNo, answerScore) => dispatch(actionCreators.saveAnswers(qitemNo, answerScore));

    return { state, loadQuestions, saveName, saveGender, saveAnswers };
}