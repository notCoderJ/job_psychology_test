import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { actions, selector } from '../../store/modules';
import { GENDER } from '../../constants';
import { COLOR_DARKSET } from '../../variables';

const UserGender = React.forwardRef((props, ref) => {
  const dispatch = useDispatch();
  const userGender = useSelector(selector.getUserGender);

  const handleGender = (e) => {
    const gender = e.target.value;
    if (gender === userGender) {
      return;
    }

    dispatch(actions.saveGender(gender));
  };

  return (
    <StyledFieldset>
      <legend>성별</legend>
      <ul>
        <li>
          <StyledLabel htmlFor="genderMale">
            <input
              ref={ref}
              id="genderMale"
              name="userGender"
              value={GENDER['남성']}
              type="radio"
              onClick={handleGender}
              defaultChecked={userGender === GENDER['남성']}
            />
            남성
          </StyledLabel>
        </li>
        <li>
          <StyledLabel htmlFor="genderFemale">
            <input
              id="genderFemale"
              name="userGender"
              value={GENDER['여성']}
              type="radio"
              onClick={handleGender}
              defaultChecked={userGender === GENDER['여성']}
            />
            여성
          </StyledLabel>
        </li>
      </ul>
    </StyledFieldset>
  );
});

const StyledFieldset = styled.fieldset`
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

  > ul {
    width: fit-content;
    display: flex;
    flex-direction: column;
    list-style: none;
    padding: 0;
  }
`;

const StyledLabel = styled.label`
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

export default UserGender;
