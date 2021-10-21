import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled, { css } from 'styled-components';
import { VIEW_OF_VALUES } from '../../constants';
import { actions, selector } from '../../store/modules';
import { getFixedDigits } from '../../utils';
import { COLOR_DARKSET } from '../../variables';

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
        actions.saveAnswer({
          questionNumber,
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
  );
};

const StyledQuestion = styled.fieldset`
  border: solid ${COLOR_DARKSET.QUESTION_BORDER} 2px;
  border-radius: 5px;
  background-color: ${COLOR_DARKSET.QUESTION_BOX};

  @media screen and (max-width: 480px) {
    & {
      padding: 0 0.8rem;
    }
  } ;
`;

const StyledDescription = styled.legend`
  background-color: ${COLOR_DARKSET.QUESTION_DESCRIPTION};
  width: 72%;
  font-weight: bold;
  font-size: 1.2rem;
  text-align: center;
  padding: 0.4rem 1.6rem;
  margin: auto;
  border-radius: 10px;

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
      justify-content: space-around;
      font-size: 0.9rem;
      margin: 1rem 8%;
    }
  }

  > label {
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
      border: 2px solid ${COLOR_DARKSET.CHECKBOX_BORDER};
      border-radius: 50%;
      transition: 0.1s all ease-in-out;
      cursor: pointer;

      :checked {
        border: 5px solid ${COLOR_DARKSET.CHECKBOX};
      }

      @media screen and (max-width: 480px) {
        & {
          width: 0.7rem;
          height: 0.7rem;
          margin-right: 0.3rem;
        }

        :checked {
          border-width: 3.5px;
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
};

const StyledQuestions = styled.div`
  ${(props) => props?.sample && css``}

  & > fieldset + fieldset {
    margin-top: 5vh;
  }
`;

export default Questions;
