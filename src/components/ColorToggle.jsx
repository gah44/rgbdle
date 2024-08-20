import React from "react";

import { alterContrast } from "../functions/StoreState";

export default function ColorToggle(props) {
  const handleChange = (e) => {
    e.preventDefault();
    props.passContrast(e.target.value);
    alterContrast(e.target.value, props.number);
  };

  return (
    <div
      orientation="vertical"
      size="small"
      style={{ height: "100%", marginRight: "-1px" }}
    >
      <button
        className="toggleBtn black"
        value="black"
        aria-label="black"
        onClick={handleChange}
      >
        B
      </button>
      <button
        className="toggleBtn white"
        value="white"
        aria-label="white"
        onClick={handleChange}
      >
        W
      </button>
    </div>
  );
}
