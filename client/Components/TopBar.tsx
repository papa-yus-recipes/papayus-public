import React from "react";
import ReactDOM from "react-dom";
import "./TopBar.css";

class TopBar extends React.Component {
  override render() {
    return <div className="d-flex">Hello World</div>;
  }
}

ReactDOM.render(<TopBar />, document.getElementById("top-bar"));
