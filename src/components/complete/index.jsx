import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { COMPLETE_DESCRIPTION } from '../../constants/complete';
import { selector } from '../../store/modules';
import { COLOR_DARKSET } from '../../variables';
import { PageLayout, Button } from '../common';

const PsychologyTestComplete = () => {
  const psychologyTestReulstText = useSelector(
    selector.getPsychologyTestReulstText,
  );

  return (
    <PageLayout
      header={<StyledCompleteTitle>검사가 완료되었습니다.</StyledCompleteTitle>}
      main={
        <StyledCompleteContainer>
          <p>{COMPLETE_DESCRIPTION}</p>
          <p>{psychologyTestReulstText}</p>
          <Link to="/result" replace>
            <Button>결과 보기</Button>
          </Link>
        </StyledCompleteContainer>
      }
    />
  );
};

const StyledCompleteTitle = styled.h1`
  /* height: 15vh; */
  /* margin-top: 5vh; */
  font-size: 3rem;
  color: ${COLOR_DARKSET.HIGHLIGHT_TITLE};
  @media screen and (max-width: 480px) {
    font-size: 2rem;
    word-break: keep-all;
  }
`;

const StyledCompleteContainer = styled.div`
  /* height: 40vh; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > p:first-child {
    /* margin-top: 25vh; */

    @media screen and (max-width: 480px) {
      margin-top: 1rem;
    }
  }

  > p + p {
    margin-top: 0.3rem;
    margin-bottom: 5vh;
  }
`;

export default PsychologyTestComplete;
