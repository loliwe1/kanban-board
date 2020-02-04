import React from "react";
import "./Layout.css";
import Coloms from "../../components/Coloms/Coloms";
import Card from "../../components/Coloms/Card/Card";

class Layout extends React.Component {
  state = {
    coloms: [
      {
        id: 0,
        name: "TODO",
        cards: [
          { name: "Card1", comment: "1" },
          { name: "Card2", comment: "2" },
          { name: "Card3", comment: "3" }
        ]
      },
      {
        id: 1,
        name: "In Progress",
        cards: [
          { name: "Card4", comment: "4" },
          { name: "Card5", comment: "5" },
          { name: "Card6", comment: "6" }
        ]
      },
      { id: 2, name: "Testing" },
      { id: 3, name: "Done" }
    ]
  };

  renderColoms() {
    return this.state.coloms.map((colom, index) => {
      return (
        <Coloms
          name={colom.name}
          key={index}
          onChangeTitle={this.changeTitleHandler.bind(this, colom.name)}
          cards={colom.cards}
        />
      );
    });
  }

  changeTitleHandler = name => {
    console.log(name);
  };

  render() {
    return <div className="Layout">{this.renderColoms()}</div>;
  }
}

export default Layout;
