import Square from "./Square";

function Board({ squares, onSquareClick, winningSquares }) {
  return (
    <div className="board">
      {squares.map((value, index) => (
        <Square
          key={index}
          value={value}
          onClick={() => onSquareClick(index)}
          isWinner={winningSquares && winningSquares.includes(index)}
        />
      ))}
    </div>
  );
}
export default Board;