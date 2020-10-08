import unittest

from exceptions import DifferentLenghtError, ZeroElementsListError
from helperspy import get_accuracy


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


if __name__ == '__main__':
    unittest.main()
