import React, { useState, useEffect, useContext } from "react";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import Box from '@mui/material/Box';
import Modal from "@mui/material/Modal";
import { TheColor, TheDay, pickColor, getFormattedDate } from "./TheColor";
import { PickersDay } from "@mui/x-date-pickers";
import { green, red } from "@mui/material/colors";

function getWinLoseCookie() {
  const winLoseCookie = localStorage.getItem('pastDays');
  return winLoseCookie ? JSON.parse(winLoseCookie) : {};
}

export default function BasicDateCalendar(props) {
  const { newColor } = useContext(TheColor);
  const { newDay } = useContext(TheDay);
  const [newDate, setNewDate] = useState(getFormattedDate(new Date()));
  const [winLoss, setWinLoss] = useState(getWinLoseCookie());
  const handleClose = () => props.passPastOpen(false);
  const style = {
    position: 'absolute',
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 2
  };

  useEffect(() => {
    setWinLoss(getWinLoseCookie());
  },[props.open]);

  function renderDay(props) {
    const { day, outsideCurrentMonth, ...other } = props;
    const formattedDate = getFormattedDate(day.toDate());
    const today = getFormattedDate(new Date());
    const winDates = winLoss.Win;
    const loseDates = winLoss.Lose;
    const isWin = winDates ? winDates.includes(formattedDate) : false;
    const isLose = loseDates ? loseDates.includes(formattedDate) : false;
    const style = isWin ? { backgroundColor: green[200] } : isLose ? { backgroundColor: red[200] } : {};
    const isDisabled = (isWin || isLose || 
      day.toDate() > new Date() || day.toDate() < new Date("04/22/2022")) 
      && formattedDate !== today;

    return (
      <PickersDay {...other} 
      outsideCurrentMonth={outsideCurrentMonth}
      disabled={isDisabled} 
      style={style} 
      onDaySelect={handleDateClick}
      day={day}>
        {day.format('D')}
      </PickersDay>
    );
  }

  function handleDateClick(day) {
    const selectedDate = day.toDate();
    const formattedDate = getFormattedDate(selectedDate);
    setNewDate(formattedDate);
    newDay(formattedDate);
    newColor(pickColor(formattedDate));
    handleClose();
  }

  return (
    <div>
      <Modal
        open={props.open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar
              value={dayjs(newDate)}
              onChange={handleDateClick}
              slots={{day: renderDay}}
            />
          </LocalizationProvider>
        </Box>
      </Modal>
    </div>
  );
}
