import React, { useMemo, useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled, { css } from 'styled-components';
import Questions from './questions';
import { PageLayout, Button } from '../common';
import { actions, selector } from '../../store/modules';
import ProgressBar from './progressBar';
import SampleQuestion from './sampleQuestion';
import { persistor } from '../../store';
import { reducerState } from '../../utils/reducer';

const TestPage = () => {
  const ref = useRef();
  const dispatch = useDispatch();
  const sectionCount = useSelector(selector.getSectionCount);
  const currentSection = useSelector(selector.getCurrentSection);
  const lastPageIndex = useMemo(() => sectionCount - 1, [sectionCount]);
  const isSectionAnswered = useSelector(
    selector.isSectionAnswered(currentSection),
  );

  useEffect(() => persistor.persist(), []);
  useEffect(() => ref.current.scrollTo(0, 0), [ref, currentSection]);

  const handleMovePrev = useCallback(
    () => dispatch(actions.movePrev()),
    [dispatch],
  );
  const handleMoveNext = useCallback(
    () => dispatch(actions.moveNext(currentSection === lastPageIndex)),
    [currentSection, lastPageIndex, dispatch],
  );

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(actions.reqResult(reducerState.loading()));
    },
    [dispatch],
  );

  return (
    <PageLayout
      ref={ref}
      background="true"
      header={
        <StyledProgressBarContainer>
          <ProgressBar height="100%" />
        </StyledProgressBarContainer>
      }
      main={
        <StyledQuestionContainer
          isSample={currentSection === 0}
          onSubmit={handleSubmit}
        >
          {currentSection === 0 ? (
            <SampleQuestion />
          ) : (
            <Questions section={currentSection} />
          )}
          <StyledButtonContainer isSample={currentSection === 0}>
            {currentSection > 0 && (
              <Button type="button" onClick={handleMovePrev}>
                이전
              </Button>
            )}
            <Button
              type={currentSection === lastPageIndex && 'submit'}
              disabled={!isSectionAnswered}
              onClick={handleMoveNext}
            >
              {currentSection !== lastPageIndex ? '다음' : '제출'}
            </Button>
          </StyledButtonContainer>
        </StyledQuestionContainer>
      }
    />
  );
};

// <StyledLoadingMessage>Loading...</StyledLoadingMessage>

// const StyledLoadingMessage = styled.h1`
//   font-size: 5rem;
//   line-height: 100vh;
// `;

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

const StyledQuestionContainer = styled.form`
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

export default TestPage;
