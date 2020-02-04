import React from "react";
import "./Layout.css";
import Coloms from "../../components/Coloms/Coloms";

class Layout extends React.Component {
  state = {
    coloms: [
      {
        id: 0,
        name: localStorage.getItem(`colomTitle0`) || "TODO",
        cards: [
          { name: "Card1", comment: "1" },
          { name: "Card2", comment: "2" },
          { name: "Card3", comment: "3" }
        ]
      },
      {
        id: 1,
        name: localStorage.getItem(`colomTitle1`) || "In Progress",
        cards: [
          { name: "Card4", comment: "4" },
          { name: "Card5", comment: "5" },
          { name: "Card6", comment: "6" }
        ]
      },
      {
        id: 2,
        name: localStorage.getItem(`colomTitle2`) || "Testing",
        cards: []
      },
      { id: 3, name: localStorage.getItem(`colomTitle3`) || "Done", cards: [] }
    ]
  };

  changeTitleHandler = (index, event) => {
    const coloms = this.state.coloms.concat();
    let target = event.target.value;

    localStorage.setItem(`colomTitle${index}`, target);
    let name = localStorage.getItem(`colomTitle${index}`);

    coloms[index].name = name;

    this.setState({ coloms });
  };

  addNewCardHandler = index => {
    const coloms = this.state.coloms.concat();
    coloms[index].cards.push({ name: "Введите название", comment: "0" });

    this.setState({ coloms });
  };

  renderColoms() {
    return this.state.coloms.map(colom => {
      return (
        <Coloms
          name={colom.name}
          key={colom.id}
          onChangeTitle={e => this.changeTitleHandler(colom.id, e)}
          cards={colom.cards}
          addNewCard={this.addNewCardHandler.bind(this, colom.id)}
        />
      );
    });
  }

  render() {
    return <div className="Layout">{this.renderColoms()}</div>;
  }
}

export default Layout;
