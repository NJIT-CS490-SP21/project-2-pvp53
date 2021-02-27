import { useState, useEffect } from 'react';
import { Square, Winner} from '../';
import io from 'socket.io-client';
import './Board.css';

const socket = io(); // Connects to socket connection

function Board({ user }){

    const [ players, setPlayers ]  = useState({ "O": "", "1": "", "spec": [] });
    const [ board, changeBoardArr ] = useState(Array(9).fill(''));
    const [ setPlayer, setPlayerState ] = useState(0);
    //const [ gameStatus, setGameStatus] = useState(true);
    //let gameStatus = "";

    function play(index, user){
        let boardChange = [...board];
        if(boardChange[index] === ""){
            if(user === players[setPlayer]){
                if(setPlayer == 0){
                    boardChange[index] = "X";
                    setPlayerState(1);
                }
                else{
                    boardChange[index] = "O";
                    setPlayerState(0);
                }
                changeBoardArr(boardChange);
                socket.emit('boardChange', {boardData: boardChange, setPlayerState: setPlayer });
            }
            else {
                alert("You are not Playing!");
                return;
            }
        }
        else{
            alert('Invalid Box!');
        }
    }

    function updateUsers(){
        socket.on('updateUser', (data) => {
            const uData = {...data}
            console.log(uData);
            setPlayers({...players, ...uData});
        });
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

    function resetBoard(){
        let emptyArr = [...board];
        emptyArr.fill("");
        changeBoardArr(emptyArr);
        if(setPlayer == 0){
            setPlayerState(1);
        }
        else{
            setPlayerState(0);
        }
        socket.emit('boardChange', {boardData: emptyArr, setPlayerState: setPlayer })
    }
    
    useEffect(() =>{
        updateUsers();
        updateBoard();
    }, []);
    
    let gameStatus;
    const winnerorno = Winner(board);
    if(winnerorno === "O"){
        gameStatus = `Winner is ${players[1]}`;
    }
    else if(winnerorno === "X"){
        gameStatus = `Winner is ${players[0]}`;
    }
    else if (!winnerorno){
        gameStatus = `The Game is in progress`; 
    }
    else {
        gameStatus = `The Game has Drawn`; 
    }
    
    

    return (
        <div class = "b">
            <div class="gameStatus">
                {gameStatus}
            </div>
            <div class="userName">
                {user}
            </div>
            <div class="board">
                {board.map((item, index) => <Square item={item} onClickButton = {() => play(index, user)} /> )}
            </div>
            <div class = "button">
                <button  onClick = {resetBoard} > Reset Board </button>
            </div>
            <div class = "spec">
                <h1 class="header">
                    Speactators
                </h1>
                {players['spec'].map((player) => <ul> { player } </ul>)}
            </div>
        </div>
    );
}

export default Board;