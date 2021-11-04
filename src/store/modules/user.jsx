import { createSlice, createSelector } from '@reduxjs/toolkit';

const initialState = {
  name: '',
  gender: '',
};

// Define Actions & Reducer
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
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
const getUserData = createSelector(
  [getUserName, getUserGender],
  (name, gender) => ({ name, gender }),
);

export const userActions = userSlice.actions;
export const userSelector = {
  getUserName,
  getUserGender,
  getUserData,
};
export default userSlice.reducer;
