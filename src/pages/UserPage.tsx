import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { toast, ToastContainer } from 'react-toastify';
import { injectStyle } from 'react-toastify/dist/inject-style';
import { useDispatch, useSelector } from 'react-redux';
import { actions, selector } from '../store/modules';
import { reducerState } from '../utils';
import { PageLayout, Button } from '../components/common';
import Loading from '../components/common/Loading';
import {
  UserName,
  UserGender,
  UserNameInputRef,
  UserGenderInputRef,
} from '../components/user';
import { missingItems } from '../constants/user';

const StyledTitle = styled.h1`
  color: white;
  font-size: 2.2rem;
  margin-bottom: 2vh;

  @media screen and (max-width: 480px) {
    font-size: 2rem;
  }
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledFieldset = styled.fieldset`
  border: none;
  margin-bottom: 2vh;

  > legend {
    font-size: 0;
  }
`;

const UserPage = () => {
  const dispatch = useDispatch();
  const nameRef = useRef<UserNameInputRef>(null);
  const genderRef = useRef<UserGenderInputRef>(null);
  const isQuestionLoading = useSelector(selector.isQuestionLoading);
  const missingItem = useSelector(selector.getMissingItem);

  useEffect(() => injectStyle(), []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (missingItem === missingItems.name) {
      nameRef.current?.focus();
      toast.error('한글 2자 이상 입력해주세요.', {
        toastId: 'user-name-error',
      });
      return;
    }

    if (missingItem === missingItems.gender) {
      genderRef.current?.focus();
      toast.error('성별을 선택해주세요.', {
        toastId: 'user-gender-error',
      });
      return;
    }

    dispatch(actions.reqQuestions(reducerState.loading()));
  };

  if (isQuestionLoading) {
    return <Loading />;
  }

  return (
    <PageLayout
      main={
        <section>
          <StyledTitle>직업가치관검사</StyledTitle>
          <StyledForm onSubmit={handleSubmit}>
            <StyledFieldset>
              <legend>사용자 등록</legend>
              <UserName ref={nameRef} />
              <UserGender ref={genderRef} />
            </StyledFieldset>
            <Button type="submit">검사 시작</Button>
            <ToastContainer
              position="top-center"
              autoClose={1000}
              hideProgressBar={false}
              pauseOnHover={false}
              draggable={false}
              theme="dark"
            />
          </StyledForm>
        </section>
      }
    />
  );
};

export default UserPage;
