import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import selector from '../../store/selector';
import { COLOR_DARKSET } from '../../variables';
// import * as palette from '../../variables';

// Need
//  1. Total questions count(length)
//  2. Current answer recode count
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
  width: 73%;
  height: 15vh;

  @media screen and (max-width: 480px) {
    height: 13vh;
  }
`;

const StyledPercentageBoard = styled.div`
  align-self: flex-end;
  display: flex;
  /* justify-content: space-around; */
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 0.8rem;

  @media screen and (max-width: 480px) {
    height: 12%;
    font-size: 1.5rem; // 글씨만 조정 필요
    margin-bottom: 1.8rem;
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
  /* background-color: #9a5dd3; */ // TODO: 색감 찾기!
  opacity: 0.9;
  transition: all 300ms linear;

  @media screen and (max-width: 480px) {
  }
`;

export default ProgressBar;
