function ScoreBoard({ scores, onReset }) {
  return (
    <div className="scoreboard">
      <div className="score x-score">
        <span>X</span>
        <strong>{scores.X}</strong>
      </div>
      <div className="score draw-score">
        <span>Draws</span>
        <strong>{scores.draws}</strong>
      </div>
      <div className="score o-score">
        <span>O</span>
        <strong>{scores.O}</strong>
      </div>
    </div>
  );
}
export default ScoreBoard;