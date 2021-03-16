import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import Board from './Board/Board';
import Login from './LoginStatus/Login';

test('LeaderBoard', () => {
    //render(<LeaderBoard/>);
    const leaderboard = render(<Board user="user1"/>);
    const button = screen.getByText('LeaderBoard');
    expect(button).toBeInTheDocument();
    fireEvent.click(button);
    const leaderBoard_status = document.getElementById('leaderboard');
    expect(leaderBoard_status).toBeInTheDocument();
});

test('Login', () => {
  const Login = render(<App />);
  // const element = screen.getByText('Let\'s Play!');
  // expect(element).toBeInTheDocument();
  const button = screen.getByText('LogIn');
  expect(button).toBeInTheDocument();
  fireEvent.click(button);
  const element = screen.getByText('Speactators');
  expect(element.toBeInTheDocument);
});


test('Board Click', () =>{
  render(<Board user='user1'/>);
});