import React, { Component } from "react";
import { Container } from "@material-ui/core";
import DrawingInterfaceSpace from "./DrawingInterfaceSpace";
import ResultsSpace from "./ResultsSpace";
import {
  makePredictions,
  predictANumber,
  convertCanvasToNNFirstLayer,
} from "../helpers";
import * as tf from "@tensorflow/tfjs";
import HomePageDrawingControls from "./HomePageDrawingControls";

export default class HomePage extends Component {
  drawingInterfaceSpaceRef = React.createRef();

  constructor(props) {
    super(props);
    
    this.MODEL_URL = "number_recognition/model";
    this.fetchAModel(this.MODEL_URL);
    this.state = {
      predictedNumber: null,
      predictions: null,
    };
  }

  handlePredictButtonClicked() {
    this.predictADigitAndDisplayResults();
  }

  handleClearButtonClicked() {
    this.setState({
      predictedNumber: "",
      predictions: null,
    });

    this.drawingInterfaceSpaceRef.current.clearCanvas();
  }

  predictADigitAndDisplayResults() {
    let firstLayer;
    const imageData = this.drawingInterfaceSpaceRef.current.getImageDataFromCanvas();
    try {
      firstLayer = convertCanvasToNNFirstLayer(imageData);

    } catch (error) {

      alert("an inappropriate drawing")

      return;
    }
    
    const predictions = makePredictions(firstLayer, this.model);
    const predictedNumber = predictANumber(predictions, this.model);

    this.setState({
      predictedNumber: predictedNumber,
      predictions: predictions.arraySync(),
    });
  }

  
  async fetchAModel(modelUrl) {
    this.model = await tf.loadLayersModel(modelUrl);
  }

  render() {
    const homePageDrawingControls = (
      <HomePageDrawingControls
        onPredictButtonPressed={() => {
          this.handlePredictButtonClicked();
        }}
        onClearButtonPressed={() => {
          this.handleClearButtonClicked();
        }}
      />
    );

    return (
      <Container>
        <DrawingInterfaceSpace
          drawingControls={homePageDrawingControls}
          ref={this.drawingInterfaceSpaceRef}
        />
        <ResultsSpace
          predictedNumber={this.state.predictedNumber}
          predictions={this.state.predictions}
        />
      </Container>
    );
  }
}
