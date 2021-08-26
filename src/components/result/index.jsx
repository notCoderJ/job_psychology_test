import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { RESULT_DESCRIPTION } from '../../constants/result';
import { COLOR_DARKSET } from '../../variables';
import { Button, PageLayout } from '../common';
import AverageJobsByTypes from './averageJobsByTypes';
import JobValuesResult from './jobValuesResult';
import UserInfo from './userInfo';
import ResultItemLayout from './resultItemLayout';

// TODO:지금 바로 작업 중...
const PsychologyTestResult = () => {
  const history = useHistory();

  useEffect(() => {
    console.log('요기느느느으으응 결과!', history);
  }, [history]);

  // const handleMoveTest = useCallback(() => {
  //   history.go(-2);
  // }, [history]);

  // TODO: 임시, 초기화 작업 <a> 태그로 히스토리 없애거나 다른 방법 찾아봐야 함!!
  return (
    <PageLayout
      header={
        <StyledPageMainTitle>
          <h1>직업가치관검사 결과표</h1>
          <StyledDivisionLine />
        </StyledPageMainTitle>
      }
      main={
        <StyledPsychologyTestResult>
          <StyledResultDescription>
            {RESULT_DESCRIPTION}
          </StyledResultDescription>
          <StyledUserInfoContainer>
            <UserInfo />
          </StyledUserInfoContainer>
          <ResultItemLayout
            title="1. 직업가치관 결과"
            contents={<JobValuesResult />}
          />
          <ResultItemLayout
            title="2. 나의 가치관과 관련이 높은 직업"
            contents={<AverageJobsByTypes />}
          />
        </StyledPsychologyTestResult>
      }
      footer={
        <a href="/">
          <Button>다시 검사하기</Button>
        </a>
      }
    />
  );
};
// <Link to="/" replace>
// </Link>

// TODO: 다 구현 후 반응형으로 mixin 적용하기!
const StyledPageMainTitle = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin-top: 5rem;
  font-size: 2rem;

  @media screen and (max-width: 480px) {
    font-size: 1.3rem;
  }
  @media screen and (max-width: 320px) {
    font-size: 1.1rem;
  }
`;

// TODO: 중복 코드 합치기 여기랑 jobValue
const StyledDivisionLine = styled.div`
  width: 31rem;
  height: 2px;
  background-color: ${COLOR_DARKSET.BORDER};
  margin-top: 0.5rem;
`;

const StyledPsychologyTestResult = styled.div`
  margin: 0 15%;

  @media screen and (max-width: 480px) {
    margin: 0 8%;
  }
`;

const StyledResultDescription = styled.p`
  text-align: justify;
  font-size: 1.2rem;
  margin-top: 4rem;
`;

const StyledUserInfoContainer = styled.section`
  display: flex;
  flex-direction: column;
  margin-top: 1.5rem;
`;

export default PsychologyTestResult;
