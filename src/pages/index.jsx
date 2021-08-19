import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { connect } from 'react-redux';
import styled, { css } from 'styled-components';
import Questions from '../components/test/questions';
import UserRegister from '../components/test/registration';
import PageLayOut from './page_layout';
import { getQuestions, getResult } from '../api';
import actionCreators from '../actions';
import Button from '../components/common/button';

const PsyTest = ({
  questrnSeq,
  questions,
  trgetSe,
  userName,
  gender,
  grade,
  startDtm,
  answers,
  loadQuestions,
}) => {
  const [currPageIndex, setCurrPageIndex] = useState(-1);
  const lastPageIndex = useMemo(
    () => Math.ceil((questions.length - 1) / 5),
    [questions],
  );

  // TODO: fetch questions(temporary)
  useEffect(() => {
    getQuestions().then(loadQuestions).catch(console.error);
  }, []);

  const isQuestionsLoaded = useMemo(() => {
    if (questions.length === 1) {
      return false;
    }
    return true;
  }, [questions]);

  // 음... 개선 방법이 없을까...
  const visibleNumbers = useMemo(() => {
    if (currPageIndex <= 0) {
      return [0];
    }

    const start = (currPageIndex - 1) * 5 + 1;
    const end = Math.min(currPageIndex * 5 + 1, questions.length);
    return Array(end - start)
      .fill()
      .map((_, offset) => start + offset);
  }, [currPageIndex, questions]);
  //

  const isNextDisabled = useMemo(() => {
    if (!isQuestionsLoaded) {
      return true;
    }

    if (currPageIndex < 0) {
      return !userName || !gender;
    }

    return visibleNumbers.filter((idx) => !answers[idx]).length !== 0;
  }, [
    userName,
    gender,
    answers,
    currPageIndex,
    visibleNumbers,
    isQuestionsLoaded,
  ]);

  const handlePrev = useCallback(
    () => setCurrPageIndex((current) => (current > 0 ? current - 1 : 0)),
    [],
  );
  const handleNext = useCallback(() => {
    setCurrPageIndex((current) =>
      current < lastPageIndex ? current + 1 : lastPageIndex,
    );
  }, [lastPageIndex]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const testData = {
      questrnSeq,
      trgetSe,
      name: userName,
      gender,
      grade,
      startDtm: startDtm.toString(),
    };

    console.log('not yet');
    console.log('이거슨 파싱할 데이터');
    console.log(JSON.stringify(testData));
    console.log(answers);
    console.log('여까지');
    getResult();
  };

  // TEST CODE
  useEffect(() => {
    // console.log(questions);
    // console.log(currPageIndex);
    // console.log(visibleNumbers);
  }, [currPageIndex, questions]);

  return (
    <PageLayOut
      header="Imagine a progress bar"
      main={
        <StyledPsyTest onSubmit={handleSubmit}>
          {currPageIndex < 0 ? (
            <UserRegister />
          ) : (
            <>
              {currPageIndex === 0 && (
                <span className="sample-description">
                  직업과 관련된 두개의 가치 중에서 자기에게 더 중요한 가치에
                  표시하세요. 가치의 뜻을 잘모르겠다면 문항 아래에 있는 가치의
                  설명을 확인해보세요.
                </span>
              )}
              <Questions visibleNumbers={visibleNumbers} />
            </>
          )}
          <StyledButtonWrapper isTesting={currPageIndex > 0}>
            {currPageIndex > 0 && <Button onClick={handlePrev}>이전</Button>}
            <Button
              type={currPageIndex !== lastPageIndex ? 'button' : 'submit'}
              disabled={isNextDisabled}
              onClick={handleNext}
            >
              {currPageIndex <= 0
                ? '검사 시작'
                : currPageIndex !== lastPageIndex
                ? '다음'
                : '제출'}
            </Button>
          </StyledButtonWrapper>
        </StyledPsyTest>
      }
    />
  );
};

const StyledPsyTest = styled.form`
  color: #ffedfe;

  > span.sample-description {
    display: block;
    font-size: 1.7rem;
    margin: 0 14% 5vh 14%;
    text-align: justify;

    @media screen and (max-width: 480px) {
      font-size: 1rem;
      margin: 0 3rem 4vh 3rem;
    }
  }
`;

const StyledButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  ${(props) =>
    props?.isTesting &&
    css`
      justify-content: space-between;
    `};
  margin: 7vh 15% 12vh 15%;
`;

const mapStateToProps = (state) => {
  const {
    questrnSeq,
    questions,
    trgetSe,
    name: userName,
    gender,
    grade,
    startDtm,
    answers,
  } = state;
  return {
    questrnSeq,
    questions,
    trgetSe,
    userName,
    gender,
    grade,
    startDtm,
    answers,
  };
};

const mapDispatchToProps = (dispatch) => ({
  loadQuestions: (questions) =>
    dispatch(actionCreators.loadQuestions(questions)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PsyTest);
