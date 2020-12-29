import React, { Component } from "react";
import { render } from "react-dom";
import Main from "./Main";
import { BrowserRouter } from "react-router-dom";
import NavigationBar from "./NavigationBar";

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <NavigationBar />
          <Main />
        </div>
      </BrowserRouter>
    );
  }
}

const appDiv = document.getElementById("app");
render(<App />, appDiv);
