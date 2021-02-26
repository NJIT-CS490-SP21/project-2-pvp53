import { useState, useEffect } from 'react';
import { Square } from '../';
import io from 'socket.io-client';
import './Board.css';

const socket = io(); // Connects to socket connection

function Board({ user }){

    const [ players, setPlayers ]  = useState({});
    const [ board, changeBoardArr ] = useState(Array(9).fill(''));
    let [ setPlayer, setPlayerState ] = useState(0);

    function play(index, user){
        console.log(user);
        let boardChange = [...board];
        if(boardChange[index] === ""){
            if(setPlayer === 0){
                boardChange[index] = "X";
                setPlayerState(1);
            }
            else {
                boardChange[index] = "O";
                setPlayerState(0);
            }
            changeBoardArr(boardChange)
            socket.emit('boardChange', {boardData: boardChange, setPlayerState: setPlayer });
        }
    }

    function updateUsers(){
        socket.on('updateUser', (data) => {
            const uData = {...data}
            setPlayers({...players, ...uData});
        });
    }

    function updateBoard(){
        socket.on('boardChange', (data) => {
            changeBoardArr([...data.boardData]);
        });
    }

    useEffect(() =>{
        updateUsers();
        updateBoard();
    }, []);

    return (
        <div class = "b">
            <div class="userName">
                {user}
            </div>
            <div class="board">
                {board.map((item, index) => <Square item={item} onClickButton = {() => play(index, user)} /> )}
            </div>
        </div>
    );
}

export default Board;