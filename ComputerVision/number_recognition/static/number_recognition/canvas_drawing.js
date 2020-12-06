"use strict";

class CanvasDrawer {

    clickX = [];
    clickY = [];
    clickDrag = [];
    context;
    canvas;
    paint;

    constructor(canvas_id, onmousedownOptional, onmouseupOptional, onmousemoveOptional, onmouseleaveOptional) {


        this.canvas = $('#' + canvas_id)[0];
        this.context = this.canvas.getContext("2d");

        function onmousedown(e) {

            this.paint = true;
            addClick(e.pageX - canvas.offsetLeft, e.pageY - canvas.offsetTop);
            redraw();
            onmousedownOptional()
        }

        function onmousemove(e) {
            if (paint) {
                addClick(e.pageX - canvas.offsetLeft, e.pageY - canvas.offsetTop, true);
                redraw();
            }
            onmousemoveOptional()
        }

        function onmouseup(e) {

            this.paint = false;
            onmouseupOptional()
        }

        function onmouseleave(e) {
            this.paint = false;
            onmouseleaveOptional();
        }

        this.canvas.onmousedown = function (e) {
            onmousedown(e)
        };

        this.canvas.onmouseup = function (e) {
            onmouseup(e)
        };

        this.canvas.onmousemove = function (e) {
            onmousemove(e)
        };

        this.canvas.onmouseleave = function (e) {
            onmouseleave(e)
        };
    }


    addClick(x, y, dragging) {

        clickX.push(x);
        clickY.push(y);
        clickDrag.push(dragging);
    }

    redraw() {
        this.context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clears the canvas

        this.context.strokeStyle = "#df4b26";
        this.context.lineJoin = "round";
        this.context.lineWidth = 8;

        for (var i = 0; i < clickX.length; i++) {

            this.context.beginPath();
            if (clickDrag[i] && i) {
                this.context.moveTo(clickX[i - 1], clickY[i - 1]);
            } else {
                this.context.moveTo(clickX[i] - 1, clickY[i]);
            }
            this.context.lineTo(clickX[i], clickY[i]);
            this.context.closePath();
            this.context.stroke();
        }


    }

    clearCanvas() {
        this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height); // Clears the canvas
        this.clickX = [];
        this.clickY = [];
        this.clickDrag = [];
    }

}



