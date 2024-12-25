import React from "react";
import "./Button.css";

function Button({ type = "default", title, disable = false, onClick }) {
  return (
    <button
      className={`btn ${type}`}
      disabled={disable}
      onClick={onClick}
    >
      {title}
    </button>
  );
}

export default Button;