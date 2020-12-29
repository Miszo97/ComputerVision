import React from "react";
import { render } from "react-dom";
import {
  Toolbar,
  IconButton,
  AppBar,
  Typography,
  Button,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { NavLink } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    color: "white",
  },
appbar: {
  backgroundColor: '#28c9c4',
}
}));

export default function NavigationBar(props) {

  const classes = useStyles();


  return (
    <AppBar position="static" className={classes.appbar}>
      <Toolbar >
        <NavLink style={{ textDecoration: 'none' }} to="/">
          <Button>
            <Typography variant="h6" className={classes.title}>
              Predict
            </Typography>
          </Button>
        </NavLink>
        <NavLink style={{ textDecoration: 'none' }} to="/feedmodel">
          <Button>
            <Typography variant="h6" className={classes.title}>
              Feed Model
            </Typography>
          </Button>
        </NavLink>
        <NavLink style={{ textDecoration: 'none' }}  to="/exampleselection">
          <Button>
            <Typography variant="h6" className={classes.title}>
              Example Selection
            </Typography>
          </Button>
        </NavLink>
      </Toolbar>
    </AppBar>
  );
}
