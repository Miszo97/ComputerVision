import { Button, Box } from "@material-ui/core";
import React, { Component } from "react";
import UserExample from "./UserExample";
import UserExamplesGallery from "./UserExamplesGallery";

export default class ExampleSelectionPage extends Component {
  constructor(props) {
    super(props);

    this.state = { userExamples: [] };
    this.fetchAllUserExamples("number_recognition/user-examples");
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

  rejectUserExamples(ids) {
    const body = { ids: ids, command: "reject" };

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    };

    fetch("number_recognition/model-examples", requestOptions)
      .then((response) => response.json())
      .then((data) => console.log(data));

    //TODO Needs optimazation
    ids.forEach((id) => {
      this.deleteUserExample(id);
    });
  }

  acceptUserExamples(ids) {
    const body = { ids: ids, command: "accept" };

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    };

    fetch("number_recognition/model-examples", requestOptions)
      .then((response) => response.json())
      .then((data) => console.log(data));

    //TODO Needs optimazation
    ids.forEach((id) => {
      this.deleteUserExample(id);
    });
  }

  createUserExamplesComponents(data) {
    const userExamples = [];

    data.forEach((element) => {
      let controls = (
        <Box>
          <Button
            onClick={() => {
              this.acceptUserExamples([element.id]);
            }}
          >
            Add
          </Button>
          <Button
            onClick={() => {
              this.rejectUserExamples([element.id]);
            }}
          >
            Reject
          </Button>
          {element.label}
        </Box>
      );

      console.log(element.id);

      const userExample = (
        <UserExample
          id={element.id}
          key={element.id}
          dataURL={element.drawing_base64}
          userExampleInterface={controls}
        ></UserExample>
      );
      userExamples.push(userExample);
    });

    this.setState({ userExamples: userExamples });
  }

  fetchAllUserExamples(url) {
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };

    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        this.createUserExamplesComponents(data);
      });
  }

  render() {
    return <UserExamplesGallery userExamples={this.state.userExamples} />;
  }
}
