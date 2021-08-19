import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled, { css } from 'styled-components';
import Questions from '../components/test/questions';
import UserRegister from '../components/test/registration';
import PageLayOut from './pageLayout';
import { getQuestions, getResult } from '../api';
import actionCreators from '../store/actions';
import Button from '../components/common/button';
import { MAX_COUNT_IN_PAGE } from '../constants';

const PsyTest = () => {
  const [currPageIndex, setCurrPageIndex] = useState(-1);
  const dispatch = useDispatch();
  const {
    isLoaded,
    lastPageIndex,
    questionSeq,
    questions,
    targetSeq,
    name: userName,
    gender,
    grade,
    startDate,
    answers,
  } = useSelector((state) => state);

  const loadQuestions = useCallback(
    (responseData) => dispatch(actionCreators.loadQuestions(responseData)),
    [],
  );

  // useEffect는 race 컨티션을 방지하기 위해서 동기 콜백을 전달받기 때문에
  // 비동기 함수를 사용하려면 내부에 정의하고 사용해야 합니다.
  useEffect(() => {
    (async () => {
      try {
        loadQuestions(await getQuestions());
        console.log(isLoaded);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  // 음... 개선 방법이 없을까...
  const visibleQuestionNumbers = useMemo(() => {
    if (currPageIndex <= 0) {
      return [0];
    }

    const start = (currPageIndex - 1) * MAX_COUNT_IN_PAGE + 1;
    const end = Math.min(
      currPageIndex * MAX_COUNT_IN_PAGE + 1,
      questions.length,
    );
    return Array(end - start)
      .fill()
      .map((_, offset) => start + offset);
  }, [currPageIndex, questions]);
  //

  const isNextDisabled = useMemo(() => {
    if (!isLoaded) {
      return true;
    }

    if (currPageIndex < 0) {
      return !userName || !gender;
    }

    return visibleQuestionNumbers.filter((idx) => !answers[idx]).length !== 0;
  }, [
    userName,
    gender,
    answers,
    currPageIndex,
    visibleQuestionNumbers,
    isLoaded,
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
      questrnSeq: questionSeq,
      trgetSe: targetSeq,
      name: userName,
      gender,
      grade,
      startDtm: startDate.toString(),
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
              <Questions visibleQuestionNumbers={visibleQuestionNumbers} />
            </>
          )}
          <StyledButtonWrapper isTesting={currPageIndex > 0}>
            {currPageIndex > 0 && (
              <Button type="button" onClick={handlePrev}>
                이전
              </Button>
            )}
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

export default PsyTest;
