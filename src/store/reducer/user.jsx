import { createSlice } from '@reduxjs/toolkit';
import { TARGET_SEQ } from '../../constants/test';

const initialState = {
  isNameValid: false,
  name: '',
  gender: '',
  grade: '',
  email: '',
  targetSeq: TARGET_SEQ['일반'],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    initUser() {
      return initialState;
    },
    saveName(state, action) {
      const userName = action.payload;
      const validName = /^[가-힣]{2,15}$/;

      if (!userName) {
        state.name = '';
        state.isNameValid = false;
        return;
      }

      if (userName.search(validName) === -1) {
        state.name = '';
        state.isNameValid = false;
        return;
      }

      state.isNameValid = true;
      state.name = action.payload;
    },
    saveGender(state, action) {
      state.gender = action.payload;
    },
  },
});

export const userActionCreator = userSlice.actions;
export default userSlice.reducer;
