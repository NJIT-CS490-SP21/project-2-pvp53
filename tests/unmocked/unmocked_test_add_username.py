'''
TO RUN FILE: python unmocked_test_add_username.py
This file is testing how the global dictionary in python is getting updated 
'''
import unittest, copy, os, sys, inspect
current_dir = os.path.dirname(os.path.abspath(inspect.getfile(inspect.currentframe())))
two_up = os.path.dirname(os.path.dirname(current_dir))
sys.path.insert(0, two_up)
import app as app

KEY_INPUT = 'input'
KEY_EXPECTED = 'expected'

INITIAL_USERNAME = {'0': '', '1': '', 'spec': []}

class test_app_functionality(unittest.TestCase):
    
    def setUp(self):
        app.USER_NAME =  copy.copy(INITIAL_USERNAME)
        self.success_test_params = [
            {
                KEY_INPUT: 'user1',
                KEY_EXPECTED: {'0': 'user1', '1': '', 'spec': []}
            },
            {
                KEY_INPUT: 'user2',
                KEY_EXPECTED: {'0': 'user1', '1': 'user2', 'spec': []}
            }
        ]
        self.failure_test_params = [
            {
                KEY_INPUT: 'user1',
                KEY_EXPECTED: {'0': '', '1': 'user1', 'spec': []}
            },
            {
                KEY_INPUT: 'user2',
                KEY_EXPECTED: {'0': '', '1': 'user1', 'spec': ['user2']}
            }
        ]
        self.failure_test_params_not_in = [
            {
                KEY_INPUT: 'user1',
                KEY_EXPECTED: {'0': '', '1': '', 'spec': []}
            },
            {
                KEY_INPUT: 'user2',
                KEY_EXPECTED: {'0': '', '1': 'user1', 'spec': ['user2']}
            }
        ]
        
    def test_succesful_params(self):
        for test in self.success_test_params:
            actual_result = app.add_user(test[KEY_INPUT]) 
            expected_result = test[KEY_EXPECTED]
            self.assertEqual(actual_result, expected_result)
            self.assertEqual(actual_result['0'], expected_result['0'])
            self.assertEqual(actual_result['1'], expected_result['1'])

    def test_failure_params(self):
        for test in self.failure_test_params:
            actual_result = app.add_user(test[KEY_INPUT])
            expected_result = test[KEY_EXPECTED]
            self.assertNotEqual(actual_result, expected_result)
            self.assertNotEqual(actual_result['0'], expected_result['0'])
            self.assertNotEqual(actual_result['1'], expected_result['1'])
    
    def test_failure_params_not_int(self):
        for test in self.success_test_params:
            actual_result = app.add_user(test[KEY_INPUT]) 
            expected_result = test[KEY_EXPECTED]
            self.assertDictEqual(actual_result, expected_result)
            self.assertDictContainsSubset(actual_result, expected_result)

        
if __name__ == '__main__':
    unittest.main()