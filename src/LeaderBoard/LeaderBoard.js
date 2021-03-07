import io from 'socket.io-client';
import './LeaderBoard.css';


export function LeaderBoard( {leaderBoard, user} ){
    
    console.log(leaderBoard);
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
                        (key == user) ?
                            <tr class="specialUser">
                                <td > 
                                    {key}
                                </td>
                                <td> 
                                    {item[key]} 
                                </td>
                            </tr>
                        :
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