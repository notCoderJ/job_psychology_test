export const getFixedDigits = (num) => (num < 10 ? `0${num}` : `${num}`);

export const handleScrollDown = (api) => (activate) => {
  api.setAllowScrolling(activate, 'down');
  api.setKeyboardScrolling(activate, 'down');
};
