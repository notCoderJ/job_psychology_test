import React, { MouseEventHandler, MouseEvent } from 'react';
import styled, { css } from 'styled-components';
import { NullableOne } from 'job-test';
import { actions, Answer, Questions, selector } from '@/store/modules';
import { useTypedDispatch, useTypedSelector } from '@/hooks/redux';
import { getFixedDigits } from '@/utils';
import { COLOR_DARKSET } from '@/variables';

interface QuestionProps {
  number: number;
}

interface SQuestionProps {
  answered: boolean;
}

interface SOptionProps {
  checked: boolean;
}

const Question = ({ number }: QuestionProps) => {
  const dispatch = useTypedDispatch();
  const question: NullableOne<Questions> = useTypedSelector(
    selector.getQuestion(Number(number)),
  );
  const answer: Answer = useTypedSelector(selector.getAnswer(number));

  const handleCheckAnswer: MouseEventHandler<HTMLInputElement> = (
    e: MouseEvent<HTMLInputElement>,
  ) => {
    const answerScore: string = (e.target as HTMLInputElement).value;
    if (answerScore === answer) {
      return;
    }

    dispatch(actions.saveAnswer({ questionNumber: number, answerScore }));
  };

  return (
    <SQuestion answered={!!answer}>
      <legend>{question && question.description}</legend>
      <SAnswer>
        {question &&
          question.defaultAnswerOptions.map(
            ({ option, score, optionDesc }, index) => {
              const name = `question${getFixedDigits(number)}-answer-option`;
              const id = `${name}${getFixedDigits(index + 1)}`;

              return (
                <React.Fragment key={id}>
                  <SOption htmlFor={id} checked={answer === score}>
                    {option}
                    <input
                      key={id}
                      id={id}
                      name={name}
                      type="radio"
                      value={score}
                      onClick={handleCheckAnswer}
                      aria-describedby={`${id}-desc`}
                    />
                  </SOption>
                  <span id={`${id}-desc`}>{optionDesc}</span>
                </React.Fragment>
              );
            },
          )}
      </SAnswer>
    </SQuestion>
  );
};

const SQuestion = styled.fieldset<SQuestionProps>`
  position: relative;
  border: solid 2px ${COLOR_DARKSET.BORDER};
  border-radius: 5px;
  padding: 0;
  background-color: #ffffff5a;
  backdrop-filter: blur(15px);
  transition: all 300ms ease-in-out;

  ${(props) =>
    props.answered &&
    css`
      opacity: 0.5;
      :hover {
        opacity: 1;
      }
    `}

  ::before {
    content: '두 개 가치 중에 자신에게 더 중요한 가치를 선택하세요.';
    display: block;
    max-width: fit-content;
    font-size: 1.15rem;
    padding: 0.4rem 1.15rem;
    margin: auto;
    color: transparent;
  }

  > legend {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    border-bottom: solid 1px ${COLOR_DARKSET.BORDER};
    background-color: ${COLOR_DARKSET.QUESTION_DESCRIPTION};

    font-size: 1.15rem;
    padding: 0.4rem 1.15rem;
  }

  @media screen and (max-width: 780px) {
    ::before {
      font-size: 1rem;
      padding: 0.4rem 1rem;
    }
    > legend {
      font-size: 1rem;
      padding: 0.4rem 1rem;
    }
  }
`;

const SAnswer = styled.div`
  display: grid;
  grid-template:
    'opt1 opt2' 1fr
    'desc desc' 2.5rem / 1fr 1fr;

  :hover {
    > span {
      font-size: 0;
    }
  }

  ::after {
    content: '';
    grid-area: desc;
    border-top: dashed 1px ${COLOR_DARKSET.BORDER};
  }

  > span {
    display: block;
    grid-area: desc;
    place-self: center center;
    padding: 0 1rem;
    font-size: 0;
  }

  @media screen and (max-width: 780px) {
    grid-template-rows: 1fr 3.5rem;
  }
`;

const SOption = styled.label<SOptionProps>`
  place-self: center center;
  width: fit-content;
  padding: 0.8rem 1.5rem;
  font-size: 1.1rem;
  cursor: pointer;

  ${(props) =>
    props.checked &&
    css`
      color: ${COLOR_DARKSET.OPTION_CHECKED};
      font-weight: bold;
      + span {
        color: ${COLOR_DARKSET.OPTION_CHECKED};
        font-size: 1rem;
      }
    `}

  :hover {
    color: ${COLOR_DARKSET.OPTION_CHECKED};
    + span {
      font-size: 1rem;
    }
  }

  > input {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    width: 0;
    height: 0;
    padding: 0;
    margin: 0;
  }

  @media screen and (max-width: 480px) {
    font-size: 1rem;
    padding: 0.5rem 0;
    ${(props) =>
      props.checked &&
      css`
        + span {
          font-size: 0.85rem;
        }
      `}

    :hover {
      + span {
        font-size: 0.85rem;
      }
    }
  }
`;

export default React.memo(Question);
