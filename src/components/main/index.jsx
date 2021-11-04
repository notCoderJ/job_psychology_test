import React, { useCallback, useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { actions, selector } from '../../store/modules';
import UserRegister from './userRegister';
import { reducerState } from '../../utils/reducer';
import { PageLayout } from '../common';

const MainPage = () => {
  const dispatch = useDispatch();
  const isQuestionLoading = useSelector(selector.isQuestionLoading);
  const errorQuestionLoad = useSelector(selector.errorQuestionLoad);

  const submitHandler = useCallback(
    () => dispatch(actions.reqQuestions(reducerState.loading())),
    [dispatch],
  );

  useEffect(() => {
    if (errorQuestionLoad) {
      //     alert(`검사 문항을 불러오는데 실패했습니다. 잠시후 다시 시도해주세요.`);
      alert('sdfsdfnsdlf');
    }
  }, [errorQuestionLoad]);

  return (
    <PageLayout
      main={
        <section>
          <StyledMainTitle>직업가치관검사</StyledMainTitle>
          {isQuestionLoading && <div>sdfsdf</div>}
          <UserRegister submitHandler={submitHandler} />
        </section>
      }
    />
  );
};

const StyledMainTitle = styled.h1`
  color: white;
  font-size: 2.2rem;
  margin-bottom: 2vh;

  @media screen and (max-width: 480px) {
    font-size: 2rem;
  }
`;

export default MainPage;
