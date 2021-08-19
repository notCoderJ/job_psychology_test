import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled, { css } from 'styled-components';
import actionCreators from '../../store/actions';

const Question = ({ number }) => {
  const dispatch = useDispatch();
  const { questionItem, defaultAnswerOptions, answer } = useSelector(
    (state) => ({
      questionItem: state.questions[number],
      defaultAnswerOptions: state.questions[number]?.defaultAnswerOptions,
      answer: state.answers[number],
    }),
  );

  const saveAnswers = useCallback(
    (questionNumber, answerScore) =>
      dispatch(actionCreators.saveAnswers(questionNumber, answerScore)),
    [],
  );

  const prefixNumber = useCallback(
    (num) => (num < 10 ? `0${num}` : `${num}`),
    [],
  );

  // TEST CODE
  useEffect(() => {
    console.log('mount', number);
    // console.log(answer);

    return () => console.log('unmount', number);
  }, []);

  return (
    <StyledQuestion>
      <StyledDescription>
        <span>{questionItem.question}</span>
      </StyledDescription>
      <StyledAnswerContainer>
        {defaultAnswerOptions.map((answerOption, index) => {
          const name = `qitemNo${prefixNumber(number)}-option`;
          const id = `${name}${prefixNumber(index + 1)}`;

          return (
            <label htmlFor={id} key={id}>
              <input
                id={id}
                key={id}
                name={name}
                type="radio"
                value={answerOption[1]}
                defaultChecked={answer === answerOption[1]}
                onClick={(e) => saveAnswers(number, e.target.value)}
              />
              {answerOption[0]}
            </label>
          );
        })}
      </StyledAnswerContainer>
    </StyledQuestion>
  ); // TODO: key redefine
};

// TODO : 반응형 사이즈 추가 예정 : 768px, 1024px

const StyledQuestion = styled.fieldset`
  border: solid #fffdfa 2px;
  border-radius: 5px;
  color: #fffdfa;

  @media screen and (max-width: 480px) {
    & {
      padding: 0 0.8rem;
    }
  } ;
`;

const StyledDescription = styled.legend`
  background-color: #a899d8;
  width: 72%;
  font-weight: bold;
  font-size: 1.2rem;
  text-align: center; // TODO: 2줄이상일 때는 양쪽 정렬하게 변경해보기!
  padding: 0.8rem 1.6rem;
  margin: auto;
  border-radius: 10px;

  @media screen and (max-width: 480px) {
    & {
      width: 87%;
      font-size: 0.9rem;
      padding: 0.5rem 0.6rem;
    }
  } ;
`;

const StyledAnswerContainer = styled.p`
  display: flex;
  justify-content: space-between;
  font-size: 1.3rem;
  padding: 2rem 23%;

  @media screen and (max-width: 480px) {
    & {
      font-size: 1rem;
      padding: 1.5rem 8%;
    }
  }

  > label {
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;

    > input {
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;

      width: 1rem;
      height: 1rem;
      margin-right: 0.5rem;
      border: 2px solid #ccc;
      border-radius: 50%;
      transition: 0.1s all ease-in-out;
      cursor: pointer;

      :checked {
        border: 5px solid #9554f7;
      }

      @media screen and (max-width: 480px) {
        & {
          width: 0.7rem;
          height: 0.7rem;
          margin-right: 0.3rem;
        }

        :checked {
          border: 3.5px solid #9554f7;
        }
      }
    }
  }
`;

const Questions = ({ visibleQuestionNumbers }) => (
  <StyledQuestions sample={visibleQuestionNumbers?.length === 1}>
    {visibleQuestionNumbers.map((number) => (
      <Question key={number} number={number} />
    ))}
  </StyledQuestions>
); // TODO: key redefine

const StyledQuestions = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-btween;
  margin: 0 12%;
  ${(props) =>
    props?.sample &&
    css`
      justify-content: center;
    `}

  & > fieldset + fieldset {
    margin-top: 5vh;
  }
`;

export default Questions;
