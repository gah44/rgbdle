export function displayGuesses(guesses) {
  const newArr = [];
  const emojis = { null: "❌", correct: "✅", up: "⬆️", down: "⬇️" };
  const guessInfo = guesses.guesses;
  const hintInfo = guesses.hints;
  if (guessInfo && guessInfo.length > 0) {
    guessInfo.forEach((guess) => {
      const guessArr = [];
      for (const key in guess) {
        const prop = guess[key];
        const emoji = emojis[prop];
        guessArr.push(emoji);
      }
      newArr.push(guessArr);
    });
  }
  if (hintInfo && hintInfo.length > 0) {
    hintInfo.forEach((hint) => {
      const hintIndex = hint.index;
      const hintTrue = hint.hint;
      if (hintTrue) {
        newArr[hintIndex].push("💡");
      }
    });
  }
  return newArr;
}
