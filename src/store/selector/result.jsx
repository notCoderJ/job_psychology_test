import React from 'react';
import { createSelector } from '@reduxjs/toolkit';
import styled from 'styled-components';
import { VIEW_OF_VALUES } from '../../constants';
import { COLOR_DARKSET } from '../../variables';

const isResultLoaded = (state) => state.result.isResultLoaded;
const getUserData = (state) => state.result.user;
const getUserName = createSelector([getUserData], (userData) => userData?.name);
const getInspectData = (state) => state.result.inspect;
const getResultData = (state) => state.result.result;
const getResultValuesAll = (state) => state.result.result?.allValues;
const getValueDescriptions = (state) => state.result.valueDescriptions;
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
    getUserName,
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
`;

const getValueScoreScale = createSelector(
  [getResultValuesAll, getFirstHighLevelValue],
  (allValues, firstHighLevelValue) =>
    allValues &&
    firstHighLevelValue &&
    Number(allValues[firstHighLevelValue - 1]),
);

const resultSelector = {
  isResultLoaded,
  getUserData,
  getUserName,
  getInspectData,
  getResultData,
  getResultValuesAll,
  getValueDescriptions,
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

export default resultSelector;
