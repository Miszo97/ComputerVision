import { Button, Box } from "@material-ui/core";
import React, { Component } from "react";
import Canvas from "./Canvas";

export default class UserExample extends Component {
  constructor(props) {
    console.log("user example constructor");
    super(props);
    this.id = props.id;
  }

  render() {
    return (
      <Box>
        <Canvas
          dataURL={this.props.dataURL}
          imageData={this.props.imageData}
          canvas={this.props.canvas}
          width={400}
          heigiht={400}
        />

        {this.props.userExampleInterface}
      </Box>
    );
  }
}
