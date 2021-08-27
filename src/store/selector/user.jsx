// import { createSelector } from '@reduxjs/toolkit';

const getUserName = (state) => state.user.name;
const getUserGender = (state) => state.user.gender;
const getUserGrade = (state) => state.user.grade;
const getUserTargetSeq = (state) => state.user.targetSeq;
const isUserInvalid = (state) => !state.user.name || !state.user.gender;
const isUserNameValid = (state) => state.user.isNameValid;

const userSelector = {
  getUserName,
  getUserGender,
  getUserGrade,
  getUserTargetSeq,
  isUserInvalid,
  isUserNameValid,
};

export default userSelector;
