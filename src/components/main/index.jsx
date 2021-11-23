import React, { useCallback, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { toast, ToastContainer } from 'react-toastify';
import { injectStyle } from 'react-toastify/dist/inject-style';
import { useDispatch, useSelector } from 'react-redux';
import { actions, selector } from '../../store/modules';
import UserRegister from './userRegister';
import { reducerState } from '../../utils/reducer';
import { PageLayout, Button } from '../common';
import Loading from '../common/loading';

const MainPage = () => {
  const dispatch = useDispatch();
  const nameRef = useRef(null);
  const genderRef = useRef(null);
  const userName = useSelector(selector.getUserName);
  const userGender = useSelector(selector.getUserGender);
  const isQuestionLoading = useSelector(selector.isQuestionLoading);

  useEffect(() => injectStyle(), []);

  const nameHandler = useCallback(
    (name) => dispatch(actions.saveName(name)),
    [dispatch],
  );
  const genderHandler = useCallback(
    (gender) => dispatch(actions.saveGender(gender)),
    [dispatch],
  );

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (!userName) {
        nameRef.current.focus();
        toast.error('한글 2자 이상 입력해주세요.', {
          toastId: 'name-error-id',
        });
        return;
      }

      if (!userGender) {
        genderRef.current.focus();
        toast.error('성별은 필수 항목입니다.', {
          toastId: 'gender-error-id',
        });
        return;
      }

      dispatch(actions.reqQuestions(reducerState.loading()));
    },
    [dispatch, userGender, userName],
  );

  return (
    <PageLayout
      main={
        <>
          {isQuestionLoading && <Loading />}
          <section>
            <StyledMainTitle>직업가치관검사</StyledMainTitle>
            <StyledUserContainer onSubmit={handleSubmit}>
              <UserRegister
                nameRef={nameRef}
                userName={userName}
                nameHandler={nameHandler}
                genderRef={genderRef}
                userGender={userGender}
                genderHandler={genderHandler}
              />
              <Button type="submit">검사 시작</Button>
              <ToastContainer
                position="top-center"
                autoClose={1000}
                hideProgressBar={false}
                pauseOnHover={false}
                draggable={false}
                theme="dark"
              />
            </StyledUserContainer>
          </section>
        </>
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

const StyledUserContainer = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default MainPage;
