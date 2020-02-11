import React from "react";
import "./Coloms.css";
import Card from "../Card/Card";
import NewCardCreator from "../NewCardCreator/NewCardCreator";

class Coloms extends React.Component {
  countComment = (colomId, index) => {
    const comments = this.props.commentsCounter;
    const id = `${colomId}-${index}`;
    const comment = comments.find(item => item.id === id);
    if (comment) {
      return comment.commentCount;
    } else return 0;
  };
  renderCards = () => {
    const cards = this.props.cards;
    if (cards) {
      return cards.map((card, index) => {
        return (
          <Card
            key={index}
            name={card.name}
            activeCard={this.props.activeCard}
            deleteCard={() => this.props.deleteCard(index)}
            openActiveCard={() => this.props.openActiveCard(index)}
            comments={this.countComment.call(this, this.props.colomId, index)}
          ></Card>
        );
      });
    }
    return null;
  };

  render() {
    return (
      <div className="Coloms">
        <textarea
          className="ColomsTextarea"
          onChange={this.props.onChangeTitle}
          defaultValue={this.props.name}
        ></textarea>
        {this.renderCards()}
        <p onClick={this.props.addNewCard}>&#10010; Добавить карточку</p>
        {this.props.addNewCardState ? (
          <NewCardCreator
            closeCardCreator={this.props.closeCardCreator}
            createNewCard={this.props.createNewCard}
            onChangeNewCardTitle={this.props.onChangeNewCardTitle}
          />
        ) : null}
      </div>
    );
  }
}

export default Coloms;
