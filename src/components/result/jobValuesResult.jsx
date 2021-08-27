import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import selector from '../../store/selector';
import ResultChart from './chart';
import { VIEW_OF_VALUES } from '../../constants';
import ValueDescription from './valueDescriptions';

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
        <ResultChart labels={valueNames} />
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
  margin-top: 3rem;

  @media screen and (max-width: 1024px) {
    flex-direction: column;
    align-items: center;
  }
`;

const StyledValueDescriptionContainer = styled.article``;

export default JobValuesResult;
