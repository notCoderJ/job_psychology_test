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
  jobs: null,
};

const resultSlice = createSlice({
  name: 'result',
  initialState,
  reducers: {
    // TODO: 에러 처리 등 조정 필요할듯...??
    loadResult(state, action) {
      // TODO: email, birthday 항목 추가 고려 중...
      const { user, inspct, result } = action.payload;
      if (!result) {
        state.isResultLoaded = false;
        return;
      }

      state.isResultLoaded = true;
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
      state.inspect = { type: inspct.qestnrNm, date: inspectionDate };
      state.result = parsedResult;
    },
    loadJobData(state, action) {
      // TODO: job info 로드 확인 플래그가 필요할까? (나중에 생각할 것!)
      state.jobs = action.payload;
    },
  },
});

export const resultActionCreator = resultSlice.actions;
export default resultSlice.reducer;
