'''
TO RUN FILE: python unmocked_test_add_username.py
This file is testing how the username is being added to the dictionary
'''
import unittest
import copy
import os
import sys
import inspect
CURRENT_DIC = os.path.dirname(
    os.path.abspath(inspect.getfile(inspect.currentframe())))
TWO_UP = os.path.dirname(os.path.dirname(CURRENT_DIC))
sys.path.insert(0, TWO_UP)
import app as file

KEY_INPUT = 'input'
KEY_EXPECTED = 'expected'

INITIAL_USERNAME = {'0': '', '1': '', 'spec': []}


class TestAppFunctionality(unittest.TestCase):
    '''
    This class extends unittest.TestCase and defines a couple of fucntions to
    setup the file and to pass in a couple of testcase fucntions
    '''
    def setUp(self):
        file.USER_NAME = copy.copy(INITIAL_USERNAME)
        self.success_test_params = [{
            KEY_INPUT: 'user1',
            KEY_EXPECTED: {
                '0': 'user1',
                '1': '',
                'spec': []
            }
        }, {
            KEY_INPUT: 'user2',
            KEY_EXPECTED: {
                '0': 'user1',
                '1': 'user2',
                'spec': []
            }
        }]
        self.failure_test_params = [{
            KEY_INPUT: 'user1',
            KEY_EXPECTED: {
                '0': '',
                '1': 'user1',
                'spec': []
            }
        }, {
            KEY_INPUT: 'user2',
            KEY_EXPECTED: {
                '0': '',
                '1': 'user1',
                'spec': ['user2']
            }
        }]
        self.failure_test_params_not_in = [{
            KEY_INPUT: 'user1',
            KEY_EXPECTED: {
                '0': '',
                '1': '',
                'spec': []
            }
        }, {
            KEY_INPUT: 'user2',
            KEY_EXPECTED: {
                '0': '',
                '1': 'user1',
                'spec': ['user2']
            }
        }]

    def test_succesful_params(self):
        '''
        Successfull params are being looped over to make sure they are returning expected values
        '''
        for test in self.success_test_params:
            actual_result = file.add_user(test[KEY_INPUT])
            expected_result = test[KEY_EXPECTED]
            self.assertEqual(actual_result, expected_result)
            self.assertEqual(actual_result['0'], expected_result['0'])
            self.assertEqual(actual_result['1'], expected_result['1'])

    def test_failure_params(self):
        '''
        Failure params are being looped over to make sure they are not returning expected values
        '''
        for test in self.failure_test_params:
            actual_result = file.add_user(test[KEY_INPUT])
            expected_result = test[KEY_EXPECTED]
            self.assertNotEqual(actual_result, expected_result)
            self.assertNotEqual(actual_result['0'], expected_result['0'])
            self.assertNotEqual(actual_result['1'], expected_result['1'])

    def test_failure_params_not_int(self):
        '''
        Failure params are being looped over to make sure they are not returning expected values
        '''
        for test in self.success_test_params:
            actual_result = file.add_user(test[KEY_INPUT])
            expected_result = test[KEY_EXPECTED]
            self.assertDictEqual(actual_result, expected_result)
            self.assertDictContainsSubset(actual_result, expected_result)


if __name__ == '__main__':
    unittest.main()
