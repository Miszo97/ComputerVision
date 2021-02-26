import React from "react";
import {Box} from "@material-ui/core"

export default function ResultsSpace(props) {
  return (
    <Box border={1}>
      <Box border={1} style={{height: 200}}>

      {props.predictedNumber}

      </Box>
      <Box border={1} style={{height: 200}}>

        chart

      </Box>
    </Box>
    
  );
}
