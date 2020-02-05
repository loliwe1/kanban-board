import React from "react";
import "./PopupName.css";

const PopupName = props => {
  return (
    <div className="PopupNameBlur">
      <div className="PopupName">
        <form action="#" method="GET">
          <h2>Your Name?</h2>
          <input
            onChange={props.onChangeName}
            type="text"
            placeholder="Vasya"
            autoFocus
          ></input>
          <button onClick={props.onSaveName}>Save</button>
        </form>
        {props.children}
      </div>
    </div>
  );
};

export default PopupName;
