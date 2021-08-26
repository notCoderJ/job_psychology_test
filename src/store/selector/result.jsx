import { createSelector } from '@reduxjs/toolkit';

const isResultLoaded = (state) => state.result.isResultLoaded;
const getUserData = (state) => state.result.user;
const getUserName = createSelector([getUserData], (userData) => userData?.name);
const getInspectData = (state) => state.result.inspect;
const getResultData = (state) => state.result.result;
const getJobData = (state) => state.result.jobs;

const getUserInfo = createSelector(
  [isResultLoaded, getUserData, getInspectData],
  (isLoaded, userData, inspectData) =>
    isLoaded && { user: userData, inspect: inspectData },
);

const getTwoHighLevelValues = createSelector(
  [isResultLoaded, getResultData],
  (isLoaded, result) =>
    isLoaded && [result.firstHighLevelValue, result.secondHighLevelValue],
);

const resultSelector = {
  isResultLoaded,
  getUserData,
  getUserName,
  getInspectData,
  getResultData,
  getJobData,
  getTwoHighLevelValues,
  getUserInfo,
};

export default resultSelector;
