export default function Square({value, onSquareClick}) {
    let square = "square";

    return <button className={square} onClick={onSquareClick}>{value}</button>;
}