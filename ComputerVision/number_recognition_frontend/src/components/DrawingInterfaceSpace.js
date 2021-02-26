import React, {Component} from "react";
import DrawableCanvas from "./DrawableCanvas";
import { Box , Grid } from "@material-ui/core"
import DrawingControls from "./DrawingControls"


export default class DrawingInterfaceSpace extends Component {
  
  drawableCanvasRef = React.createRef();

  clearCanvas(){
    this.drawableCanvasRef.current.clearCanvas()
  }

  getImageDataFromCanvas(){
    return this.drawableCanvasRef.current.getImageData()
  }

  render(){
  return (
     <Grid container justify = "center">
        <Box mt={5} mb={5}>
          <DrawableCanvas ref={this.drawableCanvasRef} width="400" height="400" />
          <DrawingControls onPredictButtonPressed={this.props.onPredictButtonPressed} onClearButtonClicked = {this.clearCanvas.bind(this)} />
        </Box>
    </Grid>
  );
  }
}
