import React, { useState, useEffect, useCallback } from 'react';
import { Link, useParams } from 'react-router-dom';
import api from '../../api';
import { MONTHS, WEEKDAYS } from '../../constants/result';
import { GENDER_NAMES } from '../../constants';
import { getFixedDigits, getParsedResult } from '../../utils';
import { PageLayOut, Button } from '../common';
// import styled from 'styled-components';

const PsychologyTestComplete = () => {
  const { seq } = useParams();
  const [resultInfo, setResultInfo] = useState(null);

  const getParsedData = useCallback((data) => {
    const { user, inspct, result } = data;
    const dateInfo = new Date(inspct?.registDt);
    const inspectionDate = `${dateInfo.getFullYear()}.${getFixedDigits(
      MONTHS[dateInfo.getMonth()],
    )}.${dateInfo.getDate()}(${WEEKDAYS[dateInfo.getDay()]})`;
    const parsedResult = getParsedResult(inspct?.qestnrSeq, result);

    // TODO: email, birthday 항목 추가 고려 중...
    return {
      user: {
        name: user.name,
        gender: GENDER_NAMES[user.gender] || GENDER_NAMES[inspct.sexdstn],
        type: user.targetNm,
      },
      inspect: {
        type: inspct.qestnrNm,
        date: inspectionDate,
      },
      result: parsedResult,
    };
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const res = await api.getResultData(seq);
        const parsedData = getParsedData(res);
        // TODO: functionify
        parsedData.jobs = await Promise.all([
          api.getAverageJobInfoByType('grade', [
            parsedData.result.firstHighValue,
            parsedData.result.secondHighValue,
          ]),
          api.getAverageJobInfoByType('major', [
            parsedData.result.firstHighValue,
            parsedData.result.secondHighValue,
          ]),
        ]); // end

        setResultInfo(parsedData);
      } catch (err) {
        console.error(err); // TODO: loading으로 변경?
      }
    })();
  }, [seq, getParsedData]);

  // TEST
  useEffect(() => {
    console.log(resultInfo);
  }, [resultInfo]);

  // TODO: 지금 바로 작업 중...
  return (
    <PageLayOut
      main={
        <Link
          to={{
            pathname: `/result/${seq}`,
            state: { resultInfo },
          }}
          replace
        >
          <Button />
        </Link>
      }
    />
  );
};

export default PsychologyTestComplete;
