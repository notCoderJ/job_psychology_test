import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, PageLayOut } from '../common';
import Polar from './chart';

// TODO:지금 바로 작업 중...
const PsychologyTestResult = () => {
  const history = useHistory();
  useEffect(() => {
    console.log('요기느느느으으응 결과!', history);
    history[0] = history[history.length - 1];
    history.length = 1;
  }, [history]);

  // const handleMoveTest = useCallback(() => {
  //   history.go(-2);
  // }, [history]);

  // TODO: 임시, 초기화 작업 <a> 태그로 히스토리 없애거나 다른 방법 찾아봐야 함!!
  return (
    <PageLayOut
      main={
        <>
          <Polar />
          <a href="/">
            <Button />
          </a>
        </>
      }
    />
  );
};
// <Link to="/" replace>
// </Link>

export default PsychologyTestResult;
