import React, { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import selector from '../../store/selector';
import ResultChart from './chart';
import { VIEW_OF_VALUES } from '../../constants';

const JobValuesResult = () => {
  // TODO: 가장 높은 가치에 대한 설명 표시하기
  const userName = useSelector(selector.getUserName);
  const [firstHighLevelValue, secondHighLevelValue] = useSelector(
    selector.getTwoHighLevelValues,
  );

  // CHECK DATA
  useEffect(() => {
    console.log('hurry up!');
  }, []);

  const valueNames = useMemo(() => Object.keys(VIEW_OF_VALUES), []);
  const firstPriorityValuesName = useMemo(
    () => valueNames[firstHighLevelValue - 1],
    [valueNames, firstHighLevelValue],
  );
  const secondPriorityValuesName = useMemo(
    () => valueNames[secondHighLevelValue - 1],
    [valueNames, secondHighLevelValue],
  );

  return (
    <StyledJobValuesResult>
      <StyledResultSummary>
        {`직장생활과 관련하여 ${userName}님은 ${firstPriorityValuesName}과(와) ${secondPriorityValuesName}을(를) 가장 중요하게 생각합니다. `}
        <br />
        {`반면에 ${null}, ${null}은(는) 상대적으로 덜 중요하게 생각합니다.`}
      </StyledResultSummary>
      <StyledResultAnalysisContainer>
        <ResultChart labels={valueNames} />
        <div>dfsdkfnsdklfnsdlk</div>
      </StyledResultAnalysisContainer>
    </StyledJobValuesResult>
  );
};

const StyledJobValuesResult = styled.div``;

const StyledResultSummary = styled.p`
  width: 100%;
  text-align: justify;
  font-weight: bold;
  font-size: 1.2rem;
`;

const StyledResultAnalysisContainer = styled.div`
  /* display: flex; */
  /* justify-content: space-between; */
  width: 50%;
  height: 50vh; // 조정해야대아아아아
  margin-top: 3rem;

  @media screen and (max-width: 480px) {
    width: 100%;
  }
`;

export default JobValuesResult;
