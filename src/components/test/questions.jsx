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
      // TODO: 문항 클릭 시 다음 문항으로 스크롤 기능
      // const width = ref.current.clientWidth;
      // const height = ref.current.clientHeight;
      // console.log(ref);
      // console.log(width, height, height / 5);
      // ref.current.scrollIntoView(); // (0, 1000);
      // window.scrollTo(0, height); // (0, 1000);
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
