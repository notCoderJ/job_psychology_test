import React, { useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import styled, { css } from 'styled-components';
import { ToastContainer, toast } from 'react-toastify';
import { injectStyle } from 'react-toastify/dist/inject-style';
import styled from 'styled-components';
import { GENDER } from '../../constants';
import { actions, selector } from '../../store/modules';
import { debounce } from '../../utils';
import { COLOR_DARKSET } from '../../variables';
import { Button } from '../common';

const UserRegister = ({ submitHandler }) => {
  const dispatch = useDispatch();
  const nameRef = useRef();
  const genderRef = useRef();
  const userName = useSelector(selector.getUserName);
  const userGender = useSelector(selector.getUserGender);
  const nameErrorId = 'name-error-id';
  const genderErrorId = 'gender-error-id';

  const saveName = useCallback(
    (e) => dispatch(actions.saveName(e.target.value)),
    [dispatch],
  );

  const saveGender = useCallback(
    (e) => {
      if (e.target.value === userGender) {
        return;
      }
      dispatch(actions.saveGender(e.target.value));
    },
    [userGender, dispatch],
  );

  injectStyle();
  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (!userName) {
        nameRef.current.focus();
        toast.error('한글 2자 이상 입력해주세요.', {
          toastId: nameErrorId,
          position: 'bottom-center',
          autoClose: 1000,
          hideProgressBar: false,
          pauseOnHover: false,
          draggable: false,
          theme: 'dark',
        });
        return;
      }

      if (!userGender) {
        genderRef.current.focus();
        toast.error('성별은 필수 항목입니다.', {
          toastId: genderErrorId,
          position: 'bottom-center',
          autoClose: 1000,
          hideProgressBar: false,
          pauseOnHover: false,
          draggable: false,
          theme: 'dark',
        });
        return;
      }

      if (typeof submitHandler === 'function') {
        submitHandler();
      }
    },
    [submitHandler, userGender, userName],
  );

  return (
    <StyledUserContainer onSubmit={handleSubmit}>
      <fieldset>
        <legend>사용자 등록</legend>
        <StyledNameInputLabel htmlFor="userName">
          <input hidden type="text" />
          <input
            ref={nameRef}
            id="userName"
            defaultValue={userName}
            placeholder="이름을 입력해주세요."
            type="text"
            onChange={debounce(saveName, 200)}
          />
        </StyledNameInputLabel>
        <StyledItemContainer>
          <legend>성별</legend>
          <StyledGenderContainer>
            <li>
              <StyledGenderLabel htmlFor="genderMale">
                <input
                  ref={genderRef}
                  id="genderMale"
                  name="userGender"
                  value={GENDER['남성']}
                  type="radio"
                  onClick={saveGender}
                  defaultChecked={userGender === GENDER['남성']}
                />
                남성
              </StyledGenderLabel>
            </li>
            <li>
              <StyledGenderLabel htmlFor="genderFemale">
                <input
                  id="genderFemale"
                  name="userGender"
                  value={GENDER['여성']}
                  type="radio"
                  onClick={saveGender}
                  defaultChecked={userGender === GENDER['여성']}
                />
                여성
              </StyledGenderLabel>
            </li>
          </StyledGenderContainer>
        </StyledItemContainer>
      </fieldset>
      <Button type="submit">검사 시작</Button>
      <ToastContainer />
    </StyledUserContainer>
  );
};

// Define Styled Components
const StyledUserContainer = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > fieldset {
    border-style: none;
    margin-bottom: 2vh;

    > legend {
      font-size: 0;
    }
  }
`;

const StyledItemContainer = styled.fieldset`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
  border: none;

  & > legend {
    font-size: 0;
  }

  ::before {
    content: '성별';
    font-size: 1.1rem;
    margin: auto 1rem auto 0;
  }
`;

const StyledNameInputLabel = styled.label`
  > input {
    width: 12rem;
    padding: 0.5rem 0;
    border-style: none;
    border-bottom: solid 2px ${COLOR_DARKSET.HIGHLIGHT_TEXT};
    background-color: transparent;
    color: white;
    text-align: center;
    font-size: 1.1rem;
    margin-bottom: 0.3rem;

    ::placeholder {
      color: ${COLOR_DARKSET.FONT};
      font-size: 1rem;
      text-align: center;
    }
    :focus {
      outline: none;
      ::placeholder {
        font-size: 0;
      }
    }
  }
`;

const StyledGenderContainer = styled.ul`
  width: fit-content;
  display: flex;
  flex-direction: column;
  list-style: none;
  padding: 0;
`;

const StyledGenderLabel = styled.label`
  cursor: pointer;

  > input {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;

    width: 0.8rem;
    height: 0.8rem;
    margin-right: 0.4rem;
    border: 2px solid ${COLOR_DARKSET.CHECKBOX_BORDER};
    border-radius: 50%;
    transition: 0.1s all ease-in-out;

    :checked {
      border: 4px solid ${COLOR_DARKSET.CHECKBOX};
    }

    @media screen and (max-width: 480px) {
      & {
        width: 0.7rem;
        height: 0.7rem;
        margin-right: 0.3rem;
      }

      :checked {
        border-width: 3.5px;
      }
    }
  }
`;

export default UserRegister;
