import { usePsyExamContext } from '../../context/psyexam_context';

const Question = () => {
    const { state, saveAnswers } = usePsyExamContext();
    // const 

    return <></>;
}

const Questions = ({ visibleNumbers }) => {
    return (
        <ul>
            <Question />
        </ul>
    )
}

// visibleQuestions.map((_, idx) => <Question key={idx} />)
// {
//     "question": "힘이 드는 동작을 잘 할 수 있다.",
//     "answer01": "매우낮음",
//     "answer02": "낮음",
//     "answer03": "약간낮음",
//     "answer04": "보통",
//     "answer05": "약간높음",
//     "answer06": "높음",
//     "answer07": "매우높음",
//     "answer08": null,
//     "answer09": null,
//     "answer10": null,
//     "answerScore01": "1",
//     "answerScore02": "2",
//     "answerScore03": "3",
//     "answerScore04": "4",
//     "answerScore05": "5",
//     "answerScore06": "6",
//     "answerScore07": "7",
//     "answerScore08": null,
//     "answerScore09": null,
//     "answerScore10": null,
//     "tip1Score": "2",
//     "tip2Score": "6",
//     "tip3Score": null,
//     "tip1Desc": "무릎 대고 팔굽혀펴기를 5회 이상 하기 어렵다. ",
//     "tip2Desc": "팔굽혀 펴기를 쉬지 않고 (남자: 50, 여자:20)회 이상 할 수 있다.",
//     "tip3Desc": null,
//     "qitemNo": 2
// }

export default Questions;
