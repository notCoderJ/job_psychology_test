import React, { useEffect, useRef, FormEventHandler, FormEvent } from 'react';
import styled from 'styled-components';
import { toast, ToastContainer } from 'react-toastify';
import { injectStyle } from 'react-toastify/dist/inject-style';
import { useTypedDispatch, useTypedSelector } from '@/hooks/redux';
import {
  UserName,
  UserGender,
  UserNameInputRef,
  UserGenderInputRef,
} from '@/components/user';
import { actions, selector } from '@/store/modules';
import { PageLayout, Button } from '@/components/common';
import Loading from '@/components/common/Loading';
import { missingItems } from '@/constants/user';

const UserPage = () => {
  const dispatch = useTypedDispatch();
  const nameRef = useRef<UserNameInputRef>(null);
  const genderRef = useRef<UserGenderInputRef>(null);
  const isQuestionLoading: boolean = useTypedSelector(
    selector.isQuestionLoading,
  );
  const missingItem: number = useTypedSelector(selector.getMissingItem);

  useEffect(() => injectStyle(), []);

  const handleSubmit: FormEventHandler<HTMLFormElement> = (
    e: FormEvent<HTMLFormElement>,
  ) => {
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

    dispatch(actions.reqQuestions());
  };

  if (isQuestionLoading) {
    return <Loading />;
  }

  return (
    <PageLayout
      main={
        <section>
          <STitle>직업가치관검사</STitle>
          <SForm onSubmit={handleSubmit}>
            <SFieldset>
              <legend>사용자 등록</legend>
              <UserName ref={nameRef} />
              <UserGender ref={genderRef} />
            </SFieldset>
            <Button type="submit">검사 시작</Button>
            <ToastContainer
              position="top-center"
              autoClose={1000}
              hideProgressBar={false}
              pauseOnHover={false}
              draggable={false}
              theme="dark"
            />
          </SForm>
        </section>
      }
    />
  );
};

const STitle = styled.h1`
  color: white;
  font-size: 2.2rem;
  margin-bottom: 2vh;

  @media screen and (max-width: 480px) {
    font-size: 2rem;
  }
`;

const SForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SFieldset = styled.fieldset`
  border: none;
  margin-bottom: 2vh;

  > legend {
    font-size: 0;
  }
`;

export default UserPage;
