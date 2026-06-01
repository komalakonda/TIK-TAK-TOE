function Square({ value, onClick, isWinner }) {
  return (
    <button
      className={`square ${isWinner ? "winner-square" : ""}`}
      onClick={onClick}
    >
      {value}
    </button>
  );
}
export default Square;