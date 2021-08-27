import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import api from '../../api';
import { COMPLETE_DESCRIPTION } from '../../constants/complete';
import { actionCreator } from '../../store/reducer';
import selector from '../../store/selector';
import { COLOR_DARKSET } from '../../variables';
import { PageLayout, Button } from '../common';

const PsychologyTestComplete = () => {
  const { seq } = useParams();
  const dispatch = useDispatch();
  const isResultLoaded = useSelector(selector.isResultLoaded);
  const twoHighLevelValues = useSelector(selector.getTwoHighLevelValues);
  const psychologyTestReulstText = useSelector(
    selector.getPsychologyTestReulstText,
  );
  const questionSeq = useSelector(selector.getQuestionSeq);

  const loadResultData = useCallback(
    (resultData) => dispatch(actionCreator.loadResult(resultData)),
    [dispatch],
  );

  const loadJobData = useCallback(
    (jobData) => dispatch(actionCreator.loadJobData(jobData)),
    [dispatch],
  );

  const loadValueDescriptions = useCallback(
    (valueDescriptions) =>
      dispatch(actionCreator.loadValueDescriptions(valueDescriptions)),
    [dispatch],
  );

  useEffect(() => {
    (async () => {
      try {
        loadResultData(await api.getResultData(seq));
        loadValueDescriptions(await api.getValuesDescription(questionSeq));
      } catch (err) {
        console.error(err); // TODO: loading으로 변경?
      }
    })();
  }, [seq, questionSeq, loadResultData, loadValueDescriptions]);

  useEffect(() => {
    if (!twoHighLevelValues) {
      return;
    }

    (async () => {
      try {
        loadJobData(
          await Promise.all([
            api.getAverageJobInfoByType('grade', twoHighLevelValues),
            api.getAverageJobInfoByType('major', twoHighLevelValues),
          ]),
        );
      } catch (err) {
        console.error(err); // TODO: loading으로 변경?
      }
    })();
  }, [twoHighLevelValues, loadJobData, questionSeq]);

  // TODO: 지금 바로 작업 중... Loading부분 좀 수정 좀 해야겠다...
  return (
    <PageLayout
      main={
        !isResultLoaded ? (
          <StyledLoadingMessage>Loading...</StyledLoadingMessage>
        ) : (
          <StyledPsychologyTestComplete>
            <h2>검사가 완료되었습니다.</h2>
            <p>{COMPLETE_DESCRIPTION}</p>
            <p>{psychologyTestReulstText}</p>
            <Link to={`/result/${seq}`} replace>
              <Button>결과 보기</Button>
            </Link>
          </StyledPsychologyTestComplete>
        )
      }
    />
  );
};

const StyledLoadingMessage = styled.h1`
  font-size: 5rem;
  line-height: 100vh;
`;

const StyledPsychologyTestComplete = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 15vh;
  height: 65vh;

  > h2 {
    font-size: 3rem;
    color: ${COLOR_DARKSET.HIGHLIGHT_TITLE};

    @media screen and (max-width: 480px) {
      font-size: 2rem;
      word-break: keep-all;
    }
  }

  > h2 + p {
    margin-top: 2rem;

    @media screen and (max-width: 480px) {
      margin-top: 1rem;
    }
  }

  > p + p {
    margin-top: 0.3rem;
    margin-bottom: 5vh;
  }
`;

export default PsychologyTestComplete;
