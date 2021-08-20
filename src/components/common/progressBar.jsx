import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

// Need
//  1. Total questions count(length)
//  2. Current answer recode count
const ProgressBar = () => {
  const { questions, answerCount } = useSelector((state) => state);
  const percentage = useMemo(() => {
    if (answerCount <= 1) {
      return 0;
    }

    const floatPercent = ((answerCount - 1) / (questions.length - 1)) * 100;
    return floatPercent > 99
      ? Math.floor(floatPercent)
      : Math.ceil(floatPercent);
  }, [questions.length, answerCount]);

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
    margin-bottom: 1.5rem;
  }
`;

const StyledProgressBar = styled.div`
  width: 100%;
  height: 18%;
  border-radius: 10vh;
  border: solid 0.25vh #9e9c9e;
  margin-bottom: 3vh;

  @media screen and (max-width: 480px) {
    height: 11%;
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
  @media screen and (max-width: 480px) {
  }
`;

export default ProgressBar;
