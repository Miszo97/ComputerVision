import React, { Component } from "react";
import DrawableCanvas from "./DrawableCanvas";
import { Box, Grid } from "@material-ui/core";

export default class DrawingInterfaceSpace extends Component {
  constructor(props) {
    super(props);
  }

  drawableCanvasRef = React.createRef();

  clearCanvas() {
    this.drawableCanvasRef.current.clearCanvas();
  }

  getImageDataFromCanvas() {
    return this.drawableCanvasRef.current.getImageData();
  }

  getCanvas() {
    return this.drawableCanvasRef.current.getCanvas();
  }

  getInputedNumber() {}

  render() {
    return (
      <Grid container justify="center">
        <Box mt={5} mb={5}>
          <DrawableCanvas
            ref={this.drawableCanvasRef}
            width="400"
            height="400"
          />
          {this.props.drawingControls}
        </Box>
      </Grid>
    );
  }
}
