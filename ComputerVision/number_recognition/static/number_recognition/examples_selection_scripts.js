function updateExamples() {
    let sendExamplesForm = document.getElementById('send_examples_form');
    let deleted_user_examples = document.getElementById('deleted_user_examples');
    deleted_user_examples.value = JSON.stringify(deletedExamples);
    sendExamplesForm.submit();
}