import React, { useState, useEffect, useContext } from "react";

import AnswerDisplay from "./AnswerDisplay";
import Guesses from "./Guesses";
import Share from "./Share";
import { PlayerStats } from "./PlayerStats";
import { getSavedGuess, getTotalGuesses, getGameProgress, saveGameProgress, setCurrDay } from "../functions/StoreState";
import { TheDay, getFormattedDate } from "./TheColor";

export default function Game() {
  const { currentDay } = useContext(TheDay);
  setCurrDay(currentDay); //Pass current day to helper cookie save functions
  const [guessNumber, setGuessNumber] = useState(() => {
    const loaded = getSavedGuess();
    if (!loaded) {
      return 1;
    }
    return loaded;
  });
  const [gameStatus, setGameStatus] = useState(() => {
    const todayGameProgress = getGameProgress();
    if (!todayGameProgress){
      return "progress";
    }
    return todayGameProgress;
  }); //win, lose, progress
  const [allGuesses, setAllGuesses] = useState(() => {
    const savedGuesses = getTotalGuesses();
    if (!savedGuesses) {
      return [];
    }
    return savedGuesses;
  });

  const setWinLose = (e) => {
    const correct = e;
    if (correct) {
      saveGameProgress("win", currentDay);
      setGameStatus("win");
      setGuessNumber(7);
    } else {
      let newNum = guessNumber + 1;
      setGuessNumber(newNum);
    }
  };

  useEffect(() => {
    if (guessNumber > 6 && gameStatus !== "win") {
      saveGameProgress("lose", currentDay);
      setGameStatus("lose");
    }
  }, [guessNumber, gameStatus]);//eslint-disable-line

  //Clears status on day change, restores if day is changed to today
  useEffect(() => {
    setCurrDay(currentDay);
    const today = getFormattedDate(new Date());
    if (today !== currentDay){
      setGuessNumber(1);
      setAllGuesses([]);
      setGameStatus("progress")
    }
    else{
      setAllGuesses(getTotalGuesses());
      const storedProgress = getGameProgress();
      if (storedProgress === "win"){
        setGuessNumber(7);
      }
      else{
        setGuessNumber(getSavedGuess());
      }
      setGameStatus(storedProgress);

    }
  }, [currentDay]);

  const insertGuess = (e) => {
    let guesses = [...allGuesses];
    let guessIndex = guesses.findIndex((el) => el.num === e.num);
    if (guessIndex > -1) {
      guesses[guessIndex] = e;
    } else {
      guesses.push(e);
    }
    setAllGuesses(guesses);
  };

  return (
    <div className="main">
      <PlayerStats final = {allGuesses} status = {gameStatus} />
      <Share final={allGuesses} status={gameStatus} />
      <AnswerDisplay status={gameStatus} />
      <Guesses
        number={guessNumber}
        passCorrect={(e) => setWinLose(e)}
        passGuess={(e) => {
          insertGuess(e);
        }}
      />
    </div>
  );
}
