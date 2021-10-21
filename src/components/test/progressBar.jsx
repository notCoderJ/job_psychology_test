import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { selector } from '../../store/modules';
import { COLOR_DARKSET } from '../../variables';

const ProgressBar = () => {
  const percentage = useSelector(selector.getCurrentPercentage);

  return (
    <StyledProgressBarContainer>
      <StyledPercentageBoard>
        <span>검사 진행률</span>
        <span>{percentage}%</span>
      </StyledPercentageBoard>
      <StyledProgressBar>
        <ProgressBarGage percentage={percentage} />
      </StyledProgressBar>
    </StyledProgressBarContainer>
  );
};

const StyledProgressBarContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: auto;

  align-items: center;
  height: 15vh;

  @media screen and (max-width: 480px) {
    height: 13vh;
  }
`;

const StyledPercentageBoard = styled.div`
  align-self: flex-end;
  display: flex;
  font-size: 1.8rem;
  font-weight: bold;
  margin: 0 1rem 0.8rem;

  > span + span {
    margin-left: 0.5rem;
    @media screen and (max-width: 480px) {
      margin-left: 0.3rem;
    }
  }

  @media screen and (max-width: 480px) {
    height: 12%;
    font-size: 1.5rem;
    margin: 0 0.5rem 1.8rem;
  }
`;

const StyledProgressBar = styled.div`
  width: 100%;
  height: 12%;
  border-radius: 10vh;
  border: solid 0.25vh ${COLOR_DARKSET.PROGRESSBAR_EDGE};
  margin-bottom: 2vh;

  @media screen and (max-width: 480px) {
    height: 11%;
    margin-bottom: 1.5vh;
  }
`;

const ProgressBarGage = styled.div`
  width: ${(props) => props.percentage}%;
  height: 100%;
  border-radius: 10vh;
  background-color: ${COLOR_DARKSET.PROGRESSBAR_GAGE};
  opacity: 0.9;
  transition: all 300ms linear;

  @media screen and (max-width: 480px) {
  }
`;

export default ProgressBar;
