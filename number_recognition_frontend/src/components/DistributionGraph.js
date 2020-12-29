import React, { Component } from "react";
import Chart from "chart.js";

export class DistributionGraph extends Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
    this.canvas = (
      <canvas
        style={{ width: props.width, height: props.height }}
        ref={this.canvasRef}
      ></canvas>
    );
  }

  componentDidMount() {
    this.canvasContext = this.canvasRef.current.getContext("2d");
    this.myBarChart = this.createDistributionGraph(
      this.canvasContext,
      this.props.predictions
    );
  }

  componentDidUpdate() {
    this.canvasContext = this.canvasRef.current.getContext("2d");
    this.myBarChart.destroy();
    this.myBarChart = this.createDistributionGraph(
      this.canvasContext,
      this.props.predictions
    );
  }

  createDistributionGraph(ctx, data) {
    return new Chart(ctx, {
      type: "bar",
      data: {
        labels: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        datasets: [
          {
            data: data,
            backgroundColor: "#28c9c4",
            label: "probability distribution",
          },
        ],
      },
    });
  }

  render() {
    return this.canvas;
  }
}
