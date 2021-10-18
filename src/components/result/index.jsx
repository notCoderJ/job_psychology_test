import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { RESULT_DESCRIPTION } from '../../constants/result';
import { COLOR_DARKSET } from '../../variables';
import { Button, PageLayout } from '../common';
import AverageJobsByTypes from './averageJobsByTypes';
import JobValuesResult from './jobValuesResult';
import UserInfo from './userInfo';
import ResultItemLayout from './resultItemLayout';
import { actions } from '../../store/modules';

const PsychologyTestResult = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  // TODO: 시간되면 saga로 변경!!
  const handleReplay = useCallback(() => {
    dispatch(actions.initPage());
    dispatch(actions.initUser());
    dispatch(actions.initQuestion());
    dispatch(actions.initAnswer());
    dispatch(actions.initResult());

    history.replace('/exam');
  }, [dispatch, history]);

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
        <StyledButtonContainer>
          <Button onClick={handleReplay}>다시 검사하기</Button>
        </StyledButtonContainer>
      }
    />
  );
};

const StyledButtonContainer = styled.div`
  display: block;
  margin-top: 8vh;
  @media screen and (max-width: 480px) {
    margin-top: 6vh;
  }
`;

// TODO: 다 구현 후 반응형으로 mixin 적용하기!
const StyledPageMainTitle = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin-top: 5rem;
  font-size: 2rem;

  @media screen and (max-width: 480px) {
    font-size: 1.6rem;
    margin-top: 3rem;
    word-break: keep-all;
  }
`;

// TODO: 중복 코드 합치기 여기랑 jobValue, complete 페이지
const StyledDivisionLine = styled.div`
  width: 31rem;
  height: 2px;
  background-color: ${COLOR_DARKSET.BORDER};
  margin-top: 0.5rem;

  @media screen and (max-width: 480px) {
    width: 17rem;
  }
`;

const StyledPsychologyTestResult = styled.div`
  @media screen and (max-width: 480px) {
  }
`;

const StyledResultDescription = styled.p`
  text-align: justify;
  font-size: 1.2rem;
  margin-top: 4rem;

  @media screen and (max-width: 480px) {
    font-size: 1rem;
    margin-top: 2rem;
  }
`;

const StyledUserInfoContainer = styled.section`
  display: flex;
  flex-direction: column;
  margin-top: 1.5rem;
`;

export default PsychologyTestResult;
