import React from "react";
import FeedModelPage from "./FeedModelPage";
import HomePage from "./HomePage";
import {Switch, Route} from "react-router-dom"


export default function Main(props) {
  return (
    <Switch>
      <Route exact path='/' component={HomePage}></Route>
      <Route exact path='/feedmodel' component={FeedModelPage}></Route>
    </Switch>
  );
}
