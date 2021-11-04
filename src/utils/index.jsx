export const getFixedDigits = (num) => (num < 10 ? `0${num}` : `${num}`);

export const debounce = (func, delay) => {
  let timeoutId = null;

  return (e) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(func.bind(this, e), delay);
  };
};
