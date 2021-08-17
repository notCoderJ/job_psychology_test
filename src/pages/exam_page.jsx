import { useCallback, useEffect, useMemo, useState } from 'react';
import Questions from '../components/exam/questions';
import UserRegister from '../components/exam/registration';
import { usePsyExamContext } from '../context/psyexam_context';
import PageLayOut from './page_layout';
import styled from 'styled-components';
import { test_fetch } from '../utils/apis/exam';


const Exam = () => {
    const { state, loadQuestions } = usePsyExamContext();
    const { name, gender, questions, answers } = state;
    const [currPageIndex, setCurrPageIndex] = useState(-1);
    const lastPageIndex = useMemo(() => Math.ceil((questions.length - 1) / 5), [questions]);

    const isQuestionsLoaded = useMemo(() => {
        if (questions.length === 1) {
            return false;
        }
        return true;
    }, [questions]);

    const visibleNumbers = useMemo(() => {
        if (currPageIndex <= 0) {
            return [0]
        }

        const start = (currPageIndex - 1) * 5 + 1;
        const end = Math.min(currPageIndex * 5 + 1, questions.length);
        return Array(end - start)
                .fill()
                .map((_, offset) => start + offset);
    }, [currPageIndex]);

    const isNextDisabled = useMemo(() => {
        if (!isQuestionsLoaded) {
            return true;
        }

        if (currPageIndex < 0) {
            return !name || !gender
        } else {
            return visibleNumbers
                    .filter((idx) => !answers[idx])
                    .length !== 0;
        }
    }, [name, gender, answers, currPageIndex, isQuestionsLoaded]);

    const handlePrev = useCallback(() => setCurrPageIndex((current) => current > 0 ? current - 1 : 0), []);
    const handleNext = useCallback(() => {
        setCurrPageIndex((current) => current < lastPageIndex ? current + 1 : lastPageIndex);
    }, [lastPageIndex]);

    // TODO: fetch questions(temporary)
    useEffect(() => {
        console.log("fetch");
        test_fetch()
            .then(loadQuestions)
            .catch(console.error);
    }, []);

    //TEST CODE
    useEffect(() => {
        // console.log(questions);
        // console.log(currPageIndex);
        // console.log(visibleNumbers);
    }, [currPageIndex, state.questions])

    return (
        <PageLayOut
            header="nonono"
            // TODO: currPageIndex 값에 따라 컴포넌트 스위칭(2)
            main={currPageIndex < 0 ? <UserRegister /> : <Questions visibleNumbers={visibleNumbers} />}
            footer={
                <>
                    {currPageIndex > 0 && <TestBtn onClick={handlePrev}>버어어어튼1</TestBtn>}
                    <TestBtn 
                        disabled={isNextDisabled}
                        onClick={handleNext}>
                        버어어어튼2
                    </TestBtn>
                </>
            }
        />
    );
}

const TestBtn = styled.button`
    width: 100px;
    height: 50px;
`;

export default Exam;