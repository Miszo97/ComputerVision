import { Button, ButtonGroup, Box } from "@material-ui/core";
import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "& > *": {
      margin: theme.spacing(1),
    },
    color: "black",
  },
}));

export default function HomePageDrawingControls(props) {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <ButtonGroup variant="text" aria-label="text primary button group">
        <Button onClick={() => props.onPredictButtonPressed()}>Predict</Button>{" "}
        <Button onClick={() => props.onClearButtonPressed()}>Clear</Button>
      </ButtonGroup>
    </Box>
  );
}
