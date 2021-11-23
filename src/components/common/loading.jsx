import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const Loading = () => (
  <StyledLoadingContainer>
    <FontAwesomeIcon icon={faSpinner} spin pulse />
  </StyledLoadingContainer>
);

const StyledLoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #00000052;
  font-size: 2rem;
  z-index: 99999;

  ::before {
    content: 'Loading';
    padding: 0 0.5rem;
    font-weight: bold;
    transform: translateY(-15%);
  }

  @media screen and (max-width: 480px) {
    font-size: 1.7rem;
  }
`;

export default Loading;
