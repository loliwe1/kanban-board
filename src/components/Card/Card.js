import React from "react";
import "./Card.css";

const Card = props => {
  return (
    <div className="Card">
      <div className="CardClose" onClick={props.deleteCard}>
        &#10008;
      </div>
      <h3>{props.name}</h3>
      <small>
        Комментарии: <span>{props.comment}</span>
      </small>
    </div>
  );
};

export default Card;
