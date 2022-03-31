import React, { useMemo, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled, { css } from 'styled-components';
import { PageLayout, Button } from '../common';
import { actions, selector } from '../../store/modules';
import ProgressBar from './ProgressBar';
import SampleQuestion from './SampleQuestion';
import { reducerState } from '../../utils/reducer';
import Loading from '../common/Loading';
import Question from './Question';

const TestPage = () => {
  const ref = useRef(null);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(0);
  const pageCount = useSelector(selector.getPageCount);
  const lastPage = useMemo(() => pageCount - 1, [pageCount]);
  const questionNumbers = useSelector(selector.getQuestionNumbers(currentPage));
  const isPageAnswered = useSelector(selector.isPageAnswered(questionNumbers));
  const isResultLoading = useSelector(selector.isResultLoading);

  useEffect(() => ref.current.scrollTo(0, 0), [currentPage]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(actions.reqResult(reducerState.loading()));
  };

  if (isResultLoading) {
    return <Loading />;
  }

  return (
    <PageLayout
      ref={ref}
      header={
        <StyledProgressBarContainer>
          <ProgressBar height="100%" />
        </StyledProgressBarContainer>
      }
      main={
        <StyledForm isSample={currentPage === 0} onSubmit={handleSubmit}>
          {currentPage === 0 ? (
            <SampleQuestion />
          ) : (
            <StyledQuestions>
              {questionNumbers.map((number) => (
                <Question key={`question-${number}`} number={number} />
              ))}
            </StyledQuestions>
          )}
          <StyledButtonContainer isSample={currentPage === 0}>
            {currentPage > 0 && (
              <Button
                type="button"
                onClick={() => {
                  setCurrentPage((current) =>
                    current === 0 ? current : current - 1,
                  );
                }}
              >
                이전
              </Button>
            )}
            <Button
              type={currentPage === lastPage ? 'submit' : 'button'}
              disabled={!isPageAnswered}
              onClick={() => {
                setCurrentPage((current) =>
                  current === lastPage ? current : current + 1,
                );
              }}
            >
              {currentPage !== lastPage ? '다음' : '제출'}
            </Button>
          </StyledButtonContainer>
        </StyledForm>
      }
    />
  );
};

const StyledProgressBarContainer = styled.div`
  margin: 0 20vw;
  animation: 500ms ease-in forwards slide;
  @keyframes slide {
    from {
      height: 0;
      opacity: 0;
    }
    to {
      height: 15vh;
      opacity: 1;
    }
  }

  @media screen and (max-width: 480px) {
    height: 13vh;
    margin: 0 12vw;
  }
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 50vh;

  @media screen and (max-width: 480px) {
    margin-bottom: 55vh;
  }
`;

const StyledButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  ${(props) =>
    props.isSample &&
    css`
      justify-content: center;
    `};
  margin-top: 5vh;
`;

const StyledQuestions = styled.div`
  width: 100%;

  & > fieldset + fieldset {
    margin-top: 5vh;
  }
`;

export default TestPage;
