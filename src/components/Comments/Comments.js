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
      <a href="#">Redact</a>
      <a href="#">Remove</a>
    </div>
  );
};

export default Comments;
