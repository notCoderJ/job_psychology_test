import React, { useCallback, useEffect, useMemo } from 'react';
// import { useHistory } from 'react-router-dom';
import ReactFullpage from '@fullpage/react-fullpage';
import { useDispatch, useSelector } from 'react-redux';
import ProgressBar from './progressBar';
import Questions from './questions';
import { actions, selector } from '../../store/modules';
import Example from './example';
import { handleScrollDown } from '../../utils';

// const getResultRequestFormData = (state) => ({
//   qestrnSeq: state.question.questionSeq,
//   trgetSe: state.user.targetSeq,
//   name: state.user.name,
//   gender: state.user.gender,
//   grade: state.user.grade,
//   startDtm: state.question.startDate,
// });

const TestPage = () => {
  const dispatch = useDispatch();
  // const history = useHistory();
  const sectionCount = useSelector(selector.getSectionCount);
  const currentSection = useSelector(selector.getCurrentSection);
  const isSectionAnswered = useSelector(
    selector.isSectionAnswered(currentSection),
  );
  // const lastPageIndex = useMemo(() => sectionCount - 1, [sectionCount]);
  const totalSection = useMemo(
    () => [...Array(sectionCount).keys()].map((section) => String(section)),
    [sectionCount],
  );

  const updatePageIndex = useCallback(
    (_, destination) =>
      currentSection !== destination.index &&
      dispatch(actions.updateSection(destination.index)),
    [dispatch, currentSection],
  );

  // Control Next Scroll
  useEffect(
    () => handleScrollDown(window.fullpage_api)(isSectionAnswered),
    [isSectionAnswered],
  );

  // const handleSubmit = useCallback(() => {});

  return (
    <div>
      <header id="header">
        <ProgressBar />
        <h1>직업가치관검사 페이지</h1>
      </header>
      <main role="main">
        <div role="form">
          <ReactFullpage
            // licenseKey=""
            anchors={totalSection}
            onLeave={updatePageIndex}
            render={() => (
              <ReactFullpage.Wrapper>
                <Example />
                {totalSection.slice(1).map((section) => (
                  <Questions key={`test#${section}`} section={section} />
                ))}
              </ReactFullpage.Wrapper>
            )}
          />
        </div>
      </main>
      <footer id="footer">나는 발</footer>
    </div>
  );
};

export default TestPage;
