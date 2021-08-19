import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import actionCreators from '../../store/actions';
import { GENDER_TO_STRING } from '../../constants';

const UserRegister = () => {
  const dispatch = useDispatch();
  const { name: userName, gender: userGender } = useSelector((state) => state);

  const saveName = useCallback(
    (name) => dispatch(actionCreators.saveName(name)),
    [],
  );

  const saveGender = useCallback(
    (gender) => dispatch(actionCreators.saveGender(gender)),
    [],
  );

  const handleChangeName = useCallback(
    (e) => {
      // TODO: 이름 예외처리
      if (userName !== e.target.value) {
        saveName(e.target.value);
      }
    },
    [userName, saveName],
  ); // TODO: useCallback 동작 매커니즘 알아보기!!

  // TEST
  useEffect(() => {
    console.log(userName, userGender);
  }, [userName, userGender]);

  return (
    <StyledUserRegister>
      <legend>사용자 등록</legend>
      <StyledContainer>
        <h4>이름</h4>
        <label htmlFor="user_name">
          <input
            id="user_name"
            name="user_name"
            defaultValue={userName}
            type="text"
            placeholder="이름을 입력해주세요."
            onChange={handleChangeName}
          />
        </label>
      </StyledContainer>
      <StyledContainer>
        <h4>성별</h4>
        <label className="gender" htmlFor="male">
          <input
            id="male"
            name="gender"
            value="100323"
            type="radio"
            onClick={(e) => saveGender(e.target.value)}
            defaultChecked={GENDER_TO_STRING[userGender] === '남성'}
          />
          남성
        </label>
        <label className="gender" htmlFor="female">
          <input
            id="female"
            name="gender"
            value="100324"
            type="radio"
            onClick={(e) => saveGender(e.target.value)}
            defaultChecked={GENDER_TO_STRING[userGender] === '여성'}
          />
          여성
        </label>
      </StyledContainer>
    </StyledUserRegister>
  );
};

const StyledUserRegister = styled.fieldset`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 25vw;
  height: 50vh;
  border-style: none;
  color: #fffdfa;
  margin: auto;

  > legend {
    font-size: 1.7rem;
  }
`;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  > h4 {
    align-self: flex-start;
    margin-left: 20%;
  }

  > label.gender {
    display: flex;
    justify-content: center;
    align-items: center;

    > input {
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;

      width: 0.8rem;
      height: 0.8rem;
      margin-right: 0.4rem;
      border: 2px solid #ccc;
      border-radius: 50%;
      transition: 0.1s all ease-in-out;

      :checked {
        border: 4px solid #9554f7;
      }

      @media screen and (max-width: 480px) {
        & {
          width: 0.7rem;
          height: 0.7rem;
          margin-right: 0.3rem;
        }

        :checked {
          border: 3.5px solid #9554f7;
        }
      }
    }
  }
`;

export default UserRegister;
