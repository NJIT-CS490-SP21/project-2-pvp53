# App: Tic-Tac-Toe
# Author: Parth Patel 
## Technologies Used
* Python(socket-io, json)
* Flask
* HTML/CSS 
* Coded on AWS(Cloud 9)
* Heroku(Deployement)
* Reactjs(socket-io)

## Installation
Use the package manager pip to install flask and other libraries

```
pip install -r requirements.txt

```
## Features

* Use pre-set usernames 1st users: "user1", and 2nd user: "user2" to play the game.
* Player 1 in this case it would be "user1" has to go first and has to wait for "user2" to play their move.
* After the result of the game, you can reset the board and play again.


## QA
> Problems Encountered? and Fixes?
>> Since this was my first big project in reactjs without any help. I encountered a lot of problems and came up with fixes real quick. The known problem that I came up with was that I need to have the user input whatever username that want 
>> but what I currently have, they can only set their username either "user1" or "user2". I would address this issue by making a logout button that if the current user clicks on it the user would be able to set a new username for them.
>> One other problem that I came accorss is not knowing how the useState works and I went to office hours and got the knowledge I needed by talking to a TA. Features I would like to add are like a logout button so the users can be replaced.  

> Technical Problems? and Fixes?
>> Heroku was giving me a hard time to work, basically what the problem was that the app was not wokring and it failed on socket-installation. So I went back to the requirments file and made sure that the technologies I'm using in there 
>> are the ones I'm using in the python and js files and vice versa. AWS is also not ideal for doing projects and sitting in front of a screen for a long period of time, yes its good in a way that your eyes get rest and what not but at 
>> times it got annoying. The fix was just to re-login and basically reset AWS Cloud 9 instance

> Improvements?
>> Make the UI more attractive, add a logout functional button to switch users.
