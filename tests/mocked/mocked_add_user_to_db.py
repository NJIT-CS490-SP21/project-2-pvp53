'''
TO RUN FILE: python mocked_add_user_to_db.py
This file is testing how the user is being added to the mock database
'''
import unittest
import unittest.mock as mock
from unittest.mock import patch
import unittest, copy, os, sys, inspect
current_dir = os.path.dirname(os.path.abspath(inspect.getfile(inspect.currentframe())))
two_up = os.path.dirname(os.path.dirname(current_dir))
sys.path.insert(0, two_up)
import app as app
import models 

KEY_INPUT = "input"
KEY_EXPECTED = "expected"
INITIAL_USERNAME = 'user1'

class DBTestCase(unittest.TestCase):
    def setUp(self):
        
        self.success_test_params = [
            {
                KEY_INPUT: 'user2',
                KEY_EXPECTED: [INITIAL_USERNAME,'user2']
            },
            {
                KEY_INPUT: 'user3',
                KEY_EXPECTED: [INITIAL_USERNAME, 'user2', 'user3']
            },
            {
                KEY_INPUT: 'user4',
                KEY_EXPECTED: [INITIAL_USERNAME, 'user2','user3', 'user4']
            }
        ]
        
        self.failure_test_params = [
            {
                KEY_INPUT: 'user2',
                KEY_EXPECTED: [INITIAL_USERNAME,'']
            },
            {
                KEY_INPUT: 'user3',
                KEY_EXPECTED: [INITIAL_USERNAME, 'user13']
            }
        ]
        initial_person = models.Person(username=INITIAL_USERNAME, scores=100)
        self.initial_db_mock = [initial_person]
    
    def mocked_db_session_add(self, username):
        self.initial_db_mock.append(username)
    
    
    def mocked_db_session_commit(self):
        pass
    
    def mocked_person_query_all(self):
        return self.initial_db_mock
    
    def test_succesful_params(self):
        for test in self.success_test_params:
            with patch('app.db.session.add', self.mocked_db_session_add):
                with patch('app.db.session.commit', self.mocked_db_session_commit):
                    with patch('models.Person.query') as mocked_query:
                        mocked_query.all = self.mocked_person_query_all
                        actual_result = app.add_user_to_db_mock(test[KEY_INPUT])
                        expected_result = test[KEY_EXPECTED]
                        self.assertEqual(len(actual_result), len(expected_result))
                        self.assertEqual(actual_result, expected_result)
    
    def test_failure_params(self):
        for test in self.failure_test_params:
            with patch('app.db.session.add', self.mocked_db_session_add):
                with patch('app.db.session.commit', self.mocked_db_session_commit):
                    with patch('models.Person.query') as mocked_query:
                        
                        mocked_query.all = self.mocked_person_query_all
                        
                        atcual_result = app.add_user_to_db_mock(test[KEY_INPUT])
                        expected_result= test[KEY_EXPECTED]
                        
                        self.assertNotEqual(atcual_result, expected_result)
                        self.assertNotEqual(atcual_result[1], expected_result[1])
                        
    def test_success_params(self):
        for test in self.success_test_params:
            with patch('app.db.session.add', self.mocked_db_session_add):
                with patch('app.db.session.commit', self.mocked_db_session_commit):
                    with patch('models.Person.query') as mocked_query:
                        mocked_query.all = self.mocked_person_query_all
                        actual_result = app.add_user_to_db_mock(test[KEY_INPUT])
                        expected_result = test[KEY_EXPECTED]
                        self.assertListEqual(actual_result, expected_result)
                        self.assertIsNotNone(actual_result)
                        

if __name__ == '__main__':
    unittest.main()