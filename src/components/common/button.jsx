import React from 'react';
import styled, { css } from 'styled-components';

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
  border-style: none;
  border-radius: 10px;
  background-color: #9554f7;
  color: #ffedfe;
  font-size: 1.2rem;
  font-weight: bold;
  padding: 1rem 2.5rem;
  letter-spacing: 1px;
  transition: all 0.1s ease-in-out;
  /* box-shadow: 1px 1px 3px 1px rgba(30, 18, 46, 0.9); */ // light
  box-shadow: 1px 1px 3px 1px rgba(197, 161, 229, 0.57); // dark
  /* margin: 20px 20px; // 임시 */

  :hover {
    ${(props) =>
      !props.disabled &&
      css`
        box-shadow: 0px 0px 10px 1px rgba(248, 227, 252, 0.57); // dark
        /* transform: scale(1.03); */ // light
      `}
  }

  :active {
    box-shadow: none;
    opacity: 0.8;
    /* box-shadow: inset 1px 1px 3px 1px rgba(30, 18, 46, 0.9); */ // light
    box-shadow: inset 1px 1px 3px 1px rgba(197, 161, 229, 0.57); // dark
  }

  @media screen and (max-width: 480px) {
    & {
      font-size: 1rem;
      padding: 0.8rem 1.3rem;
      // TODO: 버튼 변경되도록
    }
  }
`;

export default Button;
