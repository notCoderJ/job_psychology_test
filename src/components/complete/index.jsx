import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import api from '../../api';
import { actionCreator } from '../../store/reducer';
import selector from '../../store/selector';
import { PageLayout, Button } from '../common';
// import styled from 'styled-components';

const PsychologyTestComplete = () => {
  const { seq } = useParams();
  const dispatch = useDispatch();
  const isResultLoaded = useSelector(selector.isResultLoaded);
  const twoHighLevelValues = useSelector(selector.getTwoHighLevelValues);

  const loadResultData = useCallback(
    (resultData) => dispatch(actionCreator.loadResult(resultData)),
    [dispatch],
  );

  const loadJobData = useCallback(
    (jobData) => dispatch(actionCreator.loadJobData(jobData)),
    [dispatch],
  );

  useEffect(() => {
    (async () => {
      try {
        loadResultData(await api.getResultData(seq));
      } catch (err) {
        console.error(err); // TODO: loading으로 변경?
      }
    })();
  }, [seq, loadResultData]);

  useEffect(() => {
    if (!twoHighLevelValues) {
      return;
    }

    (async () => {
      try {
        // ??? 이시점에 값이 변해서 가져올까 확인해보자!
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
  }, [twoHighLevelValues, loadJobData]);

  // TEST
  useEffect(() => {
    console.log('sdfsfjml;msd;');
  }, []);

  // TODO: 지금 바로 작업 중... Loading부분 좀 수정 좀 해야겠다...
  return (
    <PageLayout
      main={
        isResultLoaded ? (
          <Link to={`/result/${seq}`} replace>
            <Button />
          </Link>
        ) : (
          <h1>Loading...</h1>
        )
      }
    />
  );
};

export default PsychologyTestComplete;
