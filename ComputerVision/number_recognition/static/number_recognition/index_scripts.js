let model;
let myBarChart;

const MODEL_URL = 'http://127.0.0.1:8000/number_recognition/request_a_model';

function sendUserDrewImage() {
    let canvas = document.getElementById('canvas');

    let userNumber = canvas.toDataURL();
    let userNumberJSON = JSON.stringify(userNumber)

    $.ajax({
        url: 'predict_number',
        data: {
            'number_to_predict': userNumberJSON
        },
        dataType: 'json',
        success: function (data) {
            let predictedNumberHolder = document.getElementById("predicted-number-holder")
            predictedNumberHolder.innerHTML = data.predicted_number
        }

    });
}

function first_pixel(orientation, array) {

    if (orientation == 'up') {
        const axis = 1;

        array = tf.cast(array, 'bool');
        let array_js = array.any(axis).arraySync();
        return array_js.indexOf(1);

    }
    if (orientation == 'down') {

        const axis = 1;

        array = tf.cast(array, 'bool');
        let array_js = array.any(axis).arraySync();
        return array_js.lastIndexOf(1);

    }
    if (orientation == 'left') {
        const axis = 0;

        array = tf.cast(array, 'bool');
        let array_js = array.any(axis).arraySync();
        return array_js.indexOf(1);

    }
    if (orientation == 'right') {
        const axis = 0

        array = tf.cast(array, 'bool');
        let array_js = array.any(axis).arraySync();
        return array_js.lastIndexOf(1);

    }

    //if it didn 't find the first occurence of a pixel or the orientation wasn't correctly specified
    return -1

}

function crop(tensor2d) {
    const left_border = first_pixel('left', tensor2d);
    const right_border = first_pixel('right', tensor2d);
    const top_border = first_pixel('up', tensor2d);
    const bottom_border = first_pixel('down', tensor2d);

    return tensor2d.slice([top_border, left_border], [bottom_border - top_border + 1, right_border - left_border + 1]);
}

function RGBA3dMatrixTo2dMatrix(Matrix3d) {
    //Get rid of third dimension by leaving only the first entry of it
    const x = Matrix3d.shape[0];
    const y = Matrix3d.shape[1];
    return Matrix3d.slice([0, 0, 0], [x, y, 1]).flatten().reshape([x, y]);
}

function resize(tensor2d, size) {

    //Resizing function accepts at least 3D tensors
    // so let's expand it's dimensions
    let tensor3d = tensor2d.expandDims(2);
    //resize to given size
    let resized3d = tf.image.resizeBilinear(tensor3d, size);
    //Get rid of third 1-lenght dimension
    let resized2d = resized3d.squeeze();

    return resized2d;

}

function getImageDataFromCanvas(canvasID) {
    let canvas = document.getElementById(canvasID);
    let ctx = canvas.getContext("2d");
    return ctx.getImageData(0, 0, canvas.height, canvas.width);
}

function convertCanvasToNNFirstLayer() {

    //convert and resize a 3d RGB canvas to a 2d tensor [20,20]
    let imageData = getImageDataFromCanvas('canvas');
    let image_tensor3d = tf.browser.fromPixels(imageData);
    let matrix2d = RGBA3dMatrixTo2dMatrix(image_tensor3d);
    let cropped_tesor = crop(matrix2d);
    let resized_cropped_image = resize(cropped_tesor, [20, 20]);

    //normalize
    const min_element = tf.min(resized_cropped_image);
    const max_element = tf.max(resized_cropped_image);
    const delta = max_element.sub(min_element);
    let normalized_image = (resized_cropped_image.sub(min_element)).div(delta);

    //reshape [1,400]
    const first_layer = normalized_image.reshape([1, 400]);
    return first_layer;
}

function makePredictions(input_layer) {
    //return a tensor of a probability distribution of each number
    return tf.softmax(model.predict(input_layer.reshape([1, 400, 1])).squeeze());
}

function predictANumber(predictions) {
    //return a number with the highest probability
    return predictions.argMax();
}

function predictAndDisplayTheNumberFromCanvas() {

    //predict
    const input_layer = convertCanvasToNNFirstLayer();
    const predictions = makePredictions(input_layer);
    const predicted_number = predictANumber(predictions).arraySync();

    //display
    let predictedNumberHolder = document.getElementById('predicted-number-holder');
    let predictedNumberChance = document.getElementById('predicted-number-chance');
    predictedNumberHolder.innerText = predicted_number;
    predictedNumberChance.innerHTML = " " + Math.trunc(predictions.max().arraySync() * 100) + "%";

    const canvas = document.getElementById('probability-distribution-chart');
    let ctx = canvas.getContext('2d');

    myBarChart.destroy();

    myBarChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
            datasets: [{
                data: predictions.arraySync(),
                backgroundColor: '#28c9c4',
                label: "probability distribution",
            }]
        },
    });

}


async function fetchAModel() {
    model = await tf.loadLayersModel(MODEL_URL);
}

function initializeProbabilityDistributionChart() {
    let ctx = document.getElementById('probability-distribution-chart').getContext('2d');
    myBarChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        },
        backgroundColor: 'blue'
    });
}

function clearProbabilityDistributionChart() {
    myBarChart.destroy();
    initializeProbabilityDistributionChart();
}

function resetWorkSpace() {
    //clear previous results

    clearCanvas();
    clearProbabilityDistributionChart();

    let predictedNumberHolder = document.getElementById("predicted-number-holder");
    let predictedNumberChance = document.getElementById('predicted-number-chance');
    predictedNumberHolder.innerHTML = "";
    predictedNumberChance.innerHTML = "";
}


function requestAModel() {

    $.ajax({
        url: 'request_a_model',
        data: {
            'model': 'number_recognition_model'
        },
        dataType: 'json',
        success: async function (data) {
            let model_json_string = data.requested_model;
            model = await tf.models.modelFromJSON(JSON.parse(model_json_string))
        }

    });


}

fetchAModel();


initializeProbabilityDistributionChart();
