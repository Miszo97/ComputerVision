import React, { useRef } from "react";

export default class DrawableCanvas extends React.Component {
  constructor(props) {
    super(props);

    this.canvasRef = React.createRef();
    this.canvas = (
      <canvas
        ref={this.canvasRef}
        width={props.width}
        height={props.height}
        style={{ border: "1px solid #000000" }}
      />
    );

    this.clickX = [];
    this.clickY = [];
    this.clickDrag = [];
    this.paint = false;
  }

  addClick(x, y, dragging) {
    this.clickX.push(x);
    this.clickY.push(y);
    this.clickDrag.push(dragging);
  }

  componentDidUpdate() {
    this.context = this.canvasRef.current.getContext("2d");
  }

  componentDidMount() {
    this.context = this.canvasRef.current.getContext("2d");

    this.canvasRef.current.onmousedown = (e) => {
      this.paint = true;
      this.addClick(
        e.pageX - this.canvasRef.offsetLeft,
        e.pageY - this.canvasRef.offsetTop
      );
      this.redraw();
    };

    this.canvasRef.current.onmouseup = (e) => {
      this.paint = false;
    };

    this.canvasRef.current.onmousemove = (e) => {
      if (this.paint) {
        this.addClick(
          e.pageX - this.canvasRef.current.offsetLeft,
          e.pageY - this.canvasRef.current.offsetTop,
          true
        );
        this.redraw();
      }
    };

    this.canvasRef.current.onmouseleave = (e) => {
      this.paint = false;
    };
  }

  redraw() {
    this.context.clearRect(
      0,
      0,
      this.context.canvas.width,
      this.context.canvas.height
    ); // Clears the canvas

    this.context.strokeStyle = "#df4b26";
    this.context.lineJoin = "round";
    this.context.lineWidth = 8;

    for (var i = 0; i < this.clickX.length; i++) {
      this.context.beginPath();
      if (this.clickDrag[i] && i) {
        this.context.moveTo(this.clickX[i - 1], this.clickY[i - 1]);
      } else {
        this.context.moveTo(this.clickX[i] - 1, this.clickY[i]);
      }
      this.context.lineTo(this.clickX[i], this.clickY[i]);
      this.context.closePath();
      this.context.stroke();
    }
  }

  clearCanvas() {
    this.context.clearRect(
      0,
      0,
      this.context.canvas.width,
      this.context.canvas.height
    ); // Clears the canvas
    this.clickX = [];
    this.clickY = [];
    this.clickDrag = [];
  }

  getImageData() {
    const canvas = this.canvasRef.current;
    this.context.drawImage(canvas, 0, 0);
    return this.context.getImageData(0, 0, canvas.width, canvas.height);
  }

  getCanvas() {
    return this.canvasRef.current;
  }

  render() {
    return this.canvas;
  }
}
