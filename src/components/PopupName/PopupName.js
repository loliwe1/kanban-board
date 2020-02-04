import React from "react";
import "./PopupName.css";

const PopupName = props => {
  return (
    <div className="PopupNameBlur">
      <div className="PopupName">
        <form>
          <h2>Your Name?</h2>
          <input></input>
          <button>Save</button>
        </form>
      </div>
    </div>
  );
};

export default PopupName;
