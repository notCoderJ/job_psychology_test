import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled, { css } from 'styled-components';
import { VIEW_OF_VALUES } from '../../constants';
import { actionCreator } from '../../store/reducer';
import selector from '../../store/selector';
import { getFixedDigits } from '../../utils';

const Question = ({ number }) => {
  const dispatch = useDispatch();
  const {
    description: questionDescription,
    defaultAnswerOptions,
    answer,
  } = useSelector(selector.getQeustionInfo(number));

  const saveAnswer = useCallback(
    (questionNumber, answerDescription, answerScore) =>
      dispatch(
        actionCreator.saveAnswer({
          questionNumber,
          answerDescription,
          answerScore,
        }),
      ),
    [dispatch],
  );

  const handleCheckAnswer = useCallback(
    (e) => {
      if (e.target.value === answer) {
        return;
      }

      // TODO: 이거 처리가 좀 참...흠...쩝...
      saveAnswer(
        number,
        VIEW_OF_VALUES[e.target.nextSibling.textContent],
        e.target.value,
      );
    },
    [answer, saveAnswer, number],
  );

  return (
    <StyledQuestion>
      <StyledDescription>
        <span>{questionDescription}</span>
      </StyledDescription>
      <StyledAnswerContainer>
        {defaultAnswerOptions.map((answerOption, index) => {
          const name = `question${getFixedDigits(number)}-answer-option`;
          const id = `${name}${getFixedDigits(index + 1)}`;

          return (
            <label htmlFor={id} key={id}>
              <input
                id={id}
                key={id}
                name={name}
                type="radio"
                value={answerOption.score}
                defaultChecked={answer === answerOption.score}
                onClick={handleCheckAnswer}
              />
              {answerOption.description}
            </label>
          );
        })}
      </StyledAnswerContainer>
    </StyledQuestion>
  ); // TODO: key redefine
};

// TODO : 반응형 사이즈 추가 예정 : 768px, 1024px

const StyledQuestion = styled.fieldset`
  border: solid #a899d8 2px; //////////////////////////////////이거거거ㅓ거거
  border-radius: 5px; //////////////////////////////////이거거거ㅓ거거
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
  padding: 0.4rem 1.6rem;
  margin: auto;
  border-radius: 10px; //////////////////////////////////이거거거ㅓ거거

  @media screen and (max-width: 480px) {
    & {
      width: 87%;
      font-size: 0.85rem;
      padding: 0.3rem 0.6rem;
    }
  } ;
`;

const StyledAnswerContainer = styled.p`
  display: flex;
  justify-content: space-between;
  font-size: 1.3rem;
  margin: 1rem 23%;

  @media screen and (max-width: 480px) {
    & {
      font-size: 0.9rem;
      margin: 1rem 5%;
    }
  }

  > label {
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    padding: 0.5rem 0.5rem;

    @media screen and (max-width: 480px) {
      & {
        padding: 0.3rem 0.3rem;
      }
    }

    > input {
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;

      width: 1rem;
      height: 1rem;
      margin-right: 0.5rem;
      border: 2px solid #ccc; //////////////////////////////////이거거거ㅓ거거
      border-radius: 50%;
      transition: 0.1s all ease-in-out;
      cursor: pointer;

      :checked {
        border: 5px solid #9554f7; //////////////////////////////////이거거거ㅓ거거
      }

      @media screen and (max-width: 480px) {
        & {
          width: 0.7rem;
          height: 0.7rem;
          margin-right: 0.3rem;
        }

        :checked {
          border: 3.5px solid #9554f7; //////////////////////////////////이거거거ㅓ거거
        }
      }
    }
  }
`;

const Questions = () => {
  const visibleQuestionNumbers = useSelector(
    selector.getVisibleQuestionNumbers,
  );

  return (
    <StyledQuestions sample={visibleQuestionNumbers.length === 1}>
      {visibleQuestionNumbers.map((number) => (
        <Question key={`question-${number}`} number={number} />
      ))}
    </StyledQuestions>
  );
}; // TODO: key redefine

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
