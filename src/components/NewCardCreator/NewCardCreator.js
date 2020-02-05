import React from "react";
import "./NewCardCreator.css";

const NewCardCreator = props => {
  return (
    <div className="NewCardCreator">
      <textarea
        autoFocus
        className="NewCardCreatorTextarea"
        placeholder="Enter card name"
        onChange={props.onChangeNewCardTitle}
      />
      <button onClick={props.createNewCard} className="AddCardButton">
        Add Card
      </button>
      <button onClick={props.closeCardCreator} className="CloseCreateButton">
        Close
      </button>
    </div>
  );
};

export default NewCardCreator;
