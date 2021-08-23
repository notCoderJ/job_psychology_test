import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled, { css } from 'styled-components';
import { useHistory } from 'react-router-dom';
import Questions from '../components/test/questions';
import UserRegister from '../components/test/registration';
import PageLayOut from './pageLayout';
import api from '../api';
import { Button, ProgressBar } from '../components/common';
import { RESULT_ANSWER_FORM } from '../constants/test';
import selector from '../store/selector';
import { actionCreator } from '../store/reducer';

const getResultFormData = (state) => ({
  qestrnSeq: state.question.qestrnSeq,
  trgetSe: state.user.targetSeq,
  name: state.user.name,
  gender: state.user.gender,
  grade: state.user.grade,
  startDtm: state.user.startDate,
});

const PsychologyTest = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  // creatSelector를 하면 useMemo처럼 캐싱처리가 된다고 하여 찾아보며 적용을 해봤는데 제대로 사용한건지 잘 모르겠습니다...
  // 콘솔로 해당 selector 내에 재진입하는 지 확인은 해봤는데 별도로 확인할 방법이 뭔가 있을까요?
  // createSelector로 생성한 selector를 useSelector에 넘겨서 처리하는 것 말고 혹시 다른 방법도 있는지 궁금합니다
  const { currentPageIndex, lastPageIndex } = useSelector(
    selector.getPageIndex,
  );
  const isNextDisabled = useSelector(selector.isNextDisabled);
  const resultFormData = useSelector(getResultFormData);
  const answers = useSelector(selector.getAnswers);

  const loadQuestions = useCallback(
    (responseData) => dispatch(actionCreator.loadQuestions(responseData)),
    [dispatch],
  );

  useEffect(() => {
    (async () => {
      try {
        loadQuestions(await api.getQuestions());
      } catch (err) {
        console.error(err);
      }
    })();
  }, [loadQuestions]);

  const handlePrev = useCallback(
    () => currentPageIndex > 0 && dispatch(actionCreator.updatePageIndex(-1)),
    [currentPageIndex, dispatch],
  ); // TODO:dependency
  const handleNext = useCallback(
    () =>
      currentPageIndex < lastPageIndex &&
      dispatch(actionCreator.updatePageIndex(1)),
    [currentPageIndex, lastPageIndex, dispatch],
  ); // TODO:dependency

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();

      const { prefix, infix, postfix } =
        RESULT_ANSWER_FORM[resultFormData.qestrnSeq]; // TODO: Parsing answers
      const requestAnswerForm = answers
        .slice(1)
        .map(
          (answer, questionNumber) =>
            `${prefix}${questionNumber + 1}${infix}${answer}${postfix}`,
        )
        .join('');

      const sendData = {
        ...resultFormData,
        answers: requestAnswerForm,
      };
      console.log(sendData); // TEST

      // TODO: Interceptor 적용하기!
      (async () => {
        try {
          const res = await api.getResultURL(sendData);
          const paramsString = new URL(res.url).search;
          const params = new URLSearchParams(paramsString);

          history.push(`/completed/${params.get('seq')}`);
        } catch (err) {
          throw new Error(err);
        }
      })();
    },
    [resultFormData, answers, history],
  );

  return (
    <PageLayOut
      header={currentPageIndex >= 0 && <ProgressBar />}
      main={
        <StyledPsyTestContainer onSubmit={handleSubmit}>
          {currentPageIndex < 0 ? (
            <UserRegister />
          ) : (
            <>
              {currentPageIndex === 0 && (
                <span className="sample-description">
                  직업과 관련된 두개의 가치 중에서 자기에게 더 중요한 가치에
                  표시하세요. 가치의 뜻을 잘모르겠다면 문항 아래에 있는 가치의
                  설명을 확인해보세요.
                </span>
              )}
              <Questions />
            </>
          )}
          <StyledButtonContainer isTesting={currentPageIndex > 0}>
            {currentPageIndex > 0 && (
              <Button type="button" onClick={handlePrev}>
                이전
              </Button>
            )}
            <Button
              type={currentPageIndex !== lastPageIndex ? 'button' : 'submit'}
              disabled={isNextDisabled}
              onClick={handleNext}
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

const StyledButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  ${(props) =>
    props?.isTesting &&
    css`
      justify-content: space-between;
    `};
  margin: 7vh 15% 12vh 15%;
`;

export default PsychologyTest;
