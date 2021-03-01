import * as helpers from helpers.js


let model;
let myBarChart;
let AUTO_PREDICTING = true;
let canvasDrawer;


const MODEL_URL = 'http://127.0.0.1:8000/number_recognition/model';

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













function predictAndDisplayTheNumberFromCanvas() {

    //predict
    const input_layer = convertCanvasToNNFirstLayer();
    const predictions = makePredictions(input_layer);
    const predicted_number = predictANumber(predictions);

    //display
    let predictedNumberHolder = document.getElementById('predicted-number-holder');
    let predictedNumberChance = document.getElementById('predicted-number-chance');
    predictedNumberHolder.innerText = predicted_number;
    predictedNumberChance.innerHTML = " " + Math.trunc(predictions.max().arraySync() * 100) + "%";

    let ctx = $('#probability-distribution-chart')[0].getContext('2d');


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

    $('#predicted-number-holder')[0].innerHTML = "";
    $('#predicted-number-chance')[0].innerHTML = "";
}


fetchAModel();

initializeProbabilityDistributionChart();




$('#auto-predict-radio')[0].onchange = () => {
    AUTO_PREDICTING = !AUTO_PREDICTING;
}

let mouseDownCounter = 0;
const auto_predict_timeout = 500;

function predictAndDisplayNumberFromCanvasIfUserStopsDrawing() {
    let mouseDownCounterCopy = JSON.parse(JSON.stringify(mouseDownCounter));
    let promise = new Promise((resolve, reject) => {
        setTimeout(
            () => {

                //if a user hasn't drawn anything since last time
                if (mouseDownCounterCopy == mouseDownCounter) {
                    predictAndDisplayTheNumberFromCanvas();
                    resolve();
                }
                reject();
            },
            auto_predict_timeout)
    });
}



function onmousedownOptional(e) {
    mouseDownCounter++;
}

function onmousemoveOptional(e) {
}

function onmouseupOptional(e) {
    if (AUTO_PREDICTING) {
        predictAndDisplayNumberFromCanvasIfUserStopsDrawing()
    }
}

function onmouseleaveOptional(e) {
}

canvasDrawer = new CanvasDrawer('drawing-canvas', onmousedownOptional,onmouseupOptional,onmousemoveOptional,onmouseleaveOptional);
