import { useCallback, useEffect } from 'react';
import { connect } from 'react-redux';
import actionCreators from '../../actions';

// const name = `qitemNo${prefix(number)}-option`
// const id = `${name}${prefix(idx + 1)}`;
// const score = questionItem[`${ans}Score${prefix(idx + 1)}`]
// const option = questionItem[`${ans}${prefix(idx + 1)}`]

const Question = ({ number, questionItem, answerOptions, answer, saveAnswers }) => {
    const prefix = useCallback((num) => num < 10 ? `0${num}` : `${num}`, []);

    // TEST CODE
    useEffect(() => {
        console.log("mount", number);
        // console.log(answer);

        return () => console.log("unmount", number);
    }, []);

    return (
        <fieldset>
            <legend>{questionItem.question.split('<br/>').map((line) => <>{line}<br/></>)}</legend>
            {answerOptions
                .map((ansOpt, idx) => {
                    const name = `qitemNo${prefix(number)}-option`
                    const id = `${name}${prefix(idx + 1)}`;

                    return (
                        <label
                            htmlFor={id}
                            key={id}
                        >{ansOpt[0]}
                            <input
                                id={id}
                                key={id}
                                name={name}
                                type="radio"
                                value={ansOpt[1]}
                                defaultChecked={answer === ansOpt[1]}
                                onClick={(e) => saveAnswers(number, e.target.value)}
                            >
                            </input>
                        </label>
                    );
                })
            }
        </fieldset>
    );//TODO: key redefine
}

const mapStatToProps = (state, ownProps) => {
    const { questions, answers } = state;
    const questionItem = questions[ownProps.number];
    const { answerOptions } = questionItem;
    const answer = answers[ownProps.number];

    return { questionItem, answerOptions, answer }
}

const mapDispatchToProps = (dispatch) => {
    return {
        saveAnswers: (qitemNo, answerScore) => dispatch(actionCreators.saveAnswers(qitemNo, answerScore)),
    };
}

const QuestionWrapper = connect(mapStatToProps, mapDispatchToProps)(Question);

const Questions = ({ visibleNumbers }) => {
    return <form>{visibleNumbers.map((number) => <QuestionWrapper key={number} number={number} />)}</form>;
} //TODO: key redefine

export default Questions;