import React, { useState, useEffect, useContext } from "react";
import { Button, Typography } from "@mui/material";
import { TheDay, daysBetween } from "./TheColor";

export default function Share(props) {
  //props: final (guesses), status
  const url = "https://www.rgbdle.page/";

  const [shown, setShown] = useState(false);
  const [copied, setCopied] = useState(false);
  const { currentDay, newDay } = useContext(TheDay);

  useEffect(() => {
    if (props.status !== "progress") {
      setShown(true);
    }
    else{
      setShown(false);
    }
  }, [props.status]);

  const getWin = (guesses) => {
    let lastGuess = guesses[guesses.length - 1];
    if (
      lastGuess.R === "correct" &&
      lastGuess.G === "correct" &&
      lastGuess.B === "correct"
    ) {
      return lastGuess.num;
    } else {
      return "X";
    }
  };

  const formatScore = (guesses) => {
    const scoreArr = [];
    guesses.forEach((guess) => {
      const guessArr = [];
      for (const key in guess) {
        if (key !== "num" && key !== "hints") {
          let emoji = strToEmoji[guess[key]];
          guessArr.push(emoji);
        }
        if (key === "hints" && guess[key] === true) {
          let emoji = strToEmoji[key];
          guessArr.push(emoji);
        }
      }
      const guessStr = guessArr.join("");
      scoreArr.push(guessStr);
    });
    const scoreStr = scoreArr.join("\n");
    return scoreStr;
  };

  const strToEmoji = {
    "": "❌",
    down: "⬇️",
    "hint-down": "⬇️",
    up: "⬆️",
    "hint-up": "⬆️",
    correct: "✅",
    hints: "💡",
  };

  const shareString = () => {
    const loseWin = getWin(props.final);
    const emojis = formatScore(props.final);
    const dayNo = daysBetween(currentDay);
    const finalStr = `RGBdle ${dayNo}: ${loseWin}/6\n${emojis}\n${url}`;
    copyToClipBoard(finalStr);
  };

  //from here: https://www.delftstack.com/howto/javascript/javascript-copy-to-clipboard/
  function copyToClipBoard(content) {
    try {
      navigator.clipboard
        .writeText(content)
        .then(setCopied(true))
        .catch((err) => {
          alert("Can't copy to clipboard");
          console.log("No clipboard detected", err);
        });
    } catch (error) {
      alert("Can't copy to clipboard");
      console.log("No clipboard detected", error);
    }
  }

  if(shown) {
    return (
      <div
        className="shareArea"
      >
        <Button
          variant="contained"
          color="grey"
          onClick={shareString}
          onTouchEnd={shareString}
          style={{ cursor: "pointer" }}
        >
          Share
        </Button>
        <Typography sx={{ p: 1 }}>
          {!copied && "Thanks for playing!"}
          {copied && "Content copied to clipboard."}
        </Typography>
      </div>
    );
  }
}
