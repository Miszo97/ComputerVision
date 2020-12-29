import React from "react";

export default class Canvas extends React.Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();

    this.canvas = (
      <canvas
        ref={this.canvasRef}
        width={400}
        height={400}
        style={{ border: "1px solid #000000" }}
      />
    );
  }

  componentDidMount() {
    if (this.props.canvas !== undefined) {
      this.canvasRef.current
        .getContext("2d")
        .drawImage(this.props.canvas, 0, 0, 400, 400);
    } else {
      let img = new Image();
      img.src = this.props.dataURL;

      this.canvasRef.current.getContext("2d").drawImage(img, 0, 0, 400, 400);
      // this.render();
    }
  }

  render() {
    return this.canvas;
  }
}
