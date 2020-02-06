import React from "react";
import "./Comments.css";

const Comments = props => {
  return (
    <div className="Comments">
      <p>
        <span>{props.name}&#160;:</span>{" "}
      </p>
      <p>{props.children}</p>
      <hr />
      <p className="CommentsRedact">Redact</p>
      <p className="CommentsRemove">Remove</p>
    </div>
  );
};

export default Comments;
