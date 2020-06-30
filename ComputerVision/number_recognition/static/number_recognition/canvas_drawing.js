"use strict";

//let canvas = document.getElementById('canvas');
let canvas = document.getElementsByTagName('canvas')[0] // first canvas on the page
let context = canvas.getContext("2d");

let clickX = [];
let clickY = [];
let clickDrag = [];
let paint;

function addClick(x, y, dragging) {

    clickX.push(x);
    clickY.push(y);
    clickDrag.push(dragging);
}

function redraw() {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clears the canvas

    context.strokeStyle = "#df4b26";
    context.lineJoin = "round";
    context.lineWidth = 8;

    for (var i = 0; i < clickX.length; i++) {

        context.beginPath();
        if (clickDrag[i] && i) {
            context.moveTo(clickX[i - 1], clickY[i - 1]);
        } else {
            context.moveTo(clickX[i] - 1, clickY[i]);
        }
        context.lineTo(clickX[i], clickY[i]);
        context.closePath();
        context.stroke();
    }


}

function onmousedown(e) {

    paint = true;
    addClick(e.pageX - canvas.offsetLeft, e.pageY - canvas.offsetTop);
    redraw();
}

function onmousemove(e) {
    if (paint) {
        addClick(e.pageX - canvas.offsetLeft, e.pageY - canvas.offsetTop, true);
        redraw();
    }
}

function onmouseup(e) {
    paint = false;
}

function onmouseleave(e) {
    paint = false;
}

canvas.onmousedown = function (e) {
    onmousedown(e)
};

canvas.onmouseup = function (e) {
    onmouseup(e)
};

canvas.onmousemove = function (e) {
    onmousemove(e)
};

canvas.onmouseleave = function (e) {
    onmouseleave(e)
};


function clearCanvas() {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clears the canvas
    clickX = [];
    clickY = [];
    clickDrag = [];
}