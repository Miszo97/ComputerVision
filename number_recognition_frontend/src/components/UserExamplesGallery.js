import React, { Component } from "react";
import { Grid, Box } from "@material-ui/core";

export default class UserExamplesGallery extends Component {
  constructor(props) {
    super(props);
  }

  GridItems(props) {
    let gridItems = [];
    for (const item of props.items) {
      gridItems.push(
        <Grid item key={item.key} md={4}>
          {item}
        </Grid>
      );
    }
    return gridItems;
  }

  render() {
    return (
      <Box mt={5}>
        <Grid container justify="center" spacing={2}>
          <this.GridItems items={this.props.userExamples} />
        </Grid>
      </Box>
    );
  }
}
