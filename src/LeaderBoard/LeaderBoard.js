import io from 'socket.io-client';
import { useState, useEffect } from 'react';
import './LeaderBoard.css';


export function LeaderBoard(){
    
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