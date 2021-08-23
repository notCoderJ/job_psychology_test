import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import api from '../../api';

const PsychologyTestComplete = () => {
  const history = useHistory();
  const { seq } = useParams();
  // report?apikey=인증키&qestrnSeq=심리검사변수

  useEffect(() => {
    (async () => {
      try {
        const res = await api.getResultData(seq);
        console.log(res);
      } catch (err) {
        console.error(err);
      }
    })();
    history.goBack();
  }, [history, seq]);

  return <></>;
};

export default PsychologyTestComplete;
