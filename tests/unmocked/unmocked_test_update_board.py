'''
TO RUN FILE: python unmocked_test_update_board.py
This file is testing how the user is being added to the mock database
'''
import unittest
import unittest.mock as mock
from unittest.mock import patch
import unittest, copy, os, sys, inspect
current_dir = os.path.dirname(
    os.path.abspath(inspect.getfile(inspect.currentframe())))
two_up = os.path.dirname(os.path.dirname(current_dir))
sys.path.insert(0, two_up)
import app as app
import models

KEY_INPUT = "input"
KEY_EXPECTED = "expected"
INITIAL_BOARD = ['', '', '', '', '', '', '', '', '']
# INITIAL_USERNAM


class DBTestCase(unittest.TestCase):
    def setUp(self):
        app.UPDATE_BOARD = copy.copy(INITIAL_BOARD)
        self.success_test_params = [
            {
                KEY_INPUT: ['', 'X', '', '', 'X', '', '', '', 'X'],
                KEY_EXPECTED: (3, 0)
            },
            {
                KEY_INPUT: ['', 'X', '', 'O', '', 'O', '', 'O', ''],
                KEY_EXPECTED: (1, 3)
            },
        ]

        self.failure_test_params = [
            {
                KEY_INPUT: ['', 'X', '', '', 'X', '', '', '', 'X'],
                KEY_EXPECTED: (2, 1)
            },
            {
                KEY_INPUT: ['', 'X', '', 'O', '', 'O', '', 'O', ''],
                KEY_EXPECTED: (3, 1)
            },
        ]

    def test_succesful_params(self):
        for test in self.success_test_params:
            actual_result = app.update_mock_board_index(test[KEY_INPUT])
            expected_result = test[KEY_EXPECTED]
            self.assertEqual(actual_result, expected_result)
            self.assertEqual(actual_result[0], expected_result[0])
            self.assertEqual(actual_result[1], expected_result[1])

    def test_failure_params(self):
        for test in self.failure_test_params:
            actual_result = app.update_mock_board_index(test[KEY_INPUT])
            expected_result = test[KEY_EXPECTED]
            self.assertNotEqual(actual_result, expected_result)
            self.assertNotEqual(actual_result[0], expected_result[0])
            self.assertNotEqual(actual_result[1], expected_result[1])

    def test_successful_tuple(self):
        for test in self.success_test_params:
            actual_result = app.update_mock_board_index(test[KEY_INPUT])
            expected_result = test[KEY_EXPECTED]
            self.assertTupleEqual(actual_result, expected_result)
            self.assertIsNotNone(actual_result)
            self.assertIsNotNone(expected_result)


if __name__ == '__main__':
    unittest.main()
