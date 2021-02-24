import { useState, useEffect } from 'react';
import { Square } from '../';
 import io from 'socket.io-client';
import './Board.css';



// const socket = io(); //Connects to socket connection
const socket = io(); // Connects to socket connection

function Board(){
    
    const [ board, changeBoardArr ] = useState(Array(9).fill(''));
    let [ setPlayer, setPlayerState ] = useState(0);
    
    function playerRes(e){
        //let index = e.target.id;
        //let val = e.target.innerHTML;
        let val = [...board];
        
        if(val[e] === ""){
            if(setPlayer === 0){
                val[e] = "X";
                setPlayerState(1);
            }
            else{
                val[e] = "O";
                setPlayerState(0);
            }
            changeBoardArr(val);
            socket.emit('boardChange', {val: val, setPlayerState: setPlayer});
        }
    }
    
    useEffect(() =>{
        socket.on('boardChange', (data) => {
            changeBoardArr([...data.val]);
            if(data.setPlayerState  === 1){
                setPlayerState(0);
            }
            else{
                setPlayerState(1);
            }
            
        }); 
    }, []);
    
    return (
        <div class="board">
            {board.map((item, index) => <Square item={item} onClickButton = {() => playerRes(index)} /> )}
        </div>
    );
}

export default Board;

