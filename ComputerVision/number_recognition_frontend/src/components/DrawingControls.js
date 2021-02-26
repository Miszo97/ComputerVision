import { Button, Container, Grid, Box } from "@material-ui/core";
import React from "react";
import { AntSwitch } from "./AntSwitch";


export default function DrawingControl(props) {
  return (
    <Grid container justify = "center">
    <Box display="flex" style={{ width: '100%' }}>
      <Box border={1} >
        <Button onClick={()=>props.onPredictButtonPressed()}>Predict</Button>
      </Box>
      <Box border={1}>
        <Button onClick={() => props.onClearButtonClicked()}>Clear</Button>
      </Box>
      <Box border={1} flexGrow={1}>
        Auto-predict <AntSwitch  name="checkedC" />
      </Box>
    </Box>
    </Grid>

  );
}
