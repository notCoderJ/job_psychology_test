import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { selector } from '../../store/modules';
import Question from './question';

const Questions = ({ section }) => {
  const questionNumbers = useSelector(selector.getQuestionNumbers(section));

  return (
    <StyledQuestions>
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
