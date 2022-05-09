import { createSlice, createSelector, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/store';
import { missingItems } from '@/constants/user';

interface UserState {
  name: string;
  gender: string;
}

const initialState: UserState = {
  name: '',
  gender: '',
};

// Define Actions & Reducer
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    saveName(state, action: PayloadAction<string>) {
      const userName: string = action.payload;
      const isValid = /^[가-힣]{2,15}$/;

      if (userName.search(isValid) === -1) {
        state.name = '';
        return;
      }

      state.name = userName;
    },
    saveGender(state, action: PayloadAction<string>) {
      state.gender = action.payload;
    },
  },
});

// Define Selectors
const getUserName = (state: RootState): string => state.user.name;
const getUserGender = (state: RootState): string => state.user.gender;

const getMissingItem = createSelector(
  [getUserName, getUserGender],
  (name: string, gender: string): number => {
    if (!name) {
      return missingItems.name;
    }
    if (!gender) {
      return missingItems.gender;
    }
    return missingItems.not;
  },
);

export const userActions = userSlice.actions;
export const userSelector = {
  getUserName,
  getUserGender,
  getMissingItem,
};
export default userSlice.reducer;
