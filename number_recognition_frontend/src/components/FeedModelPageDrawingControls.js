import { Button, Box, Select, MenuItem, InputLabel } from "@material-ui/core";
import React, { Component } from "react";

export default class FeedModelPageDrawingControls extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Box display="flex" style={{ width: "100%" }}>
        <Box>
          <Button
            onClick={() => {
              this.props.onAddUserExampleToGallery();
            }}
          >
            add user example
          </Button>
        </Box>
        <Box border={0}>
          <Button onClick={() => this.props.onClearButtonPressed()}>
            Clear
          </Button>
        </Box>
        <Box border={0} flexGrow={1} textAlign="right">
          <InputLabel id="label">Digit</InputLabel>
          <Select
            onChange={this.props.onInputedNumberChange}
            labelId="label"
            id="select"
            value={this.props.inputedDigit}
          >
            <MenuItem value="1">1</MenuItem>
            <MenuItem value="2">2</MenuItem>
            <MenuItem value="3">3</MenuItem>
            <MenuItem value="4">4</MenuItem>
            <MenuItem value="5">5</MenuItem>
            <MenuItem value="6">6</MenuItem>
            <MenuItem value="7">7</MenuItem>
            <MenuItem value="8">8</MenuItem>
            <MenuItem value="9">9</MenuItem>
            <MenuItem value="0">0</MenuItem>
          </Select>
        </Box>
      </Box>
    );
  }
}
