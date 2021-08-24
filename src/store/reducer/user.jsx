import { createSlice } from '@reduxjs/toolkit';
import { TARGET_SEQ } from '../../constants/test';

// TODO: trgetSe값 변경가능하게 추가하자!(현재 임시)
const initialState = {
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
    saveName(state, action) {
      state.name = action.payload;
    },
    saveGender(state, action) {
      state.gender = action.payload;
    },
  },
});

export const userActionCreator = userSlice.actions;
export default userSlice.reducer;
