import React from "react";
import "./Coloms.css";
import Card from "../Card/Card";
import NewCardCreator from "../NewCardCreator/NewCardCreator";

class Coloms extends React.Component {
  renderCards = () => {
    const cards = this.props.cards;
    if (cards) {
      return cards.map((card, index) => {
        return (
          <Card
            key={index}
            name={card.name}
            deleteCard={() => this.props.deleteCard(index)}
            openActiveCard={() => this.props.openActiveCard(index)}
            commentsCounter={this.props.commentsCounter[index].comments.length}
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
