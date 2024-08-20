import * as React from "react";
import { IconButton } from "@mui/material";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";

//from the mui docs
export default function HintBtn(props) {
  const generateHint = () => {
    props.passHintReq(true);
  };

  return (
    <div>
      <IconButton
        onClick={generateHint}
        size="small"
        style={{ backgroundColor: "white" }}
      >
        <TipsAndUpdatesIcon />
      </IconButton>
    </div>
  );
}
