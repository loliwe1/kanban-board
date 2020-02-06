import React from "react";
import "./ActiveCard.css";
import Comments from "../Comments/Comments";

class ActiveCard extends React.Component {
  state = {
    writeCommentFocus: false,
    newComment: ""
  };

  writeCommentFocus = () => {
    this.setState({ writeCommentFocus: true });
  };

  writeCommentBlur = () => {
    this.setState({ writeCommentFocus: false });
  };

  writeCommentChange = event => {
    this.setState({ newComment: event });
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
            <a href="#">Close</a>
          </div>
          <div className="ActiveCardTitle">
            <h1>New Card!</h1>
            <small>
              In colomn: <span>TODO</span>
            </small>
            <p>
              Created a card: <span>{this.props.name}</span>
            </p>
          </div>

          <textarea
            className="Description"
            placeholder="Enter a description for the card!"
          ></textarea>
          <div>Comments:</div>
          <div className={writeCommentStyle.join(" ")}>
            <textarea
              onFocus={this.writeCommentFocus.bind(this)}
              onBlur={this.writeCommentBlur.bind(this)}
              onChange={event => this.writeCommentChange(event.target.value)}
              className="WriteComment"
              placeholder="write a comment..."
            ></textarea>
            <button className="WriteCommentButton">Save</button>
          </div>
          <Comments
            name={this.props.name}
            commentText={this.state.newComment}
          />
          <Comments
            name={this.props.name}
            commentText={this.state.newComment}
          />
          <button className="RemoveCard">Remove Card</button>
        </div>
      </div>
    );
  }
}

export default ActiveCard;
