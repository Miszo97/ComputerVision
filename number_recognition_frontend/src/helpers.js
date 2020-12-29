import * as tf from '@tensorflow/tfjs';

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


export function convertCanvasToNNFirstLayer(imageData) {

    //convert and resize a 3d RGB canvas to a 2d tensor [20,20]
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

export function makePredictions(input_layer,model) {
    //return a tensor of a probability distribution of each number
    return tf.softmax(model.predict(input_layer.reshape([1, 400, 1])).squeeze());
}

export function predictANumber(predictions,model) {
    //return a number with the highest probability

    return predictions.argMax().arraySync();
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