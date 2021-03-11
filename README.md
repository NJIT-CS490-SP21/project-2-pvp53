# App: Tic-Tac-Toe

# Author: Parth Patel

## Technologies Used

- Python(socket-io, json)
- Flask
- HTML/CSS
- Coded on AWS(Cloud 9)
- Heroku(Deployement)
- Reactjs(socket-io)
- Flash-SQLAlchemy
- Heorku Postgres

## Installation

If you would like to make use of the SQL table to show the leaderboard, you have to follow the following steps to create your own database

Database Setup

```
1. PostGreSQL Installation: sudo yum install postgresql postgresql-server postgresql-devel postgresql-contrib postgresql-docs
2. Initialize PSQL DB: sudo service postgresql initdb
3. Start PSQL: sudo service postgresql start
4. Make superuser: sudo -u postgres createuser --superuser $USER
5. New DB: sudo -u postgres createdb $USER

```

Deploying to Heroku with DB

```
1. git remote rm heroku (ONLY RUN THIS IF YOU HAVE EXISTING APP CONNECTED, to check run git remote -v)
2. pip install -r requirements.txt
3. heroku create --buildpack heroku/python
4. heroku addons:create heroku-postgresql:hobby-dev
5. heroku config (The URL that you see needs to be copy and pasted in a new .env file labelled .env DATABASE_URL={the URL}, no braces
6. Now its time to create the db using models.py
7. python
8. from app import db
9. import models
10. db.create_all()
11. admin = models.Person(username='user1', scores= 100)
12. db.session.add(admin)
13. db.session.commit()
14. Ctrl + D or exit()
15. heroku buildpacks:add --index 1 heroku/nodejs
16. git push heroku {your-brachname if exist:}main, minius the braces.

```

To run the app

```

Open 3 terminal for the best useage
Terminal #1: python app.py in the ./
Terminal #2: npm run start
Terminal #3: heroku pg:psql

```

Terminal #3 is optional but you should make sure that the data is being updated in the DB

Follow these guidelines if you have any issues

```
Heroku Postgres: https://devcenter.heroku.com/articles/heroku-postgresql
Flask-SQLAlchemy documentation: http://flask-sqlalchemy.pocoo.org/2.1/

```

## Features

- Use pre-set usernames 1st users: _"user1"_, and 2nd user: _"user2"_ to play the game.
- Player 1 in this case it would be "user1" has to go first and has to wait for "user2" to play their move.
- After the result of the game, you can reset the board and play again.
- See the userboard update live when a new player(spectator) joins and the game finishes in a win for either player.
- Uses Heroku postgre database to store the leaderbaords for all the players.

## QA

> Problems Encountered? and Fixes?
>
> > One problem was of the database connections, since Heroku deployement is free to use, its database only allows up to 20 connections to db at a time. To make sure that this does not affect the accesibility of the user experience, we would have to reset the db every time the game has played due to the limited options we have over the control of this flow.
> > One more thing that there is no way of changing usename whislt playing the game soley due to the fact that we are using python's dictionary to store the username and the server only gets run once. To fix this issue we can implement a new feature of logging out in the server and when clikcing the button the current user will be logged out and someone from the spectator list would be able to join and play the game after making the right emits to client which updates the players and the spectators.

> Technical Problems? and Fixes?
>
> > One technical problem that hung me up was the leaderboard only updating for the every one else except for the user that played the last move, after researching for a while, I figured out that the `include_self=False` was causing this issue, so I simply just took that parameter out and viola, the leaderboard updated for everyone when it needed an update.
> > Deploying the DB and putting the app on Heroku was extremly tricky, first thing I did is I tried the steps that a fellow teammate uploaded on slack, which worked, but I had no way of cheking if the database is being updated or the connections being used are going to be a problem. After looking at the previous notes from HW's provided by the professor I found out the right way of deploying the app to heroku and it finally worked.

> Improvements/Additional Features
>
> > I would like to make the UI look more natural and use more welcoming colors like a shade of green and make the UI experience a thrill. Current UI looks okay but if I had more time to work on this project I would try and make it look more natural like the tic-tac-toe game (https://playtictactoe.org/) which just makes the user experience much better. Feature I would like to add if the logout functionality, and not use the default values for the players, I would achieve this by kepping the id 0 and 1 in the database just for the players and fetch it during the game for basically everything, the players, and the leaderboards. So that takes care of the default values, now the user can enter anything they want in the username. A bug that my code has is that empty username is allowed, I would simply fix this by checking the username, wether if it's empty or not when passed in the argument and if not, then alert the user about it and if its not empty then there is no issue.
