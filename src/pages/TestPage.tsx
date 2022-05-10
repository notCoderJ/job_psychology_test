import React, {
  useMemo,
  useEffect,
  useRef,
  useState,
  FormEventHandler,
  FormEvent,
} from 'react';
import styled, { css } from 'styled-components';
import { NullableOne } from 'job-test';
import { actions, selector, QuestionNumbers } from '@/store/modules';
import { useTypedDispatch, useTypedSelector } from '@/hooks/redux';
import { PageLayout, Button, Loading } from '@/components/common';
import { ProgressBar, SampleQuestion, Question } from '@/components/test';

interface SFormProps {
  isSample: boolean;
}

interface SButtonProps {
  isSample: boolean;
}

const TestPage = () => {
  const ref = useRef<HTMLDivElement>(null);
  const dispatch = useTypedDispatch();
  const [currentPage, setCurrentPage] = useState(0);
  const pageCount: number = useTypedSelector(selector.getPageCount);
  const lastPage: number = useMemo(() => pageCount - 1, [pageCount]);
  const questionNumbers: NullableOne<QuestionNumbers> = useTypedSelector(
    selector.getQuestionNumbers(currentPage),
  );
  const isPageAnswered: boolean = useTypedSelector(
    selector.isPageAnswered(questionNumbers),
  );
  //
  const isResultLoading = useTypedSelector(selector.isResultLoading);

  useEffect(() => {
    if (!ref.current) {
      return;
    }
    ref.current.scrollTo(0, 0);
  }, [currentPage]);

  const handleSubmit: FormEventHandler<HTMLFormElement> = (
    e: FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();
    dispatch(actions.reqResult());
  };

  if (isResultLoading) {
    return <Loading />;
  }

  return (
    <PageLayout
      ref={ref}
      header={
        <SProgressBarContainer>
          <ProgressBar height="100%" />
        </SProgressBarContainer>
      }
      main={
        <SForm isSample={currentPage === 0} onSubmit={handleSubmit}>
          {currentPage === 0 ? (
            <SampleQuestion />
          ) : (
            <SQuestions>
              {questionNumbers &&
                questionNumbers.map((number) => (
                  <Question key={`question-${number}`} number={number} />
                ))}
            </SQuestions>
          )}
          <SButtonContainer isSample={currentPage === 0}>
            {currentPage > 0 && (
              <Button
                type="button"
                onClick={() => {
                  setCurrentPage((current: number): number =>
                    current === 0 ? current : current - 1,
                  );
                }}
              >
                이전
              </Button>
            )}
            <Button
              type={currentPage === lastPage ? 'submit' : 'button'}
              disabled={!isPageAnswered}
              onClick={() => {
                setCurrentPage((current: number): number =>
                  current === lastPage ? current : current + 1,
                );
              }}
            >
              {currentPage !== lastPage ? '다음' : '제출'}
            </Button>
          </SButtonContainer>
        </SForm>
      }
    />
  );
};

const SProgressBarContainer = styled.div`
  margin: 0 20vw;
  animation: 500ms ease-in forwards slide;
  @keyframes slide {
    from {
      height: 0;
      opacity: 0;
    }
    to {
      height: 15vh;
      opacity: 1;
    }
  }

  @media screen and (max-width: 480px) {
    height: 13vh;
    margin: 0 12vw;
  }
`;

const SForm = styled.form<SFormProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 50vh;

  @media screen and (max-width: 480px) {
    margin-bottom: 55vh;
  }
`;

const SButtonContainer = styled.div<SButtonProps>`
  width: 100%;
  display: flex;
  justify-content: space-around;
  ${(props) =>
    props.isSample &&
    css`
      justify-content: center;
    `};
  margin-top: 5vh;
`;

const SQuestions = styled.div`
  width: 100%;

  & > fieldset + fieldset {
    margin-top: 5vh;
  }
`;

export default TestPage;
