import React from "react";
import "./Layout.css";
import Coloms from "../../components/Coloms/Coloms";

class Layout extends React.Component {
  render() {
    return (
      <div className="Layout">
        <Coloms name="TODO" />
        <Coloms name="In Progress" />
        <Coloms name="Testing" />
        <Coloms name="Done" />
      </div>
    );
  }
}

export default Layout;
