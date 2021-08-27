import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import selector from '../../store/selector';
import ResultChart from './chart';
import { VIEW_OF_VALUES } from '../../constants';
import ValueDescription from './valueDescriptions';
import { COLOR_DARKSET } from '../../variables';

const JobValuesResult = () => {
  // TODO: 가장 높은 가치에 대한 설명 표시하기
  const psychologyTestReulstText = useSelector(
    selector.getPsychologyTestReulstText,
  );

  const valueNames = useMemo(() => Object.keys(VIEW_OF_VALUES), []);

  // TODO: 로오디딩
  return (
    <StyledJobValuesResult>
      <StyledResultSummary>{psychologyTestReulstText}</StyledResultSummary>
      <StyledResultAnalysisContainer>
        <StyledResultChartContainer>
          <ResultChart labels={valueNames} />
          <StyledAdditionalNotice>
            위 차트 영역을 선택하시면 해당 가치관에 대한 설명을 확인할 수
            있습니다.
          </StyledAdditionalNotice>
        </StyledResultChartContainer>
        <StyledValueDescriptionContainer>
          <ValueDescription labels={valueNames} />
        </StyledValueDescriptionContainer>
      </StyledResultAnalysisContainer>
    </StyledJobValuesResult>
  );
};

const StyledJobValuesResult = styled.div``;

const StyledResultSummary = styled.p`
  width: 100%;
  text-align: left;
  font-size: 1.2rem;

  @media screen and (max-width) {
    text-align: center;
  }
`;

// 와 그래프 높이 왜이러니...제밟르ㅏ라랇
const StyledResultAnalysisContainer = styled.div`
  display: flex;
  justify-content: space-between; // around?
  align-items: center;
  width: 100%;
  height: 50vh;
  margin-top: 3rem;

  @media screen and (max-width: 1024px) {
    flex-direction: column;
    align-items: center;
    height: fit-content;
  }
`;

const StyledResultChartContainer = styled.article`
  width: 30vw;
  height: 50vh;

  @media screen and (max-width: 1024px) {
    width: 55vw;
  }

  @media screen and (max-width: 480px) {
    width: 80vw;
  }
`;

const StyledAdditionalNotice = styled.p`
  font-size: 0.8rem;
  margin-top: 0.3rem;
  color: ${COLOR_DARKSET.HIGHLIGHT_TEXT};
`;

const StyledValueDescriptionContainer = styled.article`
  width: 50%;

  @media screen and (max-width: 1024px) {
    width: 90%;
    margin-top: 6%;
  }
`;

export default JobValuesResult;
