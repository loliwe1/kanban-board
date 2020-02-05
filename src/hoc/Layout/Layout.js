import React from "react";
import "./Layout.css";
import Coloms from "../../components/Coloms/Coloms";
import PopupName from "../../components/PopupName/PopupName";

class Layout extends React.Component {
  state = {
    popUpName: {
      name: localStorage.getItem("popupName"),
      saveName: localStorage.getItem("saveName"),
      buttonClicked: false,
      valid: false
    },
    newCardValue: "",
    coloms: [
      {
        id: 0,
        name: localStorage.getItem(`colomTitle0`) || "TODO",
        cards: [
          { name: "Card1", comment: "1" },
          { name: "Card2", comment: "2" },
          { name: "Card3", comment: "3" }
        ],
        addNewCard: false
      },
      {
        id: 1,
        name: localStorage.getItem(`colomTitle1`) || "In Progress",
        cards: [
          { name: "Card4", comment: "4" },
          { name: "Card5", comment: "5" },
          { name: "Card6", comment: "6" }
        ],
        addNewCard: false
      },
      {
        id: 2,
        name: localStorage.getItem(`colomTitle2`) || "Testing",
        cards: [],
        addNewCard: false
      },
      {
        id: 3,
        name: localStorage.getItem(`colomTitle3`) || "Done",
        cards: [],
        addNewCard: false
      }
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
    coloms[index].addNewCard = true;

    this.setState({ coloms });
  };

  deleteCardsHandler = (id, index) => {
    const coloms = [...this.state.coloms];
    const cards = coloms[id].cards;
    cards.splice(index, 1);

    this.setState({ coloms });
  };

  closeCardCreatorHandler = index => {
    const coloms = [...this.state.coloms];
    coloms[index].addNewCard = false;

    this.setState({ coloms });
  };

  createNewCardHandler = index => {
    const coloms = this.state.coloms.concat();
    coloms[index].cards.push({ name: this.state.newCardValue, comment: "0" });
    coloms[index].addNewCard = false;

    this.setState({ coloms });
  };

  changeNewCardTitleHandler = value => {
    let newCardValue = value;

    this.setState({ newCardValue });
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
          deleteCard={this.deleteCardsHandler.bind(this, colom.id)}
          addNewCardState={colom.addNewCard}
          closeCardCreator={this.closeCardCreatorHandler.bind(this, colom.id)}
          createNewCard={this.createNewCardHandler.bind(this, colom.id)}
          onChangeNewCardTitle={event =>
            this.changeNewCardTitleHandler(event.target.value)
          }
        />
      );
    });
  }

  //-----------------------Validation for component PopUpName

  changeNameHandler = event => {
    const regExp = /^\w+$/gi;

    if (event.target.value.length > 3 && regExp.test(event.target.value)) {
      const popUpName = { ...this.state.popUpName };
      popUpName.name = event.target.value;
      popUpName.valid = true;

      this.setState({ popUpName });
    } else return null;
  };

  saveNameHandler = () => {
    const popUpName = { ...this.state.popUpName };
    popUpName.buttonClicked = true;
    this.setState({ popUpName });

    if (this.state.popUpName.name) {
      setTimeout(() => {
        localStorage.setItem("saveName", "true");
        popUpName.saveName = localStorage.getItem("saveName");
        localStorage.setItem("popupName", this.state.popUpName.name);
        popUpName.name = localStorage.getItem("popupName");

        this.setState({ popUpName });
      }, 500);
    } else {
      return null;
    }
  };

  popupNameValidation = () => {
    if (this.state.popUpName.buttonClicked && !this.state.popUpName.valid) {
      return (
        <p style={{ color: "red", textTransform: "uppercase" }}>Invalid Name</p>
      );
    } else if (this.state.popUpName.valid) {
      return (
        <p style={{ color: "green", textTransform: "uppercase" }}>
          Welcome {this.state.popUpName.name}
        </p>
      );
    } else return null;
  };

  //--------------------------------------------------------------------------------

  render() {
    return (
      <div>
        {this.state.popUpName.saveName ? (
          <div className="Layout">{this.renderColoms()}</div>
        ) : (
          <div>
            <div className="Layout">{this.renderColoms()}</div>
            <PopupName
              onChangeName={e => this.changeNameHandler(e)}
              onSaveName={this.saveNameHandler}
            >
              {this.popupNameValidation()}
            </PopupName>
          </div>
        )}
      </div>
    );
  }
}

export default Layout;
