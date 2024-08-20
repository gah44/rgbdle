export const findFocus = (num) => {
  const letter = "R";
  const number = num;
  const focusEl = document.getElementById(`${number}-${letter}-value`);
  focusEl.focus();
};
