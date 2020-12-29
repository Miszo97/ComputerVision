"use strict";

const CANVAS_CREATOR_WIDTH = 400;
const CANVAS_CREATOR_HEIGHT = 400;

let addedExamplesNumberTotal = 0;
let currentAmountOfExamples = 0;

function addExampleToGallery() {
    addedExamplesNumberTotal++;
    currentAmountOfExamples++;

    if(currentAmountOfExamples%3 === 0){
        $('#user-examples-gallery')[0].append(document.createElement("row"))
    }

    const userExampleCreatorCanvas = document.getElementById('drawing-canvas');
    const userExampleCreatorCanvasArray = userExampleCreatorCanvas.getContext('2d').getImageData(0, 0, CANVAS_CREATOR_WIDTH, CANVAS_CREATOR_HEIGHT).data;

    // checks whether an element is not zero
    const isNonZero = (element) => element !== 0;

    // Add the new example only if the user drew something.
    if (userExampleCreatorCanvasArray.some(isNonZero)) {

        let gallery = document.getElementById("user-examples-gallery");
        let canvasCopy = document.createElement('canvas');

        let div = document.createElement('div');
        div.id = 'user-example-instance_' + addedExamplesNumberTotal;
        div.className = 'column-4';


        let discardButton = document.createElement('button');
        discardButton.innerText = 'Discrad!';
        let addedExamplesNumberTotal_copy = addedExamplesNumberTotal;
        discardButton.onclick = () => {
            gallery.removeChild(document.getElementById('user-example-instance_' + addedExamplesNumberTotal_copy))
            currentAmountOfExamples--;
        };


        canvasCopy.style.border = '1px solid blue';
        canvasCopy.width = userExampleCreatorCanvas.width;
        canvasCopy.height = userExampleCreatorCanvas.height;
        canvasCopy.getContext('2d').drawImage(userExampleCreatorCanvas, 0, 0);

        let label = document.createElement('p');
        label.innerText = document.getElementById("numbers_choice").value;

        document.getElementById("counter").innerHTML = String(addedExamplesNumberTotal);

        div.appendChild(canvasCopy);
        div.appendChild(label);
        div.appendChild(discardButton);
        gallery.lastChild.appendChild(div);

        clearCanvas();
    }
}



function clearCanvas() {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clears the UserExampleCreatorCanvas
}

function getUserExamplesFromGallery() {
    const userExamplesGallery = document.getElementById("user-examples-gallery").children
    let userExamples = [];
    for (const userExamplesGalleryElement of userExamplesGallery) {
        const divContent = userExamplesGalleryElement.children;
        userExamples.push({'dataURL': divContent[0].toDataURL(), 'label': divContent[1].innerHTML})
    }
    return userExamples
}

function sendUserExamplesFromGallery() {
    let userExamplesFromGalleryJson = getUserExamplesFromGallery();
    let userExamplesFromGallery = JSON.stringify(userExamplesFromGalleryJson);

    $('#user-examples')[0].value = userExamplesFromGallery;
    $('#new-examples-form')[0].submit();
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

let context = $('#drawing-canvas')[0].getContext('2d');

document.addEventListener('keydown', (event) => {
    const keyName = event.key;

    switch (keyName) {
        case 'a': // do not alert when only Control key is pressed.
            addExampleToGallery();
            break;
        case 'c':
            clearCanvas();
            break;
    }

}, false);
