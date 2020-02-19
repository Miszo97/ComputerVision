let addedExamplesNumberTotal = 0;

function addToGallery() {
    addedExamplesNumberTotal++;

    const userExampleCreatorCanvas = document.getElementById('UserExampleCreatorCanvas');
    const userExampleCreatorCanvasArray = userExampleCreatorCanvas.getContext('2d').getImageData(0, 0, 200, 200).data;

    // checks whether an element is not zero
    const isNonZero = (element) => element !== 0;

    // Add the new example only if the user drew something.
    if (userExampleCreatorCanvasArray.some(isNonZero)) {

        let gallery = document.getElementById("UserExamplesGallery");
        let canvasCopy = document.createElement('canvas');

        let div = document.createElement('div');
        div.id = 'UserExampleInstance_' + addedExamplesNumberTotal;
        div.className = 'UserExampleInstance';


        let discardButton = document.createElement('button');
        discardButton.innerText = 'Discrad!';
        let addedExamplesNumberTotal_copy = addedExamplesNumberTotal;
        discardButton.onclick = () => {
            gallery.removeChild(document.getElementById('UserExampleInstance_' + addedExamplesNumberTotal_copy))
        };


        canvasCopy.style.border = '1px solid blue';
        canvasCopy.width = userExampleCreatorCanvas.width;
        canvasCopy.height = userExampleCreatorCanvas.height;
        canvasCopy.getContext('2d').drawImage(userExampleCreatorCanvas, 0, 0);

        let label = document.createElement('p');
        label.innerText = document.getElementById("numbers_choice").value;

        div.appendChild(canvasCopy);
        div.appendChild(label);
        div.appendChild(discardButton);
        gallery.appendChild(div);

        clearCanvas();
    }
}


document.addEventListener('keydown', (event) => {
    const keyName = event.key;

    if (keyName === 'a') {
        // do not alert when only Control key is pressed.
        console.log(`Key pressed ${keyName}`);
        addToGallery();
        return;
    }

}, false);

function clearCanvas() {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clears the UserExampleCreatorCanvas
}

function getUserExamplesFromGallery() {
    const userExamplesGallery = document.getElementById("UserExamplesGallery").children
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
    let sendExamplesForm = document.getElementById('send_examples_form');
    let userExamplesInput = document.getElementById('user_examples');

    userExamplesInput.value = userExamplesFromGallery;
    sendExamplesForm.submit();
}