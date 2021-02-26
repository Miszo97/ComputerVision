import React from "react";

export default class Canvas extends React.Component {
  constructor(props) {
    super(props);
    this.canvas = (
      <canvas
        id="drawing-canvas"
        width={props.width}
        height={props.height}
        style={{ border: "1px solid #000000" }}
      />
    );
  }

  render() {
    this.canvas;
  }
}
