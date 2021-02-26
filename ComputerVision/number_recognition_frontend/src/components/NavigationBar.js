import React from "react";
import { render } from "react-dom";
import {Toolbar, IconButton, AppBar, Typography, Button} from "@material-ui/core"
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from "react-router-dom";

export default function NavigationBar(props) {
  return (
    <AppBar position="static">
      <Toolbar>
        <Link to="/">Predict</Link>
        <Link to="/feedmodel">Feed Model</Link>
      </Toolbar>
    </AppBar>
  );

}
