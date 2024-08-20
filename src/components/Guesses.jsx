import React from "react";
import Guess from "./Guess";

export default function Guesses(props) {
  //props is used to pass info to/from Guess
  var totalGuesses = 6;

  var guesses = [];

  for (var i = 1; i <= totalGuesses; i++) {
    guesses.push(
      <Guess
        currNo={props.number}
        number={i}
        key={i}
        passCorrect={props.passCorrect}
        passGuess={props.passGuess}
      />
    );
  }

  return <div>{guesses}</div>;
}
