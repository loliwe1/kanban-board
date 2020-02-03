import React from "react";
import "./Coloms.css";

const Coloms = props => {
  return (
    <div className="Coloms">
      <h2>{props.name}</h2>
      <p>&#10010; Добавить карточку</p>
    </div>
  );
};

export default Coloms;
