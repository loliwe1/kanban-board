import React from "react";
import "./ActiveCard.css";
import Comments from "../Comments/Comments";

class ActiveCard extends React.Component {
  state = {
    writeCommentFocus: false
  };

  writeCommentFocus = () => {
    this.setState({ writeCommentFocus: true });
  };

  writeCommentBlur = () => {
    this.setState({ writeCommentFocus: false });
  };

  renderComments = () => {
    const comments = this.props.comments;

    return comments.map((comment, index) => {
      return (
        <Comments name={this.props.name} key={index}>
          {comment}
        </Comments>
      );
    });
  };

  render() {
    const writeCommentStyle = ["WriteCommentWrap"];

    if (this.state.writeCommentFocus || this.state.newComment !== "") {
      writeCommentStyle.push("WriteCommentWrapFocus");
    }
    return (
      <div className="ActiveCard">
        <div className="ActiveCardWrap">
          <div className="ActiveCardClose">
            <p
              className="ActiveCardCloseLink"
              onClick={this.props.closeActiveCard}
            >
              Close
            </p>
          </div>
          <div className="ActiveCardTitle">
            <h1>{this.props.title}</h1>
            <small>
              In colomn: <span>{this.props.cardColom}</span>
            </small>
            <p>
              Created a card: <span>{this.props.name}</span>
            </p>
          </div>

          <textarea
            className="Description"
            placeholder="Enter a description for the card!"
            defaultValue={this.props.description}
          ></textarea>
          <div>Comments:</div>
          <div className={writeCommentStyle.join(" ")}>
            <textarea
              onFocus={this.writeCommentFocus.bind(this)}
              onBlur={this.writeCommentBlur.bind(this)}
              onChange={this.props.saveCommentText}
              className="WriteComment"
              placeholder="write a comment..."
            ></textarea>
            <button
              onClick={this.props.postComment}
              className="WriteCommentButton"
            >
              Save
            </button>
          </div>
          {this.renderComments()}
          <button className="RemoveCard">Remove Card</button>
        </div>
      </div>
    );
  }
}

export default ActiveCard;
