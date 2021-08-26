import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { GENDER_NAMES } from '../../constants';
import { actionCreator } from '../../store/reducer';
import selector from '../../store/selector';
import { COLOR_DARKSET } from '../../variables';

const UserRegister = () => {
  const dispatch = useDispatch();
  const userName = useSelector(selector.getUserName);
  const userGender = useSelector(selector.getUserGender);

  const saveName = useCallback(
    (name) => dispatch(actionCreator.saveName(name)),
    [dispatch],
  );

  const saveGender = useCallback(
    (gender) => dispatch(actionCreator.saveGender(gender)),
    [dispatch],
  );

  const handleChangeName = useCallback(
    (e) => {
      // TODO: 이름 예외처리하기!
      if (!e.target.value) {
        console.log('뭐하냐 ㅡㅡ');
        // 특수문자나 숫자 포함인지 확인!!
      }
      if (e.target.value === userName) {
        return;
      }
      saveName(e.target.value);
    },
    [userName, saveName],
  );

  const handleChangeGender = useCallback(
    (e) => {
      if (e.target.value === userGender) {
        return;
      }
      saveGender(e.target.value);
    },
    [userGender, saveGender],
  );

  return (
    <StyledUserRegisterContainer>
      <StyledPsychologyTestMainTitle>
        직업가치관검사
      </StyledPsychologyTestMainTitle>
      <StyledUserInputContainer>
        <StyledItemContainer>
          <StyledNameInputLabel htmlFor="user-name">
            <input
              id="user-name"
              name="user-name"
              defaultValue={userName}
              placeholder="이름을 입력해주세요."
              type="text"
              onChange={handleChangeName}
            />
          </StyledNameInputLabel>
        </StyledItemContainer>
        <StyledItemContainer>
          <StyledItemName>성별</StyledItemName>
          <StyledGenderCheckboxContainer>
            <StyledGenderCheckboxLabel htmlFor="male">
              <input
                id="male"
                name="gender"
                value={100323}
                type="radio"
                onClick={handleChangeGender}
                defaultChecked={GENDER_NAMES[userGender] === '남성'}
              />
              남성
            </StyledGenderCheckboxLabel>
            <StyledGenderCheckboxLabel htmlFor="female">
              <input
                id="female"
                name="gender"
                value={100324}
                type="radio"
                onClick={handleChangeGender}
                defaultChecked={GENDER_NAMES[userGender] === '여성'}
              />
              여성
            </StyledGenderCheckboxLabel>
          </StyledGenderCheckboxContainer>
        </StyledItemContainer>
        <StyledGenderCheckGuide hidden={userGender}>
          성별은 필수 입력 사항입니다.
        </StyledGenderCheckGuide>
      </StyledUserInputContainer>
    </StyledUserRegisterContainer>
  );
};

// Define Styled Components
const StyledUserRegisterContainer = styled.fieldset`
  border-style: none;
  margin-top: 30vh;

  @media screen and (max-width: 480px) {
    margin-top: 25vh;
  }
`;

const StyledPsychologyTestMainTitle = styled.legend`
  font-size: 2.5rem;

  @media screen and (max-width: 480px) {
    font-size: 2rem;
  }
`;

const StyledUserInputContainer = styled.div`
  margin: 2.5rem auto 0.5rem auto;
  width: fit-content;

  @media screen and (max-width: 480px) {
    margin-top: 2rem;
    margin-bottom: 0.5rem;
  } ;
`;

const StyledItemContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1.5rem;
`;

const StyledItemName = styled.span`
  margin-right: 2rem;
`;

const StyledNameInputLabel = styled.label`
  > input {
    width: 12rem;
    padding: 0.5rem 0;
    border-style: none;
    border-bottom: solid 2px ${COLOR_DARKSET.HIGHLIGHT_TEXT};
    background-color: transparent;
    color: white;
    font-size: 1.1rem;
    text-align: center;

    ::placeholder {
      color: ${COLOR_DARKSET.FONT};
      font-size: 1rem;
      text-align: center;
    }
    :focus {
      outline: none;
      background-color: ${COLOR_DARKSET.NAME_INPUT_FOCUS};
      box-shadow: 0px 0px 10px 2px ${COLOR_DARKSET.NAME_INPUT_FOCUS};
    }
  }
`;

const StyledGenderCheckboxContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledGenderCheckboxLabel = styled.label`
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

const StyledGenderCheckGuide = styled.p`
  font-size: 0.8rem;
  margin-top: 0.2rem;
  color: #ec1010;
  animation: 1.5s linear infinite alternate notice_check;

  @keyframes notice_check {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
`;

export default UserRegister;
