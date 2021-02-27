import { React } from 'react';
import './Board.css';

function Winner(board){
    let count = 0;
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
        if(board[a] && board[a] === board[b] && board[a] === board[c]){
            return board[a];
        }
    }
    for(let i = 0; i < board.length; i++){
        if(board[count] !== ""){
            count++;
        }
    }
    if(count === 9){
        return "Draw";
    }
}

export default Winner;

