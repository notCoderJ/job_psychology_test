import { API_BASE_URL } from '../constants';

export const createBaseURL = (type) => {
  const URL = { test: '/openapi/test', result: '/api/psycho' };
  return `${API_BASE_URL}${URL[type]}`;
};

export const getFixedDigits = (num) => (num < 10 ? `0${num}` : `${num}`);

export const debounce = (func, delay) => {
  let timeoutId = null;

  return (e) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(func.bind(this, e), delay);
  };
};
