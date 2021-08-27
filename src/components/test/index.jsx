import React, { useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled, { css } from 'styled-components';
import { useHistory } from 'react-router-dom';
import Questions from './questions';
import UserRegister from './registration';
import api from '../../api';
import { PageLayout, Button } from '../common';
import {
  DUMMY,
  RESULT_ANSWER_FORM,
  SAMPLE_DESCRIPTION,
} from '../../constants/test';
import selector from '../../store/selector';
import { actionCreator } from '../../store/reducer';
import { VIEW_OF_VALUES } from '../../constants';
import ProgressBar from './progressBar';

const getResultRequestFormData = (state) => ({
  qestrnSeq: state.question.questionSeq,
  trgetSe: state.user.targetSeq,
  name: state.user.name,
  gender: state.user.gender,
  grade: state.user.grade,
  startDtm: state.question.startDate,
});

const PsychologyTest = () => {
  const ref = useRef();
  const history = useHistory();
  const dispatch = useDispatch();

  // TODO: useSelector 패키징 selector 만들기!
  const { currentPageIndex, lastPageIndex } = useSelector(
    selector.getPageIndex,
  );
  const isNextDisabled = useSelector(selector.isNextDisabled);
  const resultRequestFormData = useSelector(getResultRequestFormData);
  const answers = useSelector(selector.getAnswers);

  const loadQuestions = useCallback(
    (responseData) => dispatch(actionCreator.loadQuestions(responseData)),
    [dispatch],
  );

  const scrollToTop = useCallback(() => {
    ref.current.scrollTo(0, 0);
  }, [ref]);

  useEffect(() => {
    scrollToTop();
  }, [scrollToTop, currentPageIndex]);

  // TEST CODE
  useEffect(() => {
    console.log('홈!', history);
    (async () => {
      try {
        const res = await api.getResultURL(DUMMY);
        console.log(res);
        const paramsString = new URL(res.url).search;
        const params = new URLSearchParams(paramsString);
        history.push(`/complete/${params.get('seq')}`);
      } catch (err) {
        throw new Error(err);
      }
    })();
  }, [history]);

  useEffect(() => {
    (async () => {
      try {
        loadQuestions(await api.getQuestions());
      } catch (err) {
        console.error(err); // TODO: loading으로 변경?
      }
    })();
  }, [loadQuestions]);

  const handleMovePrev = useCallback(
    () => currentPageIndex > 0 && dispatch(actionCreator.updatePageIndex(-1)),
    [currentPageIndex, dispatch],
  );
  const handleMoveNext = useCallback(
    () =>
      currentPageIndex < lastPageIndex &&
      dispatch(actionCreator.updatePageIndex(1)),
    [currentPageIndex, lastPageIndex, dispatch],
  );

  const getResultRequestFormAnswer = useCallback((questionSeq, rawAnswers) => {
    const { prefix, infix, postfix } = RESULT_ANSWER_FORM[questionSeq];
    return rawAnswers
      .map((answer, index) => {
        const questionNumber = index + 1;
        return `${prefix}${questionNumber}${infix}${answer}${postfix}`;
      })
      .join('');
  }, []);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();

      const scores = [];
      const scoreByValues = new Array(Object.keys(VIEW_OF_VALUES).length).fill(
        0,
      );

      answers.slice(1).forEach(([value, score]) => {
        scores.push(score);
        scoreByValues[value] += 1; // Number(score);
      });

      // TODO: ANSWR 고쳐처어어어어어
      const requestFormAnswer = getResultRequestFormAnswer(
        resultRequestFormData.qestrnSeq,
        scores,
      );

      const sendData = {
        ...resultRequestFormData,
        answers: requestFormAnswer,
      };

      // TODO: Interceptor 적용하기! && api async wrapping 함수 만들까 생각 중...
      (async () => {
        try {
          const res = await api.getResultURL(sendData);
          const paramsString = new URL(res.url).search;
          const params = new URLSearchParams(paramsString);
          history.replace(`/complete/${params.get('seq')}`);
        } catch (err) {
          throw new Error(err); // TODO: loading으로 변경?
        }
      })();
    },
    [getResultRequestFormAnswer, resultRequestFormData, answers, history],
  );

  return (
    <PageLayout
      ref={ref}
      header={
        currentPageIndex >= 0 && (
          <StyledProgressBarContainer sample={currentPageIndex === 0}>
            <ProgressBar />
          </StyledProgressBarContainer>
        )
      }
      main={
        <StyledPsyTestContainer
          sample={currentPageIndex === 0}
          onSubmit={handleSubmit}
        >
          {currentPageIndex < 0 ? (
            <UserRegister />
          ) : (
            <>
              {currentPageIndex === 0 && (
                <StyledSampleDescription className="sample-description">
                  {SAMPLE_DESCRIPTION}
                </StyledSampleDescription>
              )}
              <Questions />
            </>
          )}
          <StyledButtonContainer isTesting={currentPageIndex > 0}>
            {currentPageIndex > 0 && (
              <Button type="button" onClick={handleMovePrev}>
                이전
              </Button>
            )}
            <Button
              type={currentPageIndex === lastPageIndex && 'submit'}
              disabled={isNextDisabled}
              onClick={handleMoveNext}
            >
              {currentPageIndex <= 0
                ? '검사 시작'
                : currentPageIndex !== lastPageIndex
                ? '다음'
                : '제출'}
            </Button>
          </StyledButtonContainer>
        </StyledPsyTestContainer>
      }
    />
  );
};

const StyledProgressBarContainer = styled.div`
  ${(props) =>
    props.sample &&
    css`
      margin-top: 15vh;

      @media screen and (max-width: 480px) {
        margin-top: 10vh;
      }
    `}
`;

const StyledPsyTestContainer = styled.form`
  ${(props) =>
    props.sample &&
    css`
      display: flex;
      flex-direction: column;
    `}
`;

const StyledSampleDescription = styled.p`
  font-size: 1.7rem;
  margin-bottom: 5vh;
  text-align: justify;

  @media screen and (max-width: 480px) {
    font-size: 1rem;
  }
`;

const StyledButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  ${(props) =>
    props?.isTesting &&
    css`
      justify-content: space-between;
    `};
  margin-top: 5vh;
  margin-bottom: 8vh;
`;

export default PsychologyTest;
