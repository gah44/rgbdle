import { Cookies } from "react-cookie";
import { verifyDate } from "./StoreState";

export const STATS_COOKIE = "Statistics"
export const TODAY_COOKIE = "Today"
export const InitialGameState = { //key/value framework for stats cookie
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    "total": 0,
    "win": 0,
    "streak": 0,
    "max_streak": 0
  };

const cookies = new Cookies();

export function savePlayerStats(lastGuess, win) {
    var today = new Date();
    var tomorrow = ((23-today.getHours())*(60*60)) + ((59-today.getMinutes())*60) + (59-today.getSeconds()); //get time in seconds until next day local time
    if(!cookies.get(TODAY_COOKIE)){ //Only set new stats cookie if user hasn't visited site yet today
        cookies.set(TODAY_COOKIE, "played", { path: '/', maxAge:tomorrow });
        if(verifyDate()){
            updateStats(lastGuess, win);
        }
    }
}

function updateStats(winGuess){
    let winToUpdate = cookies.get(STATS_COOKIE) ? JSON.parse(JSON.stringify(cookies.get(STATS_COOKIE))) : InitialGameState;
    winToUpdate["total"]++;
    if(winGuess < 7){ //win case
        winToUpdate[winGuess]++;
        winToUpdate["win"]++;
        winToUpdate["streak"]++;
        if(winToUpdate["streak"] > winToUpdate["max_streak"]){
            winToUpdate["max_streak"] = winToUpdate["streak"];
        }
    }
    else{ //lose case
        winToUpdate["streak"] = 0;
    }

    var futureDate = new Date();
    futureDate.setFullYear(2050);
    cookies.set(STATS_COOKIE, winToUpdate, { path: '/', expires: futureDate}); //StackOverflow said this was the way to keep cookie past session
}