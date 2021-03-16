import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import Board from './Board/Board';
import Login from './LoginStatus/Login';

test('LeaderBoard', () => {
    //render(<LeaderBoard/>);
    render(<Board user="user1"/>);
    const button = screen.getByText('LeaderBoard');
    expect(button).toBeInTheDocument();
    fireEvent.click(button);
    const leaderBoard_status = document.getElementById('leaderboard');
    expect(leaderBoard_status).toBeInTheDocument();
});

test('Login check status', () => {
  render(<App />);
  // const element = screen.getByText('Let\'s Play!');
  // expect(element).toBeInTheDocument();
  const button = screen.getByText('LogIn');
  expect(button).toBeInTheDocument();
  fireEvent.click(button);
  const element = screen.getByText('Speactators');
  expect(element).toBeInTheDocument();
});


test('Logged In Button',  () => {
  render(<App />)
  const button = screen.getByText("LogIn");
  expect(button).toBeInTheDocument();
  fireEvent.click(button);
  expect(button).not.toBeInTheDocument()
  // expect(cell).toBeInTheDocument()
  // fireEvent.click(cell);
  // const X = cell.value;
  // expect(X).toBeInTheDocument();
});