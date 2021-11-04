import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

  return (
    <StyledQuestions>
      {questionNumbers.map((number) => (
        <Question key={`question-${number}`} number={number} />
      ))}
    </fieldset>
  );
};

const StyledQuestions = styled.div`
  width: 100%;

  & > fieldset + fieldset {
    margin-top: 5vh;
  }
`;

export default Questions;
