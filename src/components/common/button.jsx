import React from 'react';
import styled, { css } from 'styled-components';
import * as palette from '../../variables';

const Button = ({ type, disabled, onClick, children }) => (
  <StyledButton type={type} disabled={disabled} onClick={onClick}>
    {children}
  </StyledButton>
);

const StyledButton = styled.button`
  cursor: pointer;
  ${(props) =>
    props.disabled &&
    css`
      cursor: not-allowed;
      opacity: 0.4;
    `};
  border-radius: 10px; /////////////////////////////////////이거거거ㅓ거거
  background-color: transparent;
  color: ${palette.COLOR_DARKSET.FONT};
  font-size: 1.2rem;
  font-weight: bold;
  border: solid 0.15rem ${palette.COLOR_DARKSET.BORDER};
  padding: 1rem 2.5rem;
  letter-spacing: 1px; //////////////////////////////////이거거거ㅓ거거
  transition: all 0.1s ease-in-out;

  :hover {
    ${(props) =>
      !props.disabled &&
      css`
        background-color: ${palette.COLOR_DARKSET.BUTTON};
      `}
  }

  :active {
    opacity: 0.8;
    box-shadow: inset 2px 2px 3px 2px ${palette.COLOR_DARKSET.SHADOW};
  }

  @media screen and (max-width: 480px) {
    // TODO: 모바일용 색조절...
    & {
      font-size: 1rem;
      padding: 0.7rem 1.2rem;
    }

    :active {
      box-shadow: inset 1px 1px 3px 1px ${palette.COLOR_DARKSET.SHADOW};
    }
  }
`;

export default Button;
