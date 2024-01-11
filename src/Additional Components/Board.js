import Square from "./Square";

export default function Board({xIsNext, squares, onPlay}) {
    const board_row = "board-row";
    const winner = calculateWinner(squares); // [winner, winning line]
    let status;
    let column = [];
    let row = [];

    function handleClick(index) {
        if (winner || squares[index]) return;
        const nextSquares = squares.slice();
        if (xIsNext) {
            nextSquares[index] = 'X';
        } else {
            nextSquares[index] = 'O';
        }
        onPlay(nextSquares);
    }

    if (winner) {
        status = 'Winner: ' + winner[0];
        for (const square of winner[1]) {
            squares[square] = <span className="win">{squares[square]}</span>;
        }
    } else {
        status = 'Next player: ' + (xIsNext ? 'X' : 'O');
    }

    // Loop for creating the board
    for (let i = 0; i < 12; i++) {
        if (i % 3 === 0) {
            // Push the row into the column if the row is full
            column.push(<div key={i} className={board_row}>{row}</div>)
            row = [];
        }
        // Push the square into the row
        row.push(<Square key={i} value={squares[i]} onSquareClick={() => handleClick(i)}/>)
    }
    return (<>
        <div className="status">{status}</div>
        {column}
    </>);
}

function calculateWinner(squares) {
    const lines = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
    let Draw = true;

    // Winner loop
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return [squares[a], lines[i]];
        }
    }

    // Draw loop
    for (const square in squares) {
        if (squares[square] === null) {
            Draw = false;
        }
    }
    if (Draw) {
        return "Draw!";
    }

    // Continue return;
    return null;
}