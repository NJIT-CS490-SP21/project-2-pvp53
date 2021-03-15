'''
@file models.py
This file is basically just importing the previous app.py file
and making the database after instantiating it in app.py
'''
from app import db

class Person(db.Model):
    '''
    This class take a parameter db.Model and creates three columns for the db. ID,
    username, and scores.
    '''
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    scores = db.Column(db.Integer, unique=False, nullable=False)

    def __repr__(self):
        return '<Person %r>' % self.username
        