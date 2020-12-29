describe("RGBA3dMatrixTo2dMatrix", function () {

    it("cut out the third dimension", function () {
        matrix_3d = tf.tensor3d([1, 2, 3, 4, 5, 6, 7, 8], [2, 2, 2]);
        expected_2d_matrix = [[1, 3], [5, 7]];
        let matrix_after_tranformation = RGBA3dMatrixTo2dMatrix(matrix_3d).arraySync();
        assert.equal(JSON.stringify(matrix_after_tranformation), JSON.stringify(expected_2d_matrix));
    });
});

describe("frist_pixel", function () {

    it("test 1", function () {
        let ar = tf.tensor2d([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [3, 4]);

        const columns = ar.shape[1];
        const rows = ar.shape[0];


        assert.equal(first_pixel('up', ar), 0);
        assert.equal(first_pixel('left', ar), 0);
        assert.equal(first_pixel('down', ar), rows - 1);
        assert.equal(first_pixel('right', ar), columns - 1);
    });

    it("test 2", function () {
        ar = tf.tensor2d(
            [0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0], [4, 5]);

        const columns = ar.shape[1];
        const rows = ar.shape[0];

        assert.equal(first_pixel('up', ar), 1);
        assert.equal(first_pixel('left', ar), 1);
        assert.equal(first_pixel('down', ar), rows - 2);
        assert.equal(first_pixel('right', ar), columns - 2);

    });
    it("test 3", function () {
        ar = tf.tensor2d(
            [0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0], [4, 5]);

        const columns = ar.shape[1];
        const rows = ar.shape[0];

        assert.equal(first_pixel('up', ar), 1);
        assert.equal(first_pixel('left', ar), 0);
        assert.equal(first_pixel('down', ar), rows - 2);
        assert.equal(first_pixel('right', ar), columns - 2);

    });
    it("test 4", function () {
        ar = tf.tensor2d(
            [0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0], [4, 5]);
        const columns = ar.shape[1];
        const rows = ar.shape[0];

        assert.equal(first_pixel('up', ar), 1);
        assert.equal(first_pixel('left', ar), 1);
        assert.equal(first_pixel('down', ar), rows - 2);
        assert.equal(first_pixel('right', ar), columns - 1);


    });
    it("test 5", function () {
        ar = tf.tensor2d(
            [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0], [4, 5]);

        const columns = ar.shape[1];
        const rows = ar.shape[0];

        assert.equal(first_pixel('up', ar), 1);
        assert.equal(first_pixel('left', ar), 2);
        assert.equal(first_pixel('down', ar), rows - 2);
        assert.equal(first_pixel('right', ar), columns - 3);

    });

});


describe("crop_test", function () {

    it("test 1", function () {
        ar = tf.tensor2d(
            [0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0], [4, 5]);

        cropped_array = crop(ar).arraySync();
        expected_array = [[1, 1, 1], [1, 1, 1]];
        assert.equal(JSON.stringify(cropped_array), JSON.stringify(expected_array));
    });

    it("test 2", function () {
        ar = tf.tensor2d(
            [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [4, 5]);

        cropped_array = crop(ar).arraySync();
        expected_array = [[1, 1, 1, 1, 1]];
        assert.equal(JSON.stringify(cropped_array), JSON.stringify(expected_array));
    });

    it("test 3", function () {
        ar = tf.eye(5);
        cropped_array = crop(ar).arraySync();
        expected_array = tf.eye(5).arraySync();
        assert.equal(JSON.stringify(cropped_array), JSON.stringify(expected_array));
    });

    it("test 4", function () {
        const ar = tf.tensor2d([0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0], [4, 4]);
        cropped_array = crop(ar).arraySync();
        expected_array = ar.arraySync();
        assert.equal(JSON.stringify(cropped_array), JSON.stringify(expected_array));
    });

    it("test 5", function () {
        const ar = tf.tensor2d([0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0], [4, 4]);
        cropped_array = crop(ar).arraySync();
        expected_array = [[0, 1], [1, 0]];
        assert.equal(JSON.stringify(cropped_array), JSON.stringify(expected_array));
    });

});
