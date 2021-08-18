import { createStore } from 'redux';
import reducer from '../reducer';
import { SAMPLE_QUESTION } from '../sample';

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

const store = createStore(reducer, initialState);

export default store;