import React, { Component } from "react";
import { Container } from "@material-ui/core";
import DrawingInterfaceSpace from "./DrawingInterfaceSpace";
import ResultsSpace from "./ResultsSpace";
import {makePredictions, predictANumber, convertCanvasToNNFirstLayer} from "../helpers"
// const tf = require('@tensorflow/tfjs');
import * as tf from '@tensorflow/tfjs';


export default class HomePage extends Component{

  drawingInterfaceSpaceRef = React.createRef();

  constructor(props){
    super(props)

    this.fetchAModel();
    this.state = { 
      predictedNumber: null,
      drawnNumberImageData: null
    }


  }

  handlePredictButtonClicked(){
    this.predictADigitAndDisplayResults();
  }

  predictADigitAndDisplayResults(){
    let imageData = this.drawingInterfaceSpaceRef.current.getImageDataFromCanvas()
    let firstLayer = convertCanvasToNNFirstLayer(imageData);
    let predictoins = makePredictions(firstLayer, this.model);
    let predictedNumber = predictANumber(predictoins, this.model);

    this.setState({predictedNumber: predictedNumber});
  }

MODEL_URL = 'http://127.0.0.1:8000/number_recognition/request_a_model';
async fetchAModel() {

    this.model = await tf.loadLayersModel(this.MODEL_URL);
}
  
  render(){
  return (
    <Container>
      <DrawingInterfaceSpace ref={this.drawingInterfaceSpaceRef} onPredictButtonPressed={this.handlePredictButtonClicked.bind(this)}/>
      <ResultsSpace predictedNumber={this.state.predictedNumber} />
    </Container>
  );

  }
}
