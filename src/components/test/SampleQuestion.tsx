import React from 'react';
import styled from 'styled-components';
import { SAMPLE_DESCRIPTION } from '@/constants/test';
import Question from './Question';

const SampleQuestion = () => (
  <div>
    <SSampleDescription>{SAMPLE_DESCRIPTION}</SSampleDescription>
    <Question number={0} />
  </div>
);

const SSampleDescription = styled.p`
  font-size: 1.3rem;
  margin-bottom: 5vh;
  text-align: justify;

  @media screen and (max-width: 480px) {
    font-size: 1rem;
  }
`;

export default SampleQuestion;
