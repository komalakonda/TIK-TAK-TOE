function LevelSelector({ level, onChange }) {
  return (
    <div className="level-selector">
      <span>Difficulty: </span>
      {["Easy", "Medium", "Hard"].map((lvl) => (
        <button
          key={lvl}
          className={`level-btn ${level === lvl ? "active" : ""}`}
          onClick={() => onChange(lvl)}
        >
          {lvl}
        </button>
      ))}
    </div>
  );
}
export default LevelSelector;