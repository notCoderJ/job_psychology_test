import React, { useCallback, useEffect, useMemo } from 'react';
// import { useHistory } from 'react-router-dom';
import ReactFullpage from '@fullpage/react-fullpage';
import { useDispatch, useSelector } from 'react-redux';
import ProgressBar from './progressBar';
import Questions from './questions';
import { actions, selector } from '../../store/modules';

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
  // const totalPageCount = useSelector(selector.getTotalPageCount);
  const currentPageIndex = useSelector(selector.getCurrentPageIndex);
  const totalPages = useSelector(selector.getTotalPages);
  // const lastPageIndex = useMemo(() => totalPageCount - 1, [totalPageCount]);
  const totalPageIndexes = useMemo(
    () => totalPages.map((index) => String(index)),
    [totalPages],
  );

  const updatePageIndex = useCallback(
    (_, destination) =>
      currentPageIndex !== destination.index &&
      dispatch(actions.updatePageIndex(destination.index)),
    [dispatch, currentPageIndex],
  );

  // TEST
  useEffect(() => {
    console.log('현재:', currentPageIndex);
  }, [currentPageIndex]);

  // const handleSubmit = useCallback(() => {});

  return (
    <div>
      <header id="header">
        <ProgressBar />
        <h1>직업가치관검사 페이지</h1>
      </header>
      <main role="main">
        <form action="">
          <ReactFullpage
            // licenseKey=""
            anchors={totalPageIndexes}
            afterLoad={updatePageIndex}
            onLeave={() => true}
            render={({ state, fullpageApi }) => (
              <ReactFullpage.Wrapper>
                {totalPages.map((pageIndex) => (
                  <Questions
                    key={`test#${pageIndex}`}
                    pageIndex={pageIndex}
                    state={state}
                    fullpageApi={fullpageApi}
                  />
                ))}
              </ReactFullpage.Wrapper>
            )}
          />
        </form>
      </main>
      <footer id="footer">나는 발</footer>
    </div>
  );
};

export default TestPage;
