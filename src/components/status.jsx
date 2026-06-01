function Status({ winner, currentPlayer, isDraw }) {
  return (
    <div className="status">
      {winner
        ? `🏆 Winner: ${winner}`
        : isDraw
        ? "🤝 It's a Draw!"
        : `Player Turn: ${currentPlayer}`}
    </div>
  );
}
export default Status;