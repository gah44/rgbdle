import React, { useEffect, useState } from "react";
import { InputAdornment, Input } from "@mui/material/";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import CheckIcon from "@mui/icons-material/Check";

export default function GuessComp(props) {
  //props: letter (rgb), closeness, bw (contrast),
  //number (the number guess this comp lives in), currentGuess (current guess number)

  const [labelColor, setLabelColor] = useState("#929292");
  const [inputColor, setInputColor] = useState("#2C2C2C");

  useEffect(() => {
    if (props.bw !== "") {
      setLabelColor(props.bw);
      setInputColor(props.bw);
    }
    else{
      setInputColor("#2C2C2C");
      setLabelColor("#929292");
    }
  }, [props.bw]);

  return (
    <div className="guessComp">
      <Input
        className="guessInput"
        id={`${props.number}-${props.letter}-value`}
        type="number"
        sx={{
          fontSize: props.number === props.currentGuess ? "200%" : "150%",
          color: inputColor,
          "&.Mui-disabled input": {
            color: labelColor,
            WebkitTextFillColor: labelColor,
          },
          "& .MuiInput-input": {
            "&::-webkit-outer-spin-button, &::-webkit-inner-spin-button": {
              "-webkit-appearance": "none",
            },
          },
        }}
        startAdornment={
          <InputAdornment position="start">
            {props.closeness === "up" && (
              <ArrowDropUpIcon sx={{ color: props.bw }} />
            )}
            {props.closeness === "down" && (
              <ArrowDropDownIcon sx={{ color: props.bw }} />
            )}
            {props.closeness === "correct" && (
              <CheckIcon sx={{ color: props.bw }} />
            )}
            {props.closeness === "hint-up" && (
              <ArrowUpwardIcon sx={{ color: props.bw }} />
            )}
            {props.closeness === "hint-down" && (
              <ArrowDownwardIcon sx={{ color: props.bw }} />
            )}
            <p style={{ fontSize: "75%", color: labelColor }}>{props.letter}</p>
          </InputAdornment>
        }
        inputProps={{ maxLength: 3, min: 0, max: 255, inputMode: "numeric", pattern: "[0-9"}}
        variant="standard"
        value={props.val}
        onChange={(e) => props.passVal(e.target.value)}
        disabled={props.disable}
      />
    </div>
  );
}
