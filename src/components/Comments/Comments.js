import React from "react";
import "./Comments.css";

class Comments extends React.Component {
  state = {
    redactComment: false,
    changeCommentFocus: false
  };

  redactCommentHandler = () => {
    this.setState({ redactComment: true, changeCommentFocus: true });
  };

  changeCommentFocusHandler = () => {
    this.setState({ changeCommentFocus: false });
  };

  commentsRender = () => {
    const redact = this.state.redactComment;
    if (redact && this.state.changeCommentFocus) {
      return (
        <div>
          <textarea
            className="CommentChangeTextArea"
            onBlur={this.changeCommentFocusHandler.bind(this)}
            autoFocus
            defaultValue={this.props.children}
          />
          <button className="CommentChangeButton">Save</button>
        </div>
      );
    } else {
      return (
        <div>
          <p>
            <span>{this.props.name}&#160;:</span>
          </p>
          <p>{this.props.children}</p>
          <hr />
          <p
            onClick={this.redactCommentHandler.bind(this)}
            className="CommentsRedact"
          >
            Redact
          </p>
          <p onClick={this.props.deleteComment} className="CommentsRemove">
            Remove
          </p>
        </div>
      );
    }
  };

  render() {
    return <div className="Comments">{this.commentsRender()}</div>;
  }
}

export default Comments;
