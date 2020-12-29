import React, { Component } from "react";
import DrawingInterfaceSpace from "./DrawingInterfaceSpace";
import UserExamplesGallery from "./UserExamplesGallery";
import { Box, Button, Container } from "@material-ui/core";
import UserExample from "./UserExample";
import FeedModelPageDrawingControls from "./FeedModelPageDrawingControls";

export default class FeedModelPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userExamples: [],
      inputedDigit: 1,
    };
    this.drawingInterfaceSpaceRef = React.createRef();
    this.addedExamplesSoFar = 0;
  }

  deleteUserExample(id) {
    let userExamplesCopy = [...this.state.userExamples];
    const index = userExamplesCopy.findIndex(
      (userExample) => userExample.props.id === id
    );
    if (index >= 0) {
      userExamplesCopy.splice(index, 1);
      this.setState({ userExamples: userExamplesCopy });
    }
  }

  onDiscardButtonPressed(arg) {
    this.deleteUserExample(arg);
  }

  getFeedDataFromUserExamples(userExamples) {
    return userExamples.map((userExample) => {
      return {
        drawing_base64: userExample.props.dataURL,
        label: userExample.props.inputedDigit,
      };
    });
  }

  sendUserExamples(userExamples, url) {
    const feedData = this.getFeedDataFromUserExamples(userExamples);

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(feedData),
    };

    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((data) => console.log(data));

    this.setState({ userExamples: [] });
  }

  onAddUserExampleToGallery() {
    const canvas = this.drawingInterfaceSpaceRef.current.getCanvas();
    const inputedDigit = this.state.inputedDigit;
    const exampleID = this.addedExamplesSoFar;
    const controls = (
      <Box>
        <Button
          onClick={() => {
            this.onDiscardButtonPressed(exampleID);
          }}
        >
          Discard
        </Button>
        {inputedDigit}
      </Box>
    );

    const userExample = (
      <UserExample
        inputedDigit={inputedDigit}
        key={exampleID}
        id={exampleID}
        userExampleInterface={controls}
        canvas={canvas}
        dataURL={canvas.toDataURL()}
      />
    );
    this.addUserExample(userExample);
  }

  onInputedNumberChange(e) {
    this.setState({ inputedDigit: e.target.value });
  }

  onClearButtonclicked() {
    this.drawingInterfaceSpaceRef.current.clearCanvas();
  }

  addUserExample(userExample) {
    this.setState({
      userExamples: this.state.userExamples.concat(userExample),
    });
    this.addedExamplesSoFar++;
  }

  render() {
    let feedModelPageDrawingControls = (
      <FeedModelPageDrawingControls
        onInputedNumberChange={this.onInputedNumberChange.bind(this)}
        inputedDigit={this.state.inputedDigit}
        onClearButtonPressed={() => {
          this.onClearButtonclicked();
        }}
        onAddUserExampleToGallery={this.onAddUserExampleToGallery.bind(this)}
      />
    );
    return (
      <Container>
        <DrawingInterfaceSpace
          ref={this.drawingInterfaceSpaceRef}
          drawingControls={feedModelPageDrawingControls}
        />

        <Box textAlign="center">
          <Button
            onClick={() => {
              this.sendUserExamples(
                this.state.userExamples,
                "number_recognition/senduserexamples"
              );
            }}
          >
            send user examples
          </Button>
        </Box>
        <UserExamplesGallery userExamples={this.state.userExamples} />
      </Container>
    );
  }
}
