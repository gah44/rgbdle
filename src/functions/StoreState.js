import { getFormattedDate } from "../components/TheColor";

const currentState = "gameState";
const pastDays = "pastDays";

const StoredGameState = {
  Red: [],
  Green: [],
  Blue: [],
  GuessNum: [],
  Background: [],
  Close: [],
  Contrast: [],
  Status: "progress",
  expiry: new Date().getDay(),
};

const StoredPastDays = {
  Win: [],
  Lose: []
};

let currDay;

export function setCurrDay(date){
  currDay = date;
}

export function saveGameState(R, G, B, num, background, close, bwDisplay) {
  if (!verifyDate()){
    return
  }
  var currentGame = JSON.parse(localStorage.getItem(currentState));
  var gametoEdit = currentGame ? currentGame : StoredGameState;
  gametoEdit.Red.push(R);
  gametoEdit.Green.push(G);
  gametoEdit.Blue.push(B);
  gametoEdit.Background.push(background);
  gametoEdit.GuessNum.push(num + 1);
  gametoEdit.Close[num - 1] = close;
  gametoEdit.Contrast[num - 1] = bwDisplay;
  localStorage.setItem(currentState, JSON.stringify(gametoEdit));
}

export function saveGameProgress(status, date){
  if(verifyDate()){
    var currentGame = JSON.parse(localStorage.getItem(currentState));
    var gametoEdit = currentGame ? currentGame : StoredGameState;
    gametoEdit.Status = status;
    localStorage.setItem(currentState, JSON.stringify(gametoEdit));
  }
  if(status === "win" || status === "lose"){
    var pastDayGames = JSON.parse(localStorage.getItem(pastDays));
    var pastDayEdit = pastDayGames ? pastDayGames : StoredPastDays;
    const dayLookup = {
      win: pastDayEdit.Win,
      lose: pastDayEdit.Lose,
    };
    const day = dayLookup[status];
    if (!day.includes(date)){
      day.push(date);
      localStorage.setItem(pastDays, JSON.stringify(pastDayEdit));
    }
  }
}

export function alterClose(close, num) {
  if(!verifyDate()){
    return
  }
  var currentGame = JSON.parse(localStorage.getItem(currentState));
  var gametoEdit = currentGame ? currentGame : StoredGameState;
  gametoEdit.Close[num - 1] = close;
  localStorage.setItem(currentState, JSON.stringify(gametoEdit));
}

export function alterContrast(bw, num) {
  if(!verifyDate()){
    return
  }
  var currentGame = JSON.parse(localStorage.getItem(currentState));
  var gametoEdit = currentGame ? currentGame : StoredGameState;
  gametoEdit.Contrast[num - 1] = bw;
  localStorage.setItem(currentState, JSON.stringify(gametoEdit));
}

let state = JSON.parse(localStorage.getItem(currentState));

function verifyCookie() {
  state = JSON.parse(localStorage.getItem(currentState));
  const today = new Date().getDay();
  if (!state) {
    return false;
  }
  else if (state.expiry !== today) {
    localStorage.removeItem(currentState);
    return false;
  } else {
    return true;
  }
}

export function verifyDate() {
  const formattedToday = getFormattedDate(new Date());
  return (formattedToday === currDay);
}

export function getSavedGuess() {
  if (!verifyDate() || !verifyCookie()) {
    return 1;
  }

  const guessNum = state.GuessNum.length - 1;
  return state.GuessNum[guessNum];
}

export function getSavedColor(type, num) {
  if (!verifyDate() || !verifyCookie()) {
    if (type === "Background") {
      return null;
    }
    if (type === "Close") {
      return {};
    }
    return "";
  }

  const colorLookup = {
    Red: state.Red,
    Green: state.Green,
    Blue: state.Blue,
    Close: state.Close,
    Background: state.Background,
    Contrast: state.Contrast,
  };

  const colors = colorLookup[type];

  if (colors) {
    const index = num - 1;
    return colors[index] || "";
  }

  return "N/A";
}


export function getTotalGuesses() {
  if (!verifyDate() || !verifyCookie()) {
    return [];
  }

  return state.Close;
}

export function getGameProgress(){
  if (!verifyDate() || !verifyCookie()){
    return "progress";
  }

  return state.Status;
}
