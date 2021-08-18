import { useCallback, useEffect, useMemo, useState } from 'react';
import Questions from '../components/exam/questions';
import UserRegister from '../components/exam/registration';
import PageLayOut from './page_layout';
import styled from 'styled-components';
import { test_fetch } from '../api';
import { connect } from 'react-redux';
import actionCreators from '../actions';


const Exam = ({ userName, gender, questions, answers, loadQuestions }) => {
    const [currPageIndex, setCurrPageIndex] = useState(-1);
    const lastPageIndex = useMemo(() => Math.ceil((questions.length - 1) / 5), [questions]);

    const isQuestionsLoaded = useMemo(() => {
        if (questions.length === 1) {
            return false;
        }
        return true;
    }, [questions]);

    // 흐으으으음... 깔끔해보이지가 않네;;
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
    //

    const isNextDisabled = useMemo(() => {
        if (!isQuestionsLoaded) {
            return true;
        }

        if (currPageIndex < 0) {
            return !userName || !gender
        }

        return visibleNumbers
                .filter((idx) => !answers[idx])
                .length !== 0;
    }, [userName, gender, answers, currPageIndex, isQuestionsLoaded]);

    const handlePrev = useCallback(() => setCurrPageIndex((current) => current >= 0 ? current - 1 : 0), []);
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
    }, [currPageIndex, questions])

    return (
        <PageLayOut
            header="nonono"
            main={currPageIndex < 0 ? <UserRegister /> : <Questions visibleNumbers={visibleNumbers} />}
            footer={
                <>
                    {currPageIndex >= 0 && <TestBtn onClick={handlePrev}>버어어어튼1</TestBtn>}
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

const mapStateToProps = (state) => {
    const { name: userName, gender, questions, answers } = state;
    return { userName, gender, questions, answers }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadQuestions: (questions) => dispatch(actionCreators.loadQuestions(questions))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Exam);