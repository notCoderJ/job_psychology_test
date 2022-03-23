import React, { useCallback, useRef } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { selector } from '../../store/modules';
import Question from './question';

const Questions = ({ section }) => {
  const ref = useRef(null);
  const questionNumbers = useSelector(selector.getQuestionNumbers(section));

  const handleClick = useCallback(
    (e) => {
      if (e.target.nodeName !== 'INPUT') {
        return;
      }
      ref.current.scrollTop = '0px';
    },
    [ref],
  );

  return (
    <StyledQuestions ref={ref} onClick={handleClick}>
      {questionNumbers.map((number) => (
        <Question key={`question-${number}`} number={number} />
      ))}
    </StyledQuestions>
  );
};

const StyledQuestions = styled.div`
  width: 100%;

  & > fieldset + fieldset {
    margin-top: 5vh;
  }
`;

export default Questions;
