import { actions } from '../actions';


const { LOAD_QUESTIONS, SAVE_NAME, SAVE_GENDER, SAVE_ANSWERS } = actions;

const reducer = (state, action) => {
    switch(action.type) {
        case LOAD_QUESTIONS:
            const { questions } = action.payload;
            if (!Array.isArray(questions)) {
                return state;
            }

            const newQuestions = questions.map((qitem) => {
                const { question, qitemNo, ...rest } = qitem;
                const newQItem = Object
                                    .keys(rest)
                                    .filter((key) => key.search(/^answerScore[0-9]*/) !== -1 && rest[key])
                                    .reduce((prev, answerScore) => {
                                        const answer = answerScore.replace("Score", "");
                                        return { ...prev, answerOptions: prev.answerOptions.concat([[rest[answer], rest[answerScore]]]) };
                                    }, { question, qitemNo, answerOptions: [] });
                return newQItem;
            });
            
            return {...state, questions: state.questions.concat(newQuestions) };

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

export default reducer;