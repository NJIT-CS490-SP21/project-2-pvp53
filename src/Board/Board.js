import { useState, useEffect } from 'react';
import { Square } from '../';
import io from 'socket.io-client';
import './Board.css';

const socket = io(); // Connects to socket connection

function Board({ user }){

    const [ players, setPlayers ]  = useState({});
    const [ board, changeBoardArr ] = useState(Array(9).fill(''));
    const [ setPlayer, setPlayerState ] = useState(0);
    const [ winner, setWinner] = useState();

    function play(index, user){
        let boardChange = [...board];
        if(boardChange[index] === ""){
            console.log(user);
            console.log(setPlayer);
            console.log(players[setPlayer]);
            if(user === players[setPlayer]){
                if(setPlayer == 0){
                    boardChange[index] = "X";
                    setPlayerState(1);
                }
                else if(setPlayer == 1){
                    boardChange[index] = "O";
                    setPlayerState(0);
                }
                changeBoardArr(boardChange)
                socket.emit('boardChange', {boardData: boardChange, setPlayerState: setPlayer });
            }
            else {
                alert("You are not Playing!");
                return;
            }
            
            let gameStatus = checkWinner(board, user);
            if(!gameStatus){
                setWinner("In Progress");
            }
            else if(gameStatus == players[setPlayer]){
                setWinner(players[setPlayer]);
            }
            else{
                setWinner("Drawn");
            }
        }
        else{
            alert('Invalid Box!');
        }
    }

    function updateUsers(){
        socket.on('updateUser', (data) => {
            const uData = {...data}
            setPlayers({...players, ...uData});
        });
    }
    
    function checkWinner(boardData, user){
        console.log(boardData);
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for( let i = 0; i < lines.length; i++){
            const[a,b,c] = lines[i];
            if(boardData[a] && boardData[a] === boardData[b] && boardData[a] === boardData[c]){
                return user;
            }
        }
    }

    function updateBoard(){
        socket.on('boardChange', (data) => {
            changeBoardArr([...data.boardData]);
            if(data.setPlayerState == 0){
                setPlayerState(1);
            }
            else{
                setPlayerState(0);
            }
        });
    }

    useEffect(() =>{
        updateUsers();
        updateBoard();
    }, []);

    return (
        <div class = "b">
            <div>
                {winner}
            </div>
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