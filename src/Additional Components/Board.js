import Square from "./Square";

export default function Board({xIsNext, squares, onPlay}) {
    const board_row = "board-row";

    function handleClick(index) {
        let winner = calculateWinner(squares);
        if (winner || squares[index]) return;
        const nextSquares = squares.slice();
        if (xIsNext) {
            nextSquares[index] = 'X';
        } else {
            nextSquares[index] = 'O';
        }
        onPlay(nextSquares);
    }

    const winner = calculateWinner(squares);
    let status;

    if (winner) {
        status = 'Winner: ' + winner;
    } else {
        status = 'Next player: ' + (xIsNext ? 'X' : 'O');
    }

    let column = [];
    let row = [];

    for (let i = 0; i < 12; i++) {
        if (i % 3 === 0) {
            column.push(<div key={i} className={board_row}>{row}</div>)
            row = [];
        }
        row.push(<Square key={i} value={squares[i]} onSquareClick={() => handleClick(i)}/>)
    }
    return (<>
        <div className="status">{status}</div>
        {column}
    </>);
}

function calculateWinner(squares) {
    const lines = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    let Draw = true;
    for (const square in squares) {
        if (squares[square] === null) {
            Draw = false;
        }
    }
    if (Draw) {
        alert("Draw!");
        return null;
    }
    return null;
}