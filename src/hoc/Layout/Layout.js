import React from "react";
import "./Layout.css";
import Coloms from "../../components/Coloms/Coloms";
import PopupName from "../../components/PopupName/PopupName";
import ActiveCard from "../../components/ActiveCard/ActiveCard";

class Layout extends React.Component {
  state = {
    // clearState: localStorage.clear(),
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
        cards: JSON.parse(localStorage.getItem(`colom0`)),
        addNewCard: false
      },
      {
        id: 1,
        name: localStorage.getItem(`colomTitle1`) || "In Progress",
        cards: JSON.parse(localStorage.getItem(`colom1`)),
        addNewCard: false
      },
      {
        id: 2,
        name: localStorage.getItem(`colomTitle2`) || "Testing",
        cards: JSON.parse(localStorage.getItem(`colom2`)),
        addNewCard: false
      },
      {
        id: 3,
        name: localStorage.getItem(`colomTitle3`) || "Done",
        cards: JSON.parse(localStorage.getItem(`colom3`)),
        addNewCard: false
      }
    ],
    openActiveCard: false,
    openActiveCardId: "",
    indexActiveCard: "",
    activeCards: JSON.parse(localStorage.getItem("activeCards")) || [],
    commentText: "",
    titleText: "",
    activeTitle: false,
    commentsCounter: JSON.parse(localStorage.getItem("commentsCounter"))
  };

  //Changes the Column Title
  changeTitleHandler = (index, event) => {
    const coloms = this.state.coloms.concat();
    let target = event.target.value;

    localStorage.setItem(`colomTitle${index}`, target);
    let name = localStorage.getItem(`colomTitle${index}`);

    coloms[index].name = name;

    this.setState({ coloms });
  };

  //Open Card Creator
  addNewCardHandler = index => {
    const coloms = this.state.coloms.concat();
    coloms[index].addNewCard = true;

    this.setState({ coloms });
  };

  //Removes a card from a column
  deleteCardsHandler = (id, index) => {
    const coloms = [...this.state.coloms];
    const cards = coloms[id].cards;
    cards.splice(index, 1);

    this.setState({ coloms });
  };

  //Close Card Creator
  closeCardCreatorHandler = index => {
    const coloms = [...this.state.coloms];
    coloms[index].addNewCard = false;

    this.setState({ coloms });
  };

  //Adds Card to a Column
  createNewCardHandler = index => {
    if (this.state.newCardValue) {
      let cards = "";
      if (localStorage.getItem(`colom${index}`)) {
        cards = JSON.parse(localStorage.getItem(`colom${index}`));
      } else {
        cards = [];
      }
      cards.push({ name: this.state.newCardValue });
      const jsn = JSON.stringify(cards);
      localStorage.setItem(`colom${index}`, jsn);

      const coloms = this.state.coloms.concat();
      coloms[index].cards = JSON.parse(localStorage.getItem(`colom${index}`));
      coloms[index].addNewCard = false;

      let activeCard; //Create Active Card

      if (localStorage.getItem("activeCards")) {
        activeCard = JSON.parse(localStorage.getItem("activeCards"));
      } else {
        activeCard = [];
      }
      activeCard.push({
        cardId: `${index}-${coloms[index].cards.length - 1}`,
        title: this.state.newCardValue,
        cardColom: coloms[index].name,
        description: "",
        comments: []
      });
      const jsnActive = JSON.stringify(activeCard);
      localStorage.setItem("activeCards", jsnActive);
      const activeCards = JSON.parse(localStorage.getItem("activeCards"));

      //Comments Counter
      let commentCount = "";
      if (localStorage.getItem("commentsCounter")) {
        commentCount = JSON.parse(localStorage.getItem("commentsCounter"));
      } else {
        commentCount = [];
      }

      commentCount.push({
        id: `${index}-${coloms[index].cards.length - 1}`,
        commentCount: 0
      });

      localStorage.setItem("commentsCounter", JSON.stringify(commentCount));
      const commentsCounter = JSON.parse(
        localStorage.getItem("commentsCounter")
      );

      //Render
      this.setState({ coloms, newCardValue: "", activeCards, commentsCounter });
    }
  };

  // Adds Card Title to a temporary field
  changeNewCardTitleHandler = value => {
    let newCardValue = value;
    this.setState({ newCardValue });
  };

  //Open Active Card
  openActiveCardHandler = (colomId, index) => {
    const parseActiveCard = JSON.parse(localStorage.getItem("activeCards"));
    const openActiveCardId = `${colomId}-${index}`;
    const indexActiveCard = parseActiveCard.findIndex(
      item => item.cardId === openActiveCardId
    );

    this.setState({ openActiveCard: true, openActiveCardId, indexActiveCard });
  };

  renderColoms() {
    return this.state.coloms.map((colom, index) => {
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
          commentsCounter={this.state.commentsCounter}
          colomId={index}
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

  //Close Active Card
  closeActiveCardHandler = () => {
    this.setState({ openActiveCard: false });
  };

  //Save comments Text
  saveCommentTextHandler = event => {
    this.setState({ commentText: event });
  };

  //add Comment to the Card
  postCommentHandler = () => {
    if (this.state.commentText) {
      const activeCard = JSON.parse(localStorage.getItem("activeCards"));
      activeCard[this.state.indexActiveCard].comments.unshift(
        this.state.commentText
      );

      const jsn = JSON.stringify(activeCard);
      localStorage.setItem("activeCards", jsn);
      const activeCards = JSON.parse(localStorage.getItem("activeCards"));

      //add to CommentCounter
      const commentCount = JSON.parse(localStorage.getItem("commentsCounter"));
      commentCount[this.state.indexActiveCard].commentCount += 1;

      localStorage.setItem("commentsCounter", JSON.stringify(commentCount));
      const commentsCounter = JSON.parse(
        localStorage.getItem("commentsCounter")
      );

      //render
      this.setState({ activeCards, commentText: "", commentsCounter });
    } else return null;
  };

  //delete Comment from Card
  deleteCommentHandler = index => {
    const activeCard = JSON.parse(localStorage.getItem("activeCards"));
    activeCard[this.state.indexActiveCard].comments.splice(index, 1);
    const jsn = JSON.stringify(activeCard);

    localStorage.setItem("activeCards", jsn);
    const activeCards = JSON.parse(localStorage.getItem("activeCards"));

    //Delete from commentsCounter

    const commentCount = JSON.parse(localStorage.getItem("commentsCounter"));
    commentCount[this.state.indexActiveCard].commentCount -= 1;

    localStorage.setItem("commentsCounter", JSON.stringify(commentCount));
    const commentsCounter = JSON.parse(localStorage.getItem("commentsCounter"));

    //render

    this.setState({ activeCards, commentsCounter });
  };

  changeActiveCardDescriptionHandler = event => {
    const activeCard = JSON.parse(localStorage.getItem("activeCards"));
    activeCard[this.state.indexActiveCard].description = event;

    const jsn = JSON.stringify(activeCard);
    localStorage.setItem("activeCards", jsn);
    const activeCards = JSON.parse(localStorage.getItem("activeCards"));

    this.setState({ activeCards });
  };

  changeCommentTextHandler = (commentText, index) => {
    if (commentText) {
      const activeCard = JSON.parse(localStorage.getItem("activeCards"));
      activeCard[this.state.indexActiveCard].comments[index] = commentText;

      const jsn = JSON.stringify(activeCard);
      localStorage.setItem("activeCards", jsn);
      const activeCards = JSON.parse(localStorage.getItem("activeCards"));

      this.setState({ activeCards });
    }
  };

  removeCardHandler = () => {
    //Delete Card from Colomn
    const parseActiveCard = JSON.parse(localStorage.getItem("activeCards"));
    const activeCardId = parseActiveCard[this.state.indexActiveCard].cardId;
    const coloms = this.state.coloms.concat();
    const colomId = activeCardId.match(/\d+/)[0];
    const cardIds = activeCardId.match(/\d+(?![-])/)[0];

    const cards = JSON.parse(localStorage.getItem(`colom${colomId}`));
    cards.splice(cardIds, 1);

    const jsn = JSON.stringify(cards);
    localStorage.setItem(`colom${colomId}`, jsn);

    coloms[colomId].cards = JSON.parse(localStorage.getItem(`colom${colomId}`));

    //Delete ActiveCard
    const activeCard = parseActiveCard;
    activeCard.splice(this.state.indexActiveCard, 1);

    const jsnActive = JSON.stringify(activeCard);
    localStorage.setItem("activeCards", jsnActive);

    const activeCards = JSON.parse(localStorage.getItem("activeCards"));

    //Delete commentsCounter
    const commentCount = JSON.parse(localStorage.getItem("commentsCounter"));
    commentCount.splice(this.state.indexActiveCard, 1);

    localStorage.setItem("commentsCounter", JSON.stringify(commentCount));
    const commentsCounter = JSON.parse(localStorage.getItem("commentsCounter"));

    //render
    this.setState({
      openActiveCard: false,
      activeCards,
      coloms,
      commentsCounter
    });
  };

  changeCardTitleHandler = event => {
    this.setState({ titleText: event });
  };

  changeTitleActiveHandler = () => {
    this.setState({ activeTitle: true });
  };

  closeTitleChangerHandler = () => {
    this.setState({ titleText: "", activeTitle: false });
  };

  saveTitleChangerHandler = () => {
    if (this.state.titleText) {
      const activeCard = JSON.parse(localStorage.getItem("activeCards"));
      activeCard[this.state.indexActiveCard].title = this.state.titleText;
      const activeCardId = this.state.activeCards[this.state.indexActiveCard]
        .cardId;
      const jsnActive = JSON.stringify(activeCard);
      localStorage.setItem("activeCards", jsnActive);
      const activeCards = JSON.parse(localStorage.getItem("activeCards"));

      const coloms = this.state.coloms.concat();
      const colomId = activeCardId.match(/\d+/)[0];
      const cardId = activeCardId.match(/\d+(?![-])/)[0];

      const cards = JSON.parse(localStorage.getItem(`colom${colomId}`));
      cards[cardId].name = this.state.titleText;
      const jsn = JSON.stringify(cards);
      localStorage.setItem(`colom${colomId}`, jsn);
      coloms[colomId].cards = JSON.parse(
        localStorage.getItem(`colom${colomId}`)
      );

      this.setState({ coloms, activeCards, activeTitle: false, titleText: "" });
    } else {
      this.setState({ activeTitle: false });
    }
  };

  closeActiveCardEscHandler = event => {
    // console.log(event.code);
    // console.log(event.charCode);
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
      //if an Active Card is open
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
            deleteComment={this.deleteCommentHandler.bind(this)}
            changeActiveCardDescription={event =>
              this.changeActiveCardDescriptionHandler(event.target.value)
            }
            commentText={this.state.commentText}
            changeCommentText={this.changeCommentTextHandler.bind(this)}
            removeCard={this.removeCardHandler.bind(this)}
            closeActiveCardEsc={event => this.closeActiveCardEscHandler(event)}
            changeTitleActive={this.changeTitleActiveHandler.bind(this)}
            changeCardTitle={event =>
              this.changeCardTitleHandler(event.target.value)
            }
            closeTitleChanger={this.closeTitleChangerHandler.bind(this)}
            activeTitle={this.state.activeTitle}
            saveTitleChanger={this.saveTitleChangerHandler.bind(this)}
          />
        </div>
      );
    }
  };
  //----------------------------------------------------------------------
  render() {
    return <div>{this.renderLayout()}</div>;
  }
}

export default Layout;
