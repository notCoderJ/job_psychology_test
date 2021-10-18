import { createSlice } from '@reduxjs/toolkit';

const TARGET_NORMAL = 100209;
const initialState = {
  name: '',
  gender: '',
  grade: '',
  email: '',
  targetSeq: TARGET_NORMAL,
};

// Define Actions & Reducer
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    initUser() {
      return initialState;
    },
    saveName(state, action) {
      const userName = action.payload;
      const isValid = /^[가-힣]{2,15}$/;

      if (userName.search(isValid) === -1) {
        state.name = '';
        return;
      }

      state.name = userName;
    },
    saveGender(state, action) {
      state.gender = action.payload;
    },
  },
});

// Define Selectors
const getUserName = (state) => state.user.name;
const getUserGender = (state) => state.user.gender;
const getUserGrade = (state) => state.user.grade;
const getUserTargetSeq = (state) => state.user.targetSeq;

export const userActions = userSlice.actions;
export const userSelector = {
  getUserName,
  getUserGender,
  getUserGrade,
  getUserTargetSeq,
};
export default userSlice.reducer;
