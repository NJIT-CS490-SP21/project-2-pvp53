import { React } from 'react';
import './LeaderBoard.css';

function LeaderBoard({ leaderBoard, user }) {
  return (
    <table>
      <thead>
        <tr>
          <th colSpan="2"> LeaderBoard </th>
        </tr>
      </thead>
      <tbody>
        {leaderBoard.map((item) => Object.keys(item).map((key) => (key === user ? (
          <tr className="specialUser">
            <td>{key}</td>
            <td>{item[key]}</td>
          </tr>
        ) : (
          <tr>
            <td>{key}</td>
            <td>{item[key]}</td>
          </tr>
        ))))}
      </tbody>
    </table>
  );
}

export default LeaderBoard;
