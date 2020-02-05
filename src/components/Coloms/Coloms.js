import React from "react";
import "./Coloms.css";
import Card from "../Card/Card";

class Coloms extends React.Component {
  renderCards = () => {
    const cards = this.props.cards;
    if (cards) {
      return cards.map((card, index) => {
        return (
          <Card
            key={index}
            name={card.name}
            comment={card.comment}
            deleteCard={() => this.props.deleteCard(index)}
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
          onChange={this.props.onChangeTitle}
          defaultValue={this.props.name}
        ></textarea>
        {this.renderCards()}
        <p onClick={this.props.addNewCard}>&#10010; Добавить карточку</p>
      </div>
    );
  }
}

export default Coloms;
