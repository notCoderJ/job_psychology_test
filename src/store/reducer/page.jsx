import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentPageIndex: -1,
  isDark: true,
};

const psychologyTestSlice = createSlice({
  name: 'psychologyTest',
  initialState,
  reducers: {
    updatePageIndex(state, action) {
      state.currentPageIndex += action.payload;
    },
  },
});

export const psychologyTestActionCreator = psychologyTestSlice.actions;
export default psychologyTestSlice.reducer;
