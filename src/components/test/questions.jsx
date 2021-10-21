import React from 'react';
import { useSelector } from 'react-redux';
import { selector } from '../../store/modules';
import Question from './question';

const Questions = ({ section }) => {
  const questionNumbers = useSelector(selector.getQuestionNumbers(section));

  console.log('리렌드링');

  return (
    <fieldset className="section">
      <legend>{`검사 페이지 ${section} - 검사 문항 1-5번`}</legend>
      {questionNumbers.map((number) => (
        <Question key={`question-${number}`} number={number} />
      ))}
    </fieldset>
  );
};

export default Questions;
