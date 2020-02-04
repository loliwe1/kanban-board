import React from "react";
import "./Card.css";

const Card = props => {
  return (
    <div className="Card">
      <h3>{props.name}</h3>
      <small>
        Комментарии: <span>{props.comment}</span>
      </small>
    </div>
  );
};

export default Card;
