import { useState, useEffect } from "react";
import Board from "./components/Board";
import Status from "./components/Status";
import ScoreBoard from "./components/ScoreBoard";
import LevelSelector from "./components/LevelSelector";
import ModeSelector from "./components/ModeSelector";
import "./App.css";

// ─── Winner checker (returns winner + winning squares) ────
function calculateWinner(squares) {
  const lines = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6],
  ];
  for (let [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: [a, b, c] };
    }
  }
  return null;
}

// ─── AI Logic ─────────────────────────────────────────────
function getRandomMove(squares) {
  const empty = squares.map((v, i) => v === null ? i : null).filter(v => v !== null);
  return empty[Math.floor(Math.random() * empty.length)];
}

function minimax(squares, isMaximizing) {
  const result = calculateWinner(squares);
  if (result?.winner === "O") return 10;
  if (result?.winner === "X") return -10;
  if (squares.every(Boolean)) return 0;

  const empty = squares.map((v, i) => v === null ? i : null).filter(v => v !== null);

  if (isMaximizing) {
    let best = -Infinity;
    for (let i of empty) {
      squares[i] = "O";
      best = Math.max(best, minimax(squares, false));
      squares[i] = null;
    }
    return best;
  } else {
    let best = Infinity;
    for (let i of empty) {
      squares[i] = "X";
      best = Math.min(best, minimax(squares, true));
      squares[i] = null;
    }
    return best;
  }
}

function getBestMove(squares) {
  let bestVal = -Infinity, bestMove = -1;
  squares.forEach((val, i) => {
    if (!val) {
      squares[i] = "O";
      const moveVal = minimax(squares, false);
      squares[i] = null;
      if (moveVal > bestVal) { bestVal = moveVal; bestMove = i; }
    }
  });
  return bestMove;
}

function getMediumMove(squares) {
  return Math.random() < 0.5 ? getBestMove(squares) : getRandomMove(squares);
}

// ─── App ──────────────────────────────────────────────────
function App() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isX, setIsX] = useState(true);
  const [scores, setScores] = useState({ X: 0, O: 0, draws: 0 });
  const [level, setLevel] = useState("Easy");
  const [mode, setMode] = useState("pvp"); // "pvp" or "ai"
  const [gameOver, setGameOver] = useState(false);

  const result = calculateWinner(squares);
  const winner = result?.winner || null;
  const winningSquares = result?.line || [];
  const isDraw = !winner && squares.every(Boolean);
  const currentPlayer = isX ? "X" : "O";

  // AI plays when mode is "ai" and it's O's turn
  useEffect(() => {
    if (mode === "ai" && !isX && !winner && !isDraw && !gameOver) {
      const timer = setTimeout(() => {
        let move;
        if (level === "Easy") move = getRandomMove(squares);
        else if (level === "Medium") move = getMediumMove([...squares]);
        else move = getBestMove([...squares]);

        if (move !== undefined && move !== -1) {
          const newSquares = [...squares];
          newSquares[move] = "O";
          setSquares(newSquares);
          setIsX(true);
        }
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [isX, squares, winner, isDraw, level, gameOver, mode]);

  // Update score when game ends
  useEffect(() => {
    if (winner && !gameOver) {
      setScores(prev => ({ ...prev, [winner]: prev[winner] + 1 }));
      setGameOver(true);
    } else if (isDraw && !gameOver) {
      setScores(prev => ({ ...prev, draws: prev.draws + 1 }));
      setGameOver(true);
    }
  }, [winner, isDraw, gameOver]);

  function handleClick(index) {
    if (squares[index] || winner || isDraw) return;
    if (mode === "ai" && !isX) return; // block click during AI turn
    const newSquares = [...squares];
    newSquares[index] = currentPlayer;
    setSquares(newSquares);
    setIsX(!isX);
  }

  function handleReset() {
    setSquares(Array(9).fill(null));
    setIsX(true);
    setGameOver(false);
  }

  function handleLevelChange(newLevel) {
    setLevel(newLevel);
    handleReset();
  }

  function handleModeChange(newMode) {
    setMode(newMode);
    handleReset();
  }

  function handleScoreReset() {
    setScores({ X: 0, O: 0, draws: 0 });
    handleReset();
  }

  return (
    <div className="app">
      <h1>Tic Tac Toe</h1>

      {/* Mode Selector */}
      <ModeSelector mode={mode} onChange={handleModeChange} />

      {/* Show level only in AI mode */}
      {mode === "ai" && (
        <LevelSelector level={level} onChange={handleLevelChange} />
      )}

      <ScoreBoard scores={scores} />
      <Status winner={winner} currentPlayer={currentPlayer} isDraw={isDraw} />
      <Board
        squares={squares}
        onSquareClick={handleClick}
        winningSquares={winningSquares}
      />
      <div className="buttons">
        <button className="reset-btn" onClick={handleReset}>🔄 Next Round</button>
        <button className="reset-btn secondary" onClick={handleScoreReset}>🗑️ Reset Score</button>
      </div>
    </div>
  );
}

export default App;