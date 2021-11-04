import React from 'react';
import styled from 'styled-components';
import { createSlice, createSelector } from '@reduxjs/toolkit';
import { VIEW_OF_VALUES } from '../../constants';
import { MONTHS, WEEKDAYS } from '../../constants/result';
import { getFixedDigits } from '../../utils';
import { userSelector } from './user';
import { COLOR_DARKSET } from '../../variables';
import { reducerState } from '../../utils/reducer';

const initialState = {
  userType: null,
  inspect: null,
  currentValueDescription: null,
  result: reducerState.initial(),
  valueDescriptions: reducerState.initial(),
  jobs: reducerState.initial(),
};

const getParsedResult = (result) => {
  const allValues = result?.wonScore
    .trim()
    .replace(/[0-9]+=/g, '')
    .split(' ')
    .map((score) => Number(score));
  const values = allValues.map((score, index) => [score, index + 1]).sort();

  return {
    allValues,
    firstHighLevelValue: values.pop()[1],
    secondHighLevelValue: values.pop()[1],
    firstLowLevelValue: values[0][1],
    secondLowLevelValue: values[1][1],
  };
};

// Define Actions & Reducer
const resultSlice = createSlice({
  name: 'result',
  initialState,
  reducers: {
    reqResult(state, action) {
      state.result = action.payload;
    },
    loadResult(state, action) {
      const { loading, data, error } = action.payload;
      state.result.loading = loading;
      state.result.error = error;
      if (!data) {
        return;
      }

      const { user, inspct, result } = data;
      const dateInfo = new Date(inspct?.registDt);
      const inspectionDate = `${dateInfo.getFullYear()}.${getFixedDigits(
        MONTHS[dateInfo.getMonth()],
      )}.${dateInfo.getDate()}(${WEEKDAYS[dateInfo.getDay()]})`;
      const parsedResult = getParsedResult(result);

      state.userType = user.targetNm;
      state.inspect = { type: inspct.qestnrNm, date: inspectionDate };
      state.result.data = parsedResult;
      state.currentValueDescription = parsedResult.firstHighLevelValue - 1;
      // TODO setState로 뺴자 이건
    },
    reqValueDescriptions(state, action) {
      state.valueDescriptions = action.payload;
    },
    loadValueDescriptions(state, action) {
      const { loading, data, error } = action.payload;
      state.valueDescriptions.loading = loading;
      state.valueDescriptions.error = error;
      if (!data) {
        return;
      }
      state.valueDescriptions.data = data.map(
        ({ upptValue, middlValue, lwptValue }) => [
          upptValue,
          middlValue,
          lwptValue,
        ],
      );
    },
    setCurrentValueDescription(state, action) {
      if (state.currentValueDescription === action.payload) {
        return;
      }
      state.currentValueDescription = action.payload;
    },
    reqJobData(state, action) {
      state.jobs = action.payload;
    },
    loadJobData(state, action) {
      state.jobs = action.payload;
    },
  },
});

// Define Selectors
const isResultLoaded = (state) => !!state.result.result.data;
const getUserType = (state) => state.result.userType;
const getInspectData = (state) => state.result.inspect;
const getResultData = (state) => state.result.result.data;
const getResultValuesAll = (state) => state.result.result.data.allValues;
const getValueDescriptions = (state) => state.result.valueDescriptions.data;
const getCurrentValueDescription = (state) =>
  state.result.currentValueDescription;
const getJobData = (state) => state.result.jobs.data;

const getUserInfo = createSelector(
  [isResultLoaded, userSelector.getUserData, getUserType, getInspectData],
  (isLoaded, userData, userType, inspectData) =>
    isLoaded && { ...userData, type: userType, inspect: inspectData },
);

const getFirstHighLevelValue = createSelector(
  [getResultData],
  (resultData) => resultData?.firstHighLevelValue,
);

const getFirstLowLevelValue = createSelector(
  [getResultData],
  (resultData) => resultData?.firstLowLevelValue,
);

const getTwoHighLevelValues = createSelector(
  [isResultLoaded, getResultData],
  (isLoaded, result) =>
    isLoaded && [result.firstHighLevelValue, result.secondHighLevelValue],
);

const getTwoHighLevelValueNames = createSelector(
  [isResultLoaded, getResultData],
  (isLoaded, result) => {
    const valueNames = Object.keys(VIEW_OF_VALUES);
    return (
      isLoaded && {
        firstHighLevelValueName: valueNames[result.firstHighLevelValue - 1],
        secondHighLevelValueName: valueNames[result.secondHighLevelValue - 1],
      }
    );
  },
);

const getTwoLowLevelValues = createSelector(
  [isResultLoaded, getResultData],
  (isLoaded, result) =>
    isLoaded && [result.firstLowLevelValue, result.secondLowLevelValue],
);

const getTwoLowLevelValueNames = createSelector(
  [isResultLoaded, getResultData],
  (isLoaded, result) => {
    const valueNames = Object.keys(VIEW_OF_VALUES);
    return (
      isLoaded && {
        firstLowLevelValueName: valueNames[result.firstLowLevelValue - 1],
        secondLowLevelValueName: valueNames[result.secondLowLevelValue - 1],
      }
    );
  },
);

const getPsychologyTestReulstText = createSelector(
  [
    isResultLoaded,
    userSelector.getUserName,
    getTwoHighLevelValueNames,
    getTwoLowLevelValueNames,
  ],
  (isLoaded, userName, TwoHighLevelValueNames, TwoLowLevelValueNames) =>
    isLoaded && (
      <span>
        직장생활과 관련하여<HighLightText>{`${userName}님`}</HighLightText>은
        <HighLightText>{`${TwoHighLevelValueNames.firstHighLevelValueName}`}</HighLightText>
        과(와)
        <HighLightText>{`${TwoHighLevelValueNames.secondHighLevelValueName}`}</HighLightText>
        을(를) 가장 중요하게 생각합니다.
        <br />
        {`반면에 ${TwoLowLevelValueNames.firstLowLevelValueName}, ${TwoLowLevelValueNames.secondLowLevelValueName}은(는) 상대적으로 덜 중요하게 생각합니다.`}
      </span>
    ),
);

const HighLightText = styled.span`
  color: ${COLOR_DARKSET.HIGHLIGHT_TEXT};
  font-size: 1.1rem;
  font-weight: bold;
  opacity: 0.8;

  :hover {
    opacity: 1;
  }
`;

const getValueScoreScale = createSelector(
  [getResultValuesAll, getFirstHighLevelValue],
  (allValues, firstHighLevelValue) =>
    allValues &&
    firstHighLevelValue &&
    Number(allValues[firstHighLevelValue - 1]),
);

export const resultActions = resultSlice.actions;
export const resultSelector = {
  isResultLoaded,
  getUserType,
  getInspectData,
  getResultData,
  getResultValuesAll,
  getValueDescriptions,
  getCurrentValueDescription,
  getJobData,
  getUserInfo,
  getFirstHighLevelValue,
  getFirstLowLevelValue,
  getTwoHighLevelValues,
  getTwoHighLevelValueNames,
  getTwoLowLevelValues,
  getTwoLowLevelValueNames,
  getPsychologyTestReulstText,
  getValueScoreScale,
};
export default resultSlice.reducer;
