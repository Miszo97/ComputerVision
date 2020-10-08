import unittest
import numpy as np

from exceptions import DifferentLenghtError, ZeroElementsListError
from helpers import *


class TestGetAccuracyMethod(unittest.TestCase):
    def test_return_100_when_all_pairs_are_equal(self):
        first = [1, 2, 3, 4]
        second = [1, 2, 3, 4]
        self.assertEqual(get_accuracy(first, second), 100)

    def test_return_0_when_none_of_the_pairs_are_equal(self):
        first = [1, 2, 3, 4]
        second = [4, 3, 2, 1]
        self.assertEqual(get_accuracy(first, second), 0)

    def test_throw_exception_when_lists_are_of_different_lenght(self):
        first = [1, 2, 3]
        second = [1, 2]
        with self.assertRaises(DifferentLenghtError):
            get_accuracy(first, second)

    def test_trow_exception_when_list_have_0_elements(self):
        first = []
        second = []
        with self.assertRaises(ZeroElementsListError):
            get_accuracy(first, second)


class TestCropMethod(unittest.TestCase):
    def test_return_proper_cropped_array(self):
        pass


class TestFirstPixelMethod(unittest.TestCase):
    def test_return_zero_zero_last_last_when_all_elements_are_not_zero(self):
        ar = np.array(
            [[1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1]])

        column_len = ar.shape[1]
        row_len = ar.shape[0]

        self.assertEqual(first_pixel('up', ar), 0)
        self.assertEqual(first_pixel('left', ar), 0)
        self.assertEqual(first_pixel('down', ar), row_len - 1)
        self.assertEqual(first_pixel('right', ar), column_len - 1)

    def test_return_one_and_one_before_last_with_frame_of_width_one(self):
        ar = np.array(
            [[0, 0, 0, 0, 0], [0, 1, 1, 1, 0], [0, 1, 1, 1, 0], [0, 0, 0, 0, 0]])

        column_len = ar.shape[1]
        row_len = ar.shape[0]

        self.assertEqual(first_pixel('up', ar), 1)
        self.assertEqual(first_pixel('left', ar), 1)
        self.assertEqual(first_pixel('down', ar), row_len - 2)
        self.assertEqual(first_pixel('right', ar), column_len - 2)

    def test_case_three(self):
        ar = np.array(
            [[0, 0, 0, 0, 0], [1, 1, 1, 1, 0], [0, 1, 1, 1, 0], [0, 0, 0, 0, 0]])

        column_len = ar.shape[1]
        row_len = ar.shape[0]

        self.assertEqual(first_pixel('up', ar), 1)
        self.assertEqual(first_pixel('left', ar), 0)
        self.assertEqual(first_pixel('down', ar), row_len - 2)
        self.assertEqual(first_pixel('right', ar), column_len - 2)

    def test_case_four(self):
        ar = np.array(
            [[0, 0, 0, 0, 0], [0, 1, 1, 1, 0], [0, 1, 1, 1, 1], [0, 0, 0, 0, 0]])

        column_len = ar.shape[1]
        row_len = ar.shape[0]

        self.assertEqual(first_pixel('up', ar), 1)
        self.assertEqual(first_pixel('left', ar), 1)
        self.assertEqual(first_pixel('down', ar), row_len - 2)
        self.assertEqual(first_pixel('right', ar), column_len - 1)

    def test_case_five(self):
        ar = np.array(
            [[0, 0, 0, 0, 0], [0, 0, 1, 0, 0], [0, 0, 1, 0, 0], [0, 0, 0, 0, 0]])

        column_len = ar.shape[1]
        row_len = ar.shape[0]

        self.assertEqual(first_pixel('up', ar), 1)
        self.assertEqual(first_pixel('left', ar), 2)
        self.assertEqual(first_pixel('down', ar), row_len - 2)
        self.assertEqual(first_pixel('right', ar), column_len - 3)


class TestFirstPixelMethod(unittest.TestCase):
    def test_case_first(self):
        ar = np.array(
            [[0, 0, 0, 0, 0], [0, 1, 1, 1, 0], [0, 1, 1, 1, 0], [0, 0, 0, 0, 0]])

        cropped_array = crop(ar)
        expected_array = [[1, 1, 1], [1, 1, 1]]
        self.assertTrue(np.array_equal(cropped_array, expected_array))

    def test_case_second(self):
        ar = np.array(
            [[0, 0, 0, 0, 0], [1, 1, 1, 1, 1], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]])

        cropped_array = crop(ar)
        expected_array = [[1, 1, 1, 1, 1]]
        self.assertTrue(np.array_equal(cropped_array, expected_array))

    def test_case_third(self):
        ar = np.identity(5)
        cropped_array = crop(ar)
        expected_array = np.identity(5)
        self.assertTrue(np.array_equal(cropped_array, expected_array))

    def test_case_forth(self):
        ar = np.array([[0, 0, 0, 1], [0, 0, 1, 0], [0, 1, 0, 0], [1, 0, 0, 0]])
        cropped_array = crop(ar)
        expected_array = ar
        self.assertTrue(np.array_equal(cropped_array, expected_array))

    def test_case_fifth(self):
        ar = np.array([[0, 0, 0, 0], [0, 0, 1, 0], [0, 1, 0, 0], [0, 0, 0, 0]])
        cropped_array = crop(ar)
        expected_array = np.array([[0, 1], [1, 0]])
        self.assertTrue(np.array_equal(cropped_array, expected_array))


if __name__ == '__main__':
    unittest.main()
