// import { put, select, take, takeEvery } from 'redux-saga/effects';
// import { saveAnswer } from '../reducer/answers';
// import {
//   currentPageSelector,
//   updateLastPageIndex,
//   updatePageIndex,
//   updatePercentage,
//   updateVisibleQuestionNumbers,
// } from '../reducer/pages';
// import { loadQuestions, questionLengthSelector } from '../reducer/questions';

// const pageMoveAction = updatePageIndex().type;
// const questionLoadAction = loadQuestions().type;
// const answerRecordAction = saveAnswer().type;

// // 현재 페이지에 보이는 문항 번호 업데이트 Saga
// function* changeVisibleQuestions() {
//   const currentPageIndex = yield select(currentPageSelector);
//   if (currentPageIndex > 0) {
//     const questionCount = yield select(questionLengthSelector);
//     yield put(updateVisibleQuestionNumbers({currentPageIndex, questionCount }));
//   }
// }

// // 마지막 페이지 인덱스 업데이트 Saga
// function* changeLastPageIndex() {
//   const questionCount = yield select(questionLengthSelector);
//   yield questionCount > 1 && put(updateLastPageIndex(questionCount));
// }

// // 다음 페이지 이동 버튼 활성화/비활성화 Saga
// function* disableNextButton() {
//   const currentPageIndex = yield select(currentPageSelector);
//   if (currentPageIndex < 0) {
//     const { isLoaded, name, gender } = yield select((state) => {
//       isLoaded: state.
//     })

//   } else {

//   }

// }

// // Percentage 업데이트 Saga
// function* changePercentage() {
//   const answerCount = yield select((state) => state.answerCount);
//   if (answerCount > 1) {
//     const questionCount = yield select(questionLengthSelector);
//     yield put(updatePercentage({ answerCount, questionCount });
//   }
// }

// export function* lastPageIndexSaga() {
//   yield takeEvery(questionLoadAction, changeLastPageIndex);
// }

// export function* visibleQuestionsSaga() {
//   yield takeEvery(pageMoveAction, changeVisibleQuestions);
// }

// export function* percentageSaga() {
//   yield takeEvery(answerRecordAction, changePercentage);
// }
