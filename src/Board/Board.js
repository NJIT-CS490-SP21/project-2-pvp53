import { useState, useEffect } from 'react';
import { Square } from '../';
import io from 'socket.io-client';
import './Board.css';

const socket = io(); // Connects to socket connection

function Board(){

    //console.log(users);
    let players = {}
    //const [ players, setPlayers ]  = useState({});
    const [ board, changeBoardArr ] = useState(Array(9).fill(''));
    let [ setPlayer, setPlayerState ] = useState(0);

    function playerRes(e){
        let boardChange = [...board];
        if(boardChange[e] === ""){
            if(setPlayer === 0){
                boardChange[e] = "X";
                setPlayerState(1);
            }
            else {
                boardChange[e] = "O";
                setPlayerState(0);
            }
            changeBoardArr(boardChange);
            socket.emit('boardChange', {boardData: boardChange, setPlayerState: setPlayer });
        }
    }

    function updateUsers(){
        socket.on('updateUser', (data) => {
            Object.assign(players, data);
            console.log(players);
            // Object.keys(data).map((item) => (
            //     setPlayers((prevState) => {
            //         return { ...prevState, item: data[item]};
            //     })
            // ));
            // console.log(players);
            // let p = {...data}
            // console.log(p);
            // setPlayers(data);
            // dummy();
            //console.log(players);
        });
    }

    function updateBoard(){
        socket.on('boardChange', (data) => {
            changeBoardArr([...data.boardData]);
            if(data.setPlayerState  === 1){
                setPlayerState(0);
            }
            else{
                setPlayerState(1);
            }
            console.log(board);
        });
    }

    useEffect(() =>{
        updateUsers();
        updateBoard();
    }, []);

    return (
        <div class="board">
            {board.map((item, index) => <Square item={item} onClickButton = {() => playerRes(index)} /> )}
        </div>
    );
}

export default Board;