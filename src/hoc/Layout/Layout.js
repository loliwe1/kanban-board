import React from "react";
import "./Layout.css";
import Coloms from "../../components/Coloms/Coloms";
import PopupName from "../../components/PopupName/PopupName";
import ActiveCard from "../../components/ActiveCard/ActiveCard";

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
        cards: [],
        addNewCard: false
      },
      {
        id: 1,
        name: localStorage.getItem(`colomTitle1`) || "In Progress",
        cards: [],
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
    ],
    openActiveCard: false,
    openActiveCardId: "",
    indexActiveCard: "",
    activeCards: [],
    commentText: ""
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
    if (this.state.newCardValue) {
      const coloms = this.state.coloms.concat();
      coloms[index].cards.push({ name: this.state.newCardValue, comment: "0" });
      coloms[index].addNewCard = false;

      const activeCards = this.state.activeCards;
      activeCards.push({
        cardId: `${index}-${coloms[index].cards.length - 1}`,
        title: this.state.newCardValue,
        cardColom: coloms[index].name,
        description: "",
        comments: []
      });

      this.setState({ coloms });
      this.setState({ newCardValue: "" });
    }
  };

  changeNewCardTitleHandler = value => {
    let newCardValue = value;
    this.setState({ newCardValue });
  };

  openActiveCardHandler = (colomId, index) => {
    const openActiveCardId = `${colomId}-${index}`;
    const indexActiveCard = this.state.activeCards.findIndex(
      item => item.cardId === openActiveCardId
    );

    this.setState({ openActiveCard: true, openActiveCardId, indexActiveCard });
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
          openActiveCard={this.openActiveCardHandler.bind(this, colom.id)}
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
  //---------------------------------------ActiveCard
  closeActiveCardHandler = () => {
    this.setState({ openActiveCard: false });
  };

  saveCommentTextHandler = event => {
    this.setState({ commentText: event });
  };

  postCommentHandler = () => {
    if (this.state.commentText) {
      const activeCards = this.state.activeCards;
      activeCards[this.state.indexActiveCard].comments.unshift(
        this.state.commentText
      );
      this.setState({ activeCards });
      this.setState({ commentText: "" });
    } else return null;
  };

  //-------------------------------------------------

  //----------------------------------------------Render

  renderLayout = () => {
    if (!this.state.openActiveCard) {
      if (this.state.popUpName.saveName) {
        return <div className="Layout">{this.renderColoms()}</div>;
      } else {
        return (
          <div>
            <div className="Layout">{this.renderColoms()}</div>
            <PopupName
              onChangeName={e => this.changeNameHandler(e)}
              onSaveName={this.saveNameHandler}
            >
              {this.popupNameValidation()}
            </PopupName>
          </div>
        );
      }
    } else if (this.state.openActiveCard) {
      const activeCard = this.state.activeCards[this.state.indexActiveCard];
      return (
        <div>
          <div className="Layout">{this.renderColoms()}</div>
          <ActiveCard
            name={this.state.popUpName.name}
            closeActiveCard={this.closeActiveCardHandler.bind(this)}
            description={activeCard.description}
            title={activeCard.title}
            cardColom={activeCard.cardColom}
            comments={activeCard.comments}
            saveCommentText={event =>
              this.saveCommentTextHandler(
                event.target.value,
                this.state.indexActiveCards
              )
            }
            postComment={this.postCommentHandler.bind(this)}
          />
        </div>
      );
    }
  };

  render() {
    return <div>{this.renderLayout()}</div>;
  }
}

export default Layout;
