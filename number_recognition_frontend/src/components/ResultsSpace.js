import React, { Component } from "react";
import { Box, Typography } from "@material-ui/core";
import { DistributionGraph } from "./DistributionGraph";

export default class ResultsSpace extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Box border={0}>
        <Box
          display="flex"
          justifyContent="center"
          border={0}
          style={{ height: 200 }}
        >
          <Typography variant="h2">{this.props.predictedNumber}</Typography>
        </Box>
        <Box border={0}>
          <DistributionGraph
            width="800"
            height="400"
            predictions={this.props.predictions}
          />
        </Box>
      </Box>
    );
  }
}
