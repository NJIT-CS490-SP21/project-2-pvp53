import io from 'socket.io-client';
import { useState, useEffect } from 'react';
import './LeaderBoard.css';

const socket = io(); // Connects to socket connection


export function LeaderBoard( {leaderBoard} ){
    
    console.log(leaderBoard);
    
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th colSpan="2"> LeaderBoard </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                        Hello World
                        </td>
                        <td>
                        Hello World
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}


// export default LeaderBoard;