import React, { useCallback } from 'react';
import styled from 'styled-components';
import { GENDER } from '../../constants';
import { debounce } from '../../utils';
import { COLOR_DARKSET } from '../../variables';

const UserRegister = ({
  nameRef,
  userName,
  nameHandler,
  genderRef,
  userGender,
  genderHandler,
}) => {
  const handleName = useCallback(
    (e) => nameHandler(e.target.value),
    [nameHandler],
  );

  const handleGender = useCallback(
    (e) => {
      if (e.target.value === userGender) {
        return;
      }
      genderHandler(e.target.value);
    },
    [userGender, genderHandler],
  );

  return (
    <StyledUserContainer>
      <legend>사용자 등록</legend>
      <StyledNameInputLabel htmlFor="userName">
        <input hidden type="text" />
        <input
          ref={nameRef}
          id="userName"
          defaultValue={userName}
          placeholder="이름을 입력해주세요."
          type="text"
          onChange={debounce(handleName, 200)}
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
                onClick={handleGender}
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
                onClick={handleGender}
                defaultChecked={userGender === GENDER['여성']}
              />
              여성
            </StyledGenderLabel>
          </li>
        </StyledGenderContainer>
      </StyledItemContainer>
    </StyledUserContainer>
  );
};

// Define Styled Components
const StyledUserContainer = styled.fieldset`
  border: none;
  margin-bottom: 2vh;

  > legend {
    font-size: 0;
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
