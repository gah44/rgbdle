import React, { useState, useContext, useEffect } from "react";

import { Button } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import { TheColor } from "./TheColor";
import ConfettiEl from "./ConfettiEl";
import GuessComp from "./GuessComp";
import ColorToggle from "./ColorToggle";
import HintBtn from "./HintBtn";
import { TheDay, getFormattedDate } from "./TheColor";

import {
  alterClose,
  getSavedColor,
  saveGameState,
} from "../functions/StoreState";

import { calculateContrast } from "../functions/CalculateContrast";
import { findFocus } from "../functions/FindFocus";

export default function Guess(props) {
  const { answerColor } = useContext(TheColor)
  const { currentDay } = useContext(TheDay);

  const [correct, setCorrect] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [R, setR] = useState(() => {
    const red = getSavedColor("Red", props.number);
    if (!red) {
      return "";
    }
    return red;
  });
  const [G, setG] = useState(() => {
    const green = getSavedColor("Green", props.number);
    if (!green) {
      return "";
    }
    return green;
  });
  const [B, setB] = useState(() => {
    const blue = getSavedColor("Blue", props.number);
    if (!blue) {
      return "";
    }
    return blue;
  });
  const [rgb, setRgb] = useState("");
  const [close, setClose] = useState(() => {
    const isClose = getSavedColor("Close", props.number);
    if (!isClose) {
      return {};
    }
    return isClose;
  });
  const [current, setCurrent] = useState(false);
  const [bwDisplay, setBwDisplay] = useState(() => {
    const bw = getSavedColor("Contrast", props.number);
    if (!bw) {
      return "";
    }
    return bw;
  });
  const [borderColor, setBorderColor] = useState("#CDD0D5");
  const [backgroundColor, setBackgroundColor] = useState(() => {
    const background = getSavedColor("Background", props.number);
    if (!background) {
      return "white";
    }
    //If background has been saved, assume guess has been submitted
    if (background) {
      setSubmitted(true);
    }
    if (background === answerColor) {
      setCorrect(true);
    }
    return background;
  });

  //clear and reset values on day/color context change. Reset to saved state when context value is today
  useEffect(() => {
    const today = getFormattedDate(new Date());
    if(currentDay !== today){
      setB("");
      setG("");
      setR("");
      setBackgroundColor("white");
      setClose({});
      setSubmitted(false);
      setBwDisplay("");
    }
    else{
      setB(getSavedColor("Blue", props.number));
      setG(getSavedColor("Green", props.number));
      setR(getSavedColor("Red", props.number));
      const background = getSavedColor("Background", props.number)
      if(background){
        setBackgroundColor(background);
        setSubmitted(true);
      }
      else{
        setBackgroundColor("white");
        setSubmitted(false);
      }
      if(backgroundColor === answerColor){
        setCorrect(true);
      }
      setClose(getSavedColor("Close", props.number));
      setBwDisplay(getSavedColor("Contrast", props.number));
    }
  }, [answerColor, currentDay]); //eslint-disable-line

  useEffect(() => {
    if (props.number === props.currNo) {
      setCurrent(true);
    } else {
      setCurrent(false);
    }
  }, [props.number, props.currNo]);

  useEffect(() => {
    setRgb(`rgba(${R},${G},${B},1)`);
  }, [R, G, B]);

  useEffect(() => {
    if (correct) {
      props.passCorrect(correct);
    }
  }, [correct, props.correct]); //eslint-disable-line

  useEffect(() => {
    if (current && props.number <= 6) {
      findFocus(props.number);
    }
  }, [props.number, current]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    var validated = await validateForm();
    if (validated) {
      setBackgroundColor(rgb);
      const contrastVal = calculateContrast([R, G, B]);
      setBwDisplay(contrastVal);
      checkGuess();
      let closeness = await compareGuess(false);
      if (closeness) {
        props.passGuess(closeness);
      }
      saveGameState(R, G, B, props.number, rgb, closeness, contrastVal);
    }
    setSubmitted(true);
  };

  const validateForm = async () => {
    if (!R || !G || !B) {
      setBorderColor("red");
      findFocus(props.number);
      return false;
    } else {
      setBorderColor("#CDD0D5");
      return true;
    }
  };

  const checkGuess = () => {
    if (rgb === answerColor) {
      setCorrect(true);
      props.passCorrect(true);
    } else {
      props.passCorrect(false);
    }
  };

  const compareGuess = async (hint) => {
    const closeObj = { num: props.number, R: "", G: "", B: "", hints: false };
    const correctSplit = answerColor.split("(").pop();
    const correctArr = correctSplit.split(",");
    const threshold = 10;
    const answerArr = [R, G, B];
    const letters = ["R", "G", "B"];
    for (let i = 0; i < letters.length; i++) {
      let letter = letters[i];
      let answerVal = answerArr[i];
      let correctVal = correctArr[i];
      if (answerVal === correctVal) {
        closeObj[letter] = "correct";
      }
      let diff = answerVal - correctVal;
      if (Math.abs(diff) <= threshold) {
        if (diff < 0) {
          closeObj[letter] = "up";
        } else if (diff > 0) {
          closeObj[letter] = "down";
        }
      } else if (hint) {
        if (diff < 0) {
          closeObj[letter] = "hint-up";
        } else if (diff > 0) {
          closeObj[letter] = "hint-down";
        }
      }
    }
    if (hint) {
      closeObj.hints = true;
    }
    setClose(closeObj);
    alterClose(closeObj, props.number);
    return closeObj;
  };

  function setVal(letter, val) {
    if (val < 0) {
      val = 0;
    } else if (val > 255) {
      val = 255;
    }
    if (letter === "R") {
      setR(val);
    } else if (letter === "G") {
      setG(val);
    } else if (letter === "B") {
      setB(val);
    }
  }

  return (
    <form
      className="guessForm"
      onSubmit={(e) => {
        handleSubmit(e);
      }}
    >
      <div
        className="guessFormInner"
        style={{ borderColor: borderColor, backgroundColor: backgroundColor }}
      >
        {props.number === props.currNo - 1 && props.currNo <= 6 && (
          <HintBtn
            number={props.number}
            passHintReq={async (e) => {
              let closeness = await compareGuess(e);
              if (closeness) {
                props.passGuess(closeness);
              }
            }}
          />
        )}
        <GuessComp
          letter={"R"}
          closeness={close["R"]}
          bw={bwDisplay}
          number={props.number}
          currentGuess={props.currNo}
          passVal={(e) => {
            setVal("R", e);
          }}
          val={R}
          disable={!current}
        />
        <GuessComp
          letter={"G"}
          closeness={close["G"]}
          bw={bwDisplay}
          number={props.number}
          currentGuess={props.currNo}
          passVal={(e) => {
            setVal("G", e);
          }}
          val={G}
          disable={!current}
        />
        <GuessComp
          letter={"B"}
          closeness={close["B"]}
          bw={bwDisplay}
          number={props.number}
          currentGuess={props.currNo}
          passVal={(e) => {
            setVal("B", e);
          }}
          val={B}
          disable={!current}
        />
        {current && (
          <div className="enterBtn">
            <Button
              type="submit"
              variant="contained"
              color="grey"
              size="small"
              style={{ minWidth: "fit-content" }}
            >
              <ArrowForwardIosIcon fontSize="small" />
            </Button>
          </div>
        )}
        {submitted && (
          <ColorToggle
            number={props.number}
            contrast={bwDisplay}
            passContrast={setBwDisplay}
          />
        )}
      </div>
      <ConfettiEl show={correct} />
    </form>
  );
}
