function ModeSelector({ mode, onChange }) {
  return (
    <div className="mode-selector">
      <button
        className={`mode-btn ${mode === "pvp" ? "active" : ""}`}
        onClick={() => onChange("pvp")}
      >
        👥 2 Players
      </button>
      <button
        className={`mode-btn ${mode === "ai" ? "active" : ""}`}
        onClick={() => onChange("ai")}
      >
        🤖 vs AI
      </button>
    </div>
  );
}
export default ModeSelector;