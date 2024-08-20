import React, { useRef, useEffect, useContext, useState } from "react";
import StaticGuess from "./StaticGuess";
import { TheColor } from "./TheColor";

export default function AnswerDisplay(props) {
  const { answerColor } = useContext(TheColor);
  const canvasRef = useRef(null);
  const [RGB, setRGB] = useState({});
  const [status, setStatus] = useState("");

  useEffect(() => {
    const draw = (ctx) => {
      ctx.fillStyle = answerColor;
      ctx.beginPath();
      ctx.rect(0, 0, 384, 70);
      ctx.fill();
    };

    const breakApartVals = () => {
      const stringSplit = answerColor.split(",");
      const R = parseInt(stringSplit[0].split("(").pop());
      const G = parseInt(stringSplit[1]);
      const B = parseInt(stringSplit[2]);
      setRGB({ R, G, B });
    };

    breakApartVals();

    const canvas = canvasRef.current;
    if (canvas) {
      const context = canvas.getContext("2d");
      draw(context);
    }
  }, [answerColor]);

  useEffect(() => {
    setStatus(props.status);
  }, [props.status]);

  return (
    <div style={{ margin: "auto", width: "384px" }}>
      <canvas
        ref={canvasRef}
        style={{ display: status === "progress" ? "block" : "none" }}
        {...props}
        width="384"
        height="70"
      />
      {status !== "progress" && <StaticGuess colors={RGB} />}
    </div>
  );
}
