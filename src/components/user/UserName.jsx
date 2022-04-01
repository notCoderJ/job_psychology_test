import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { actions, selector } from '../../store/modules';
import { COLOR_DARKSET } from '../../variables';

const UserName = React.forwardRef((props, ref) => {
  const dispatch = useDispatch();
  const userName = useSelector(selector.getUserName);

  return (
    <StyledLabel htmlFor="userName">
      <input hidden type="text" />
      <input
        ref={ref}
        id="userName"
        defaultValue={userName}
        placeholder="이름을 입력해주세요."
        type="text"
        onChange={(e) => {
          const name = e.target.value;
          dispatch(actions.saveName(name));
        }}
      />
    </StyledLabel>
  );
});

const StyledLabel = styled.label`
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

export default UserName;
