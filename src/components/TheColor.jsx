import { createContext } from "react";
import { colors } from "../secrets/colors/Colors";

export function daysBetween(date) {
  const releaseDay = "04/22/2022";
  const today = new Date(date)
  const formatToday = getFormattedDate(today).toString();

  const daysBetween = getDaysBetween(
    new Date(releaseDay),
    new Date(formatToday)
  );
  return Math.ceil(daysBetween);
}

//from: https://stackoverflow.com/questions/11591854/format-date-to-mm-dd-yyyy-in-javascript
export function getFormattedDate(date) {
  let year = date.getFullYear();
  let month = (1 + date.getMonth()).toString().padStart(2, "0");
  let day = date.getDate().toString().padStart(2, "0");

  return month + "/" + day + "/" + year;
}

//from: https://www.geeksforgeeks.org/how-to-calculate-the-number-of-days-between-two-dates-in-javascript/
function getDaysBetween(date1, date2) {
  // To calculate the time difference of two dates
  var Difference_In_Time = date2.getTime() - date1.getTime();
  // To calculate the no. of days between two dates
  var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
  return Difference_In_Days;
}

export function pickColor(date = new Date()) {
  const picked = colors[daysBetween(date)];
  if (picked) {
    return colors[daysBetween(date)];
  } else {
    return "rgba(0,0,0,1)";
  }
}

export const TheColor = createContext();
export const TheDay = createContext();

// export const TheColor = createContext("rgba(205,130,200,1)");
// export const TheColor = createContext("rgba(0,0,0,1)");
