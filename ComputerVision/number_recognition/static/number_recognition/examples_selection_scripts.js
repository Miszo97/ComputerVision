"use strict";

//Send to the server ids of examples to be screened out
function updateExamples() {
    let sendExamplesForm = document.getElementById('deleted-examples-form');
    let deletedExamplesInput = document.getElementById('deleted-examples');
    deletedExamplesInput.value = JSON.stringify(deletedExamples);
    sendExamplesForm.submit();
}