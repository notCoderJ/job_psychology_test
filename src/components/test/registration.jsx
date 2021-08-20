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
    <StyledUserRegisterContainer>
      <legend>사용자 등록</legend>
      <StyledItemContainer>
        <span>이름</span>
        <label className="user-name" htmlFor="user-name">
          <input
            id="user-name"
            name="user-name"
            defaultValue={userName}
            type="text"
            onChange={handleChangeName}
          />
        </label>
      </StyledItemContainer>
      <StyledItemContainer>
        <span>성별</span>
        <label className="gender" htmlFor="male">
          <input
            id="male"
            name="gender"
            value={100323}
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
            value={100324}
            type="radio"
            onClick={(e) => saveGender(e.target.value)}
            defaultChecked={GENDER_TO_STRING[userGender] === '여성'}
          />
          여성
        </label>
      </StyledItemContainer>
    </StyledUserRegisterContainer>
  );
};

const StyledUserRegisterContainer = styled.fieldset`
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

const StyledItemContainer = styled.p`
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  > span {
    ////////////////////////////////여기기기기기
    align-self: flex-start;
    margin-left: 20%;
  }

  //// TODO: 아직...
  > label.user-name {
    > input {
      :focus {
        box-shadow: 0px 0px 10px 2px #fffdfa;
      }
    }
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
      border: 2px solid #ccc; //////////////////////////////////이거거거ㅓ거거
      border-radius: 50%;
      transition: 0.1s all ease-in-out;

      :checked {
        border: 4px solid #9554f7; //////////////////////////////////이거거거ㅓ거거
      }

      @media screen and (max-width: 480px) {
        & {
          width: 0.7rem;
          height: 0.7rem;
          margin-right: 0.3rem;
        }

        :checked {
          border: 3.5px solid #9554f7; //////////////////////////////////이거거거ㅓ거거
        }
      }
    }
  }
`;

export default UserRegister;
