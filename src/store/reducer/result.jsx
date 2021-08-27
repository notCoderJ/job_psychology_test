import { createSlice } from '@reduxjs/toolkit';
import { GENDER_NAMES } from '../../constants';
import { MONTHS, WEEKDAYS } from '../../constants/result';
import { getFixedDigits } from '../../utils';
import { getParsedResult } from '../../utils/result';

const initialState = {
  isResultLoaded: false,
  user: null,
  inspect: null,
  result: null,
  currentValueDescription: null,
  valueDescriptions: null,
  jobs: null,
};

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
      const parsedResult = getParsedResult(inspct?.qestnrSeq, result);

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

export const resultActionCreator = resultSlice.actions;
export default resultSlice.reducer;