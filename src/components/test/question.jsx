import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions, selector } from '../../store/modules';
import { getFixedDigits } from '../../utils';

const Question = ({ number }) => {
  const dispatch = useDispatch();
  const { description, defaultAnswerOptions } = useSelector(
    selector.getQuestion(Number(number)),
  );
  const answer = useSelector(selector.getAnswer(number));

  const saveAnswer = useCallback(
    (questionNumber, answerScore) =>
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
      saveAnswer(number, e.target.value);
    },
    [answer, saveAnswer, number],
  );

  return (
    <fieldset>
      <legend>
        <span>{description}</span>
      </legend>
      <p>
        {defaultAnswerOptions.map(({ option, score, optionDesc }, index) => {
          const name = `question${getFixedDigits(number)}-answer-option`;
          const id = `${name}${getFixedDigits(index + 1)}`;

          return (
            <label htmlFor={id} key={id}>
              <input
                id={id}
                key={id}
                name={name}
                type="radio"
                value={score}
                defaultChecked={answer === score}
                onClick={handleCheckAnswer}
              />
              {option}
              {optionDesc}
            </label>
          );
        })}
      </p>
    </fieldset>
  );
};

export default Question;
