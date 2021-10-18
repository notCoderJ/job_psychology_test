import React from 'react';
import styled from 'styled-components';
import { createSlice, createSelector } from '@reduxjs/toolkit';
import { GENDER_NAMES, VIEW_OF_VALUES } from '../../constants';
import { MONTHS, WEEKDAYS } from '../../constants/result';
import { getFixedDigits } from '../../utils';
import { userSelector } from './user';
import { COLOR_DARKSET } from '../../variables';

// TODO: user 통합하자!
const initialState = {
  isResultLoaded: false,
  user: null,
  inspect: null,
  result: null,
  currentValueDescription: null,
  valueDescriptions: null,
  jobs: null,
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
    initResult() {
      return initialState;
    },
    loadResult(state, action) {
      const { user, inspct, result } = action.payload;
      if (!result) {
        state.isResultLoaded = false;
        return;
      }

      const dateInfo = new Date(inspct?.registDt);
      const inspectionDate = `${dateInfo.getFullYear()}.${getFixedDigits(
        MONTHS[dateInfo.getMonth()],
      )}.${dateInfo.getDate()}(${WEEKDAYS[dateInfo.getDay()]})`;
      const parsedResult = getParsedResult(result);

      state.user = {
        name: user.name,
        gender: GENDER_NAMES[user.gender] || GENDER_NAMES[inspct.sexdstn],
        type: user.targetNm,
      };
      state.inspect = {
        type: inspct.qestnrNm,
        date: inspectionDate,
      };
      state.result = parsedResult;
      state.currentValueDescription = parsedResult.firstHighLevelValue - 1;

      state.isResultLoaded = true;
    },
    loadValueDescriptions(state, action) {
      const valueDescriptions = action.payload;

      state.valueDescriptions = valueDescriptions.map(
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
    loadJobData(state, action) {
      // TODO: job info 로드 확인 플래그가 필요할까? (나중에 생각할 것!)
      state.jobs = action.payload;
    },
  },
});

// Define Selectors
const isResultLoaded = (state) => state.result.isResultLoaded;
const getUserData = (state) => state.result.user;
const getInspectData = (state) => state.result.inspect;
const getResultData = (state) => state.result.result;
const getResultValuesAll = (state) => state.result.result?.allValues;
const getValueDescriptions = (state) => state.result.valueDescriptions;
const getCurrentValueDescription = (state) =>
  state.result.currentValueDescription;
const getJobData = (state) => state.result.jobs;

const getUserInfo = createSelector(
  [isResultLoaded, getUserData, getInspectData],
  (isLoaded, userData, inspectData) =>
    isLoaded && { user: userData, inspect: inspectData },
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
  getUserData,
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
