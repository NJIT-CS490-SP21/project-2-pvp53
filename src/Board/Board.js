import { useState, useEffect, React } from 'react';
import io from 'socket.io-client';
import { Square, Winner } from '..';
import { LeaderBoard } from '../LeaderBoard/LeaderBoard';

import './Board.css';

const socket = io(); // Connects to socket connection

function Board({ user }) {
  const [players, setPlayers] = useState({ 0: '', 1: '', spec: [] });
  const [board, changeBoardArr] = useState(Array(9).fill(''));
  const [setPlayer, setPlayerState] = useState(0);
  const [playerStatus, setPlayerStatus] = useState(false);
  const [showandHide, setShowAndHide] = useState(false);
  const [leaderBoard, setleaderBoard] = useState();
  let gameStatus;
  let winnerorno = '';

  function play(index) {
    const boardChange = [...board];
    if (boardChange[index] === '') {
      if (user === players[setPlayer]) {
        setPlayerStatus(true);
        if (setPlayer === 0) {
          boardChange[index] = 'X';
          setPlayerState(1);
        } else {
          boardChange[index] = 'O';
          setPlayerState(0);
        }
        changeBoardArr(boardChange);
        socket.emit('boardChange', {
          boardData: boardChange,
          setPlayerState: setPlayer,
        });
        winnerorno = Winner(boardChange);
        if (typeof winnerorno !== 'undefined') {
          if (winnerorno === 'X') {
            socket.emit('gameStatus', { win: players[0], lose: players[1] });
          } else {
            socket.emit('gameStatus', { win: players[1], lose: players[0] });
          }
        }
      } else {
        alert('You are not Playing!');
      }
    } else {
      alert('Invalid Box!');
    }
  }

  function updateUsers() {
    socket.on('updateUser', (data) => {
      const uData = { ...data };
      setPlayers({ ...players, ...uData });
    });
  }

  function resetPlayerState() {
    if (setPlayer === 0) {
      setPlayerState(1);
    } else {
      setPlayerState(0);
    }
  }

  function updateBoard() {
    socket.on('boardChange', (data) => {
      changeBoardArr([...data.boardData]);
      if (data.setPlayerState === 0) {
        setPlayerState(1);
      } else {
        setPlayerState(0);
      }
    });
  }

  function updateLeaderBoard() {
    socket.on('updateLeaderBoard', (data) => {
      setleaderBoard(data);
    });
  }

  function resetBoard() {
    const emptyArr = [...board];
    emptyArr.fill('');
    changeBoardArr(emptyArr);
    resetPlayerState();
    socket.emit('boardChange', {
      boardData: emptyArr,
      setPlayerState: setPlayer,
    });
  }

  useEffect(() => {
    updateUsers();
    updateBoard();
    updateLeaderBoard();
  }, []);

  winnerorno = Winner(board);
  if (winnerorno === 'O') {
    gameStatus = `Winner is ${players[1]}`;
  } else if (winnerorno === 'X') {
    gameStatus = `Winner is ${players[0]}`;
  } else if (!winnerorno) {
    gameStatus = 'The Game is in progress';
  } else {
    gameStatus = 'The Game has Drawn';
  }

  function onShowHide() {
    setShowAndHide(() => !showandHide);
  }

  return (
    <div>
      <h1 className="gameStatus">{gameStatus}</h1>
      <div className="userName">{user}</div>
      <div className="button">
        {playerStatus && <button type="submit" onClick={resetBoard}> Reset Board </button>}
      </div>
      <div className="container">
        <div className="board">
          {board.map((item, index) => (
            <Square item={item} onClickButton={() => play(index)} />
          ))}
        </div>
        <div className="spec">
          <h2>Speactators</h2>
          <ul>
            {players.spec.map((player) => (
              <li>
                {' '}
                {player}
                {' '}
              </li>
            ))}
          </ul>
        </div>
        <div className="leaderboard">
          <button type="submit" onClick={onShowHide}> LeaderBoard </button>
          <div id="leaderboard">
            {showandHide && (
              <LeaderBoard leaderBoard={leaderBoard} user={user} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Board;
