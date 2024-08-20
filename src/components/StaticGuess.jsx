import React, { useState, useEffect } from "react";

import GuessComp from "./GuessComp";
import ColorToggle from "./ColorToggle";

import { calculateContrast } from "../functions/CalculateContrast";

export default function Guess(props) {
  const [color, setColor] = useState("white");
  const [bwDisplay, setBwDisplay] = useState("white");

  useEffect(() => {
    setColor(
      `rgba(${props.colors.R}, ${props.colors.G}, ${props.colors.B}, 1)`
    );
    const contrastVal = calculateContrast([
      props.colors.R,
      props.colors.G,
      props.colors.B,
    ]);
    setBwDisplay(contrastVal);
  }, [props.colors]);

  return (
    <form className="guessForm">
      <div
        className="guessFormInner"
        style={{ backgroundColor: color, borderColor: color }}
      >
        <GuessComp
          letter={"R"}
          bw={bwDisplay}
          val={props.colors.R !== undefined ? props.colors.R : 255}
          disable={true}
        />
        <GuessComp
          letter={"G"}
          bw={bwDisplay}
          val={props.colors.G !== undefined ? props.colors.G : 255}
          disable={true}
        />
        <GuessComp
          letter={"B"}
          bw={bwDisplay}
          val={props.colors.B !== undefined ? props.colors.B : 255}
          disable={true}
        />
        <ColorToggle contrast={bwDisplay} passContrast={setBwDisplay} />
      </div>
    </form>
  );
}
