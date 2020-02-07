import React from "react";
import "./Comments.css";

class Comments extends React.Component {
  state = {
    redactComment: false,
    changeCommentFocus: false,
    commentText: ""
  };

  redactCommentHandler = () => {
    const commentText = this.props.children;
    this.setState({
      redactComment: true,
      changeCommentFocus: true,
      commentText: commentText
    });
  };

  changeCommentFocusHandler = () => {
    if (this.state.commentText === "") {
      this.setState({ changeCommentFocus: false });
    } else return null;
  };

  changeCommentText = event => {
    this.setState({ commentText: event });
  };

  saveTextComment = () => {
    this.setState({ redactComment: false });
  };

  commentsRender = () => {
    const commentText = this.state.commentText;
    const redact = this.state.redactComment;
    const index = this.props.index;
    if (redact) {
      return (
        <div>
          <textarea
            className="CommentChangeTextArea"
            onBlur={this.changeCommentFocusHandler.bind(this)}
            autoFocus
            defaultValue={this.props.children}
            onChange={event => this.changeCommentText(event.target.value)}
          />
          <button
            onClick={() =>
              this.props.changeCommentText(
                commentText,
                index,
                this.saveTextComment.call(this)
              )
            }
            className="CommentChangeButton"
          >
            Save
          </button>
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
