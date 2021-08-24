import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import selector from '../../store/selector';
// import * as palette from '../../variables';

// Need
//  1. Total questions count(length)
//  2. Current answer recode count
const ProgressBar = () => {
  const percentage = useSelector(selector.getCurrentPercentage);

  return (
    <StyledProgressBarContainer>
      <StyledPercentageBoard>{percentage}%</StyledPercentageBoard>
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
  align-items: center;
  color: #fffdfa;
  width: 73%;
  height: 100%;
  /* margin: 0 12%; */
`;

const StyledPercentageBoard = styled.span`
  align-self: flex-end;
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 0.5rem;

  @media screen and (max-width: 480px) {
    height: 12%;
    font-size: 1.5rem;
    margin-bottom: 1.6rem;
  }
`;

const StyledProgressBar = styled.div`
  width: 100%;
  height: 14%;
  border-radius: 10vh;
  border: solid 0.25vh #9e9c9e;
  margin-bottom: 3vh;

  @media screen and (max-width: 480px) {
    height: 13%;
    margin-bottom: 2vh;
  }
`;

// TODO: 5% 미만일 때 모양 이상함...
const ProgressBarGage = styled.div`
  width: ${(props) => props.percentage}%;
  height: 100%;
  border-radius: 10vh;
  background-color: #9554f7;
  opacity: 0.9;
  transition: all 300ms linear;

  @media screen and (max-width: 480px) {
  }
`;

export default ProgressBar;
