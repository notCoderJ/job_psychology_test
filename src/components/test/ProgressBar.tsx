import React from 'react';
import { useTypedSelector } from '@/hooks/redux';
import styled from 'styled-components';
import { selector } from '@/store/modules';
import { COLOR_DARKSET } from '@/variables';

interface ProgressBarProps {
  height?: string;
  width?: string;
}

interface SProgressBarGageProps {
  percentage: number;
}

const ProgressBar = ({ height, width }: ProgressBarProps) => {
  const percentage: number = useTypedSelector(selector.getCurrentPercentage);

  return (
    <SProgressBarContainer height={height} width={width}>
      <SPercentageBoard>
        <span>검사 진행률</span>
        <span>{percentage}%</span>
      </SPercentageBoard>
      <SProgressBar>
        <SProgressBarGage percentage={percentage} />
      </SProgressBar>
    </SProgressBarContainer>
  );
};

ProgressBar.defaultProps = {
  height: undefined,
  width: undefined,
};

const SProgressBarContainer = styled.div<ProgressBarProps>`
  width: ${(props) => props.width || '100%'};
  height: ${(props) => props.height || '15vh'};
  display: flex;
  flex-direction: column;
  justify-content: center;

  align-items: center;

  @media screen and (max-width: 480px) {
    height: ${(props) => props.height || '13vh'};
  }
`;

const SPercentageBoard = styled.div`
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

const SProgressBar = styled.div`
  width: 100%;
  height: 12%;
  border-radius: 10px;
  border: solid 0.25vh ${COLOR_DARKSET.PROGRESSBAR_EDGE};
  margin-bottom: 2vh;

  @media screen and (max-width: 480px) {
    height: 11%;
    margin-bottom: 1.5vh;
  }
`;

const SProgressBarGage = styled.div<SProgressBarGageProps>`
  width: ${(props) => props.percentage}%;
  height: 100%;
  border-radius: 10px;
  background-color: ${COLOR_DARKSET.PROGRESSBAR_GAGE};
  opacity: 0.9;
  transition: all 300ms linear;
`;

export default ProgressBar;
