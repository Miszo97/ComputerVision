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

function crop(ar) {
    let left_border = first_pixel('left', ar)
    let right_border = first_pixel('right', ar)
    let top_border = first_pixel('up', ar)
    let bottom_border = first_pixel('down', ar)


    return 0;
}

function RGBA3dMatrixTo2dMatrix(Matrix3d) {
    //Get rid of third dimension by leaving only the first entry of it
    return Matrix3d.slice([0, 0, 0], [Matrix3d.shape[0], Matrix3d.shape[1], 1]).flatten().reshape([2, 2]);
}


function convertCanvasToNNFirstLayer() {
    let canvas = document.getElementById('canvas');
    let ctx = canvas.getContext("2d");
    ctx.scale(20, 20)
    let imageData = ctx.getImageData(0, 0, canvas.height, canvas.width);
    let image_tensor3d = tf.browser.fromPixels(imageData);
    let matrix2d = RGBA3dMatrixTo2dMatrix(image_tensor3d)
    let cropped_canvas = crop(image_tensor);
}

function predictTheNumber() {
    let input_layer = convertCanvasToNNFirstLayer();
}

let model;

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

