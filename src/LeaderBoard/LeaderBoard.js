import io from 'socket.io-client';
import { useState, useEffect, Fragment } from 'react';
import './LeaderBoard.css';

const socket = io(); // Connects to socket connection


export function LeaderBoard( {leaderBoard} ){
    
    leaderBoard.map((item, index) =>{
        Object.keys(item).map(key =>{
            
            
        })
    });

    
    return (
        <table>
            <thead>
                <tr>
                    <th colSpan="2"> LeaderBoard </th>
                </tr>
            </thead>
            <tbody>
                {leaderBoard.map((item) =>
                        Object.keys(item).map(key=>
                            <tr>
                                <td> 
                                    {key} 
                                </td>
                                <td> 
                                    {item[key]} 
                                </td>
                            </tr>
                        )
                    )
                }
            </tbody>
        </table>
    );
}


// export default LeaderBoard;