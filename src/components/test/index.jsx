import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled, { css } from 'styled-components';
import { useHistory } from 'react-router-dom';
import Questions from './questions';
import UserRegister from './registration';
import api from '../../api';
import { PageLayout, Button, ProgressBar } from '../common';
import {
  DUMMY,
  RESULT_ANSWER_FORM,
  SAMPLE_DESCRIPTION,
} from '../../constants/test';
import selector from '../../store/selector';
import { actionCreator } from '../../store/reducer';
import { VIEW_OF_VALUES } from '../../constants';

const getResultRequestFormData = (state) => ({
  qestrnSeq: state.question.questionSeq,
  trgetSe: state.user.targetSeq,
  name: state.user.name,
  gender: state.user.gender,
  grade: state.user.grade,
  startDtm: state.question.startDate,
});

const PsychologyTest = () => {
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

  // TEST CODE
  useEffect(() => {
    console.log('홈!', history);
    (async () => {
      try {
        const res = await api.getResultURL(DUMMY[5]);
        console.log(res);
        const paramsString = new URL(res.url).search;
        const params = new URLSearchParams(paramsString);
        history.push(`/complete/${params.get('seq')}`);
      } catch (err) {
        throw new Error(err);
      }
    })();
  }, [history]);

  // TODO: Store 초기화 다른 방법으로 할 수도?
  useEffect(() => {}, []);

  useEffect(() => {
    (async () => {
      try {
        const test = await api.getQuestions();
        console.log('here', test);
        loadQuestions(test);
        // loadQuestions(await api.getQuestions());
      } catch (err) {
        console.error(err); // TODO: loading으로 변경?
      }
    })();
  }, [loadQuestions]);

  const handleMovePrev = useCallback(
    () => currentPageIndex > 0 && dispatch(actionCreator.updatePageIndex(-1)),
    [currentPageIndex, dispatch],
  ); // TODO:dependency
  const handleMoveNext = useCallback(
    () =>
      currentPageIndex < lastPageIndex &&
      dispatch(actionCreator.updatePageIndex(1)),
    [currentPageIndex, lastPageIndex, dispatch],
  ); // TODO:dependency

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
          console.log(res); // TEST
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
      header={currentPageIndex >= 0 && <ProgressBar />}
      main={
        <StyledPsyTestContainer onSubmit={handleSubmit}>
          {currentPageIndex < 0 ? (
            <UserRegister />
          ) : (
            <>
              {currentPageIndex === 0 && (
                <span className="sample-description">{SAMPLE_DESCRIPTION}</span>
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

const StyledPsyTestContainer = styled.form`
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

const StyledButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  ${(props) =>
    props?.isTesting &&
    css`
      justify-content: space-between;
    `};
  margin: 5vh 15% 8vh 15%;
`;

export default PsychologyTest;
