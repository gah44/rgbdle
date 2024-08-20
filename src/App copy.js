//OLD
import React, { useEffect, useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Logo from "./components-old/Logo";
import Answer from "./components-old/Answer";
import Guesses from "./components-old/Guesses";
import HelpModal from "./components-old/HelpModal";
import ShareBtn from "./components-old/ShareBtn";
import Icons from "./components-old/Icons";
import "./App.css";

import { displayGuesses } from "./functions/DisplayGuesses";

function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [guessNum, setGuessNum] = useState(1);
  const [lose, setLose] = useState(false);
  const [guesses, setGuesses] = useState({});
  const [finalAns, setFinalAns] = useState([]);

  useEffect(() => {
    if (guesses) {
      const guessStr = displayGuesses(guesses);
      setFinalAns(guessStr);
    }
  }, [guesses]);

  useEffect(() => {
    if (guessNum > 6) {
      setLose(true);
    }
  }, [guessNum]);

  return (
    <div className="App">
      <CssBaseline />
      <Icons passOpenModal={setModalOpen} />
      <HelpModal open={modalOpen} passModalOpen={setModalOpen} />
      <div className="main">
        <Logo />
        <ShareBtn final={finalAns} />
        <Answer lose={lose.toString()} />
        <Guesses
          num={guessNum}
          passGuessNo={setGuessNum}
          passGuessInfo={setGuesses}
        />
      </div>
    </div>
  );
}

export default App;
