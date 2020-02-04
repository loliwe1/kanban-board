import React from "react";
import "./App.css";
import Layout from "./hoc/Layout/Layout";
import PopupName from "./components/PopupName/PopupName";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Layout />
        <PopupName />
      </div>
    );
  }
}

export default App;
