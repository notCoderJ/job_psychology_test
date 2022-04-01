import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { COMPLETE_DESCRIPTION } from '../../constants/complete';
import { COLOR_DARKSET } from '../../variables';
import { PageLayout, Button, ResultDescription } from '../common';

const CompletePage = () => (
  <PageLayout
    header={<StyledCompleteTitle>검사가 완료되었습니다.</StyledCompleteTitle>}
    main={
      <StyledCompleteContainer>
        <p>{COMPLETE_DESCRIPTION}</p>
        <p>
          <ResultDescription />
        </p>
        <Link to="/result">
          <Button>결과 보기</Button>
        </Link>
      </StyledCompleteContainer>
    }
  />
);

const StyledCompleteTitle = styled.h1`
  font-size: 3rem;
  color: ${COLOR_DARKSET.HIGHLIGHT_TITLE};
  @media screen and (max-width: 480px) {
    font-size: 2rem;
    word-break: keep-all;
  }
`;

const StyledCompleteContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > p:first-child {
    @media screen and (max-width: 480px) {
      margin-top: 1rem;
    }
  }

  > p + p {
    margin-top: 0.3rem;
    margin-bottom: 5vh;
  }
`;

export default CompletePage;
