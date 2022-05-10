import React, { useImperativeHandle, useRef, ChangeEvent } from 'react';
import styled from 'styled-components';
import { actions, selector } from '@/store/modules';
import { useTypedDispatch, useTypedSelector } from '@/hooks/redux';
import { COLOR_DARKSET } from '@/variables';

export interface UserNameInputRef {
  focus: () => void;
}

const UserName: React.ForwardRefRenderFunction<UserNameInputRef> = (_, ref) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useTypedDispatch();
  const userName: string = useTypedSelector(selector.getUserName);

  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current?.focus();
    },
  }));

  return (
    <SLabel htmlFor="userName">
      <input hidden type="text" />
      <input
        ref={inputRef}
        id="userName"
        defaultValue={userName}
        placeholder="이름을 입력해주세요."
        type="text"
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          const name: string = e.target.value;
          dispatch(actions.saveName(name));
        }}
      />
    </SLabel>
  );
};

const SLabel = styled.label`
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

export default React.forwardRef<UserNameInputRef>(UserName);
