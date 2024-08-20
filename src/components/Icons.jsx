import React from "react";

import HelpIcon from "@mui/icons-material/Help";
import GitHubIcon from "@mui/icons-material/GitHub";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { IconButton } from "@mui/material";

export default function Icons(props) {
  return (
    <div style={{ position: "fixed" }}>
      <IconButton onClick={() => props.passHelpOpen(true)}>
        <HelpIcon />
      </IconButton>
      <IconButton href="https://github.com/lbrowngs/rgbdle" target="_null">
        <GitHubIcon />
      </IconButton>
      <IconButton onClick={() => props.passPastOpen(true)}>
        <CalendarMonthIcon />
      </IconButton>
    </div>
  );
}
