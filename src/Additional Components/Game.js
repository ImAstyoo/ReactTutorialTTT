import Board from "./Board";
import {useState} from "react";

export default function Game() {
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [currentMove, setCurrentMove] = useState(0);
    const xIsNext = currentMove % 2 === 0;
    const currentSquares = history[currentMove];
    let CurrentMove = <span>Move: {currentMove}</span>;

    const moves = history.map((squares, move) => {
        let description = move ? 'Go to move #' + move : 'Go to game start';

        if (move === currentMove) {
            description = <span>You are at the move # {move}</span>;
        }

        return (
            <li key={move}>
                <button className='button' onClick={() => jumpTo(move)}>{description}</button>
            </li>
        );
    });

    function handlePlay(nextSquares) {
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1);
    }

    function jumpTo(nextMove) {
        setCurrentMove(nextMove);
    }

    return (
        <div className="game">
            <div className="game-board">
                <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay}/>
            </div>
            <div>

            </div>
            <div className="game-info">
                <div>{CurrentMove}</div>
                <ol>{moves}</ol>
            </div>
        </div>
    );

}