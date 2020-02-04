import React from "react";
import "./Coloms.css";
import Card from "./Card/Card";

class Coloms extends React.Component {
  renderCards() {
    if (this.props.cards) {
      return this.props.cards.map((card, index) => {
        return (
          <Card key={index} name={card.name} comment={card.comment}></Card>
        );
      });
    }
    return null;
  }

  render() {
    return (
      <div className="Coloms">
        <textarea
          onChange={this.props.onChangeTitle}
          defaultValue={this.props.name}
        ></textarea>
        {this.renderCards()}
        <p>&#10010; Добавить карточку</p>
      </div>
    );
  }
}

export default Coloms;
