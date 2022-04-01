import { createSlice, createSelector } from '@reduxjs/toolkit';
import { VIEW_OF_VALUES } from '../../constants';

const initialState = {
  inspectInfo: null,
  currentValueDescription: null,
  loading: false,
  error: null,
  data: {
    result: null,
    valueDescriptions: null,
    jobInfo: null,
  },
};

// Define Actions & Reducer
const resultSlice = createSlice({
  name: 'result',
  initialState,
  reducers: {
    reqResult(state) {
      state.loading = true;
    },
    loadResult(state, action) {
      const { inspectInfo, result } = action.payload;
      state.inspectInfo = inspectInfo;
      state.data.result = result;
      state.currentValueDescription = result.highestScore - 1;
    },
    loadValueDescriptions(state, action) {
      const valuesDescription = action.payload;
      state.data.valueDescriptions = valuesDescription.map(
        ({ upptValue, middlValue, lwptValue }) => [
          upptValue,
          middlValue,
          lwptValue,
        ],
      );
    },
    loadJobInfo(state, action) {
      state.data.jobInfo = action.payload;
    },
    finResult(state, action) {
      state.loading = false;
      const finState = action.payload;
      if (finState !== 'success') {
        state.error = finState;
      }
    },
    setCurrentValueDescription(state, action) {
      if (state.currentValueDescription === action.payload) {
        return;
      }
      state.currentValueDescription = action.payload;
    },
  },
});

// Define Selectors
const isResultLoading = (state) => state.result.loading;
const isResultLoaded = (state) => !!state.result.data.result;
const getInspectInfo = (state) => state.result.inspectInfo;
const getUser = (state) => state.result.inspectInfo?.user;
const getResult = (state) => state.result.data.result;
const getScores = (state) => state.result.data?.result?.scores;
const getValueDescriptions = (state) => state.result.data.valueDescriptions;
const getJobInfo = (state) => state.result.data.jobInfo;
const getCurrentValueDescription = (state) =>
  state.result.currentValueDescription;

const getHighestScoreIndex = (state) =>
  state.result.data?.result?.highestScore - 1;

const get2ndHighestScoreIndex = (state) =>
  state.result.data?.result?.secondHighestScore - 1;

const getLowestScoreIndex = (state) =>
  state.result.data?.result?.lowestScore - 1;

const get2ndLowestScoreIndex = (state) =>
  state.result.data?.result?.secondLowestScore - 1;

const getTwoHighestScoreNames = createSelector(
  [getHighestScoreIndex, get2ndHighestScoreIndex],
  (highestScoreIndex, nextHighestScoreIndex) => {
    if (
      typeof highestScoreIndex !== 'number' ||
      typeof nextHighestScoreIndex !== 'number'
    ) {
      return [];
    }

    const valueNames = Object.keys(VIEW_OF_VALUES);
    return [valueNames[highestScoreIndex], valueNames[nextHighestScoreIndex]];
  },
);

const getTwoLowestScoreNames = createSelector(
  [getLowestScoreIndex, get2ndLowestScoreIndex],
  (lowestScoreIndex, nextLowestScoreIndex) => {
    if (
      typeof lowestScoreIndex !== 'number' ||
      typeof nextLowestScoreIndex !== 'number'
    ) {
      return [];
    }

    const valueNames = Object.keys(VIEW_OF_VALUES);
    return [valueNames[lowestScoreIndex], valueNames[nextLowestScoreIndex]];
  },
);

export const resultActions = resultSlice.actions;
export const resultSelector = {
  isResultLoading,
  isResultLoaded,
  getInspectInfo,
  getResult,
  getUser,
  getScores,
  getHighestScoreIndex,
  get2ndHighestScoreIndex,
  getTwoHighestScoreNames,
  getLowestScoreIndex,
  get2ndLowestScoreIndex,
  getTwoLowestScoreNames,
  getValueDescriptions,
  getCurrentValueDescription,
  getJobInfo,
};
export default resultSlice.reducer;
