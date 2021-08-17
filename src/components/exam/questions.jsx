import { useCallback, useEffect, useMemo } from 'react';
import { usePsyExamContext } from '../../context/psyexam_context';
import { SAMPLE_DESCRIPTION } from '../../sample/sample';

const Question = ({ number }) => {
    const { state, saveAnswers } = usePsyExamContext();
    const { questions, answers } = state;
    const optionRgx = /^answerScore[0-9]*/;

    const questionItem = useMemo(() => questions[number], []);
    const answer = useMemo(() => answers[number], []);
    const optionCount = useMemo(() => {
        return Object
                .keys(questionItem)
                .filter((title) => title.search(optionRgx) !== -1 && questionItem[title])
                .length;
    }, []);

    const prefix = useCallback((num) => num < 10 ? `0${num}` : `${num}`, []);

    useEffect(() => {
        console.log("mount", number);
        console.log(answer);

        return () => console.log("unmount", number);
    }, []);

    return (
        <fieldset>
            <legend>{questionItem.question.split('<br/>').map((line) => <>{line}<br/></>)}</legend>
            {Array(optionCount)
                .fill("answer")
                .map((ans, idx) => {
                    const name = `qitemNo${prefix(number)}-option`
                    const id = `${name}${prefix(idx + 1)}`;
                    const score = questionItem[`${ans}Score${prefix(idx + 1)}`]
                    const option = questionItem[`${ans}${prefix(idx + 1)}`]

                    return (
                        <label
                            htmlFor={id}
                            key={id}
                        >{option}
                            <input
                                id={id}
                                key={id}
                                name={name}
                                type="radio"
                                value={score}
                                defaultChecked={answer === score}
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

const Questions = ({ visibleNumbers }) => {
    return <form>{visibleNumbers.map((number) => <Question key={number} number={number} />)}</form>;
} //TODO: key redefine

export default Questions;
