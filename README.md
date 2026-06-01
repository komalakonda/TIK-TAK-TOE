# 🎮 Tic Tac Toe

A fully functional Tic Tac Toe game built with **React** and **Vite**.

## ✨ Features

- 👥 **2 Player Mode** — Play with a friend on the same device
- 🤖 **vs AI Mode** — Play against the computer
- 🧠 **3 Difficulty Levels** — Easy, Medium, Hard
- 🏆 **Score Tracker** — Tracks X wins, O wins and Draws
- ✨ **Highlight Winning Squares** — Winning squares glow on victory
- 🔄 **Next Round & Reset Score** — Easy game management

## 🛠️ Tech Stack

- ⚡ Vite
- ⚛️ React
- 🎨 CSS

## 📁 Project Structure
src/
├── components/
│   ├── Board.jsx          → 3x3 game grid
│   ├── Square.jsx         → Individual cell
│   ├── Status.jsx         → Turn / Winner message
│   ├── ScoreBoard.jsx     → Score tracker
│   ├── LevelSelector.jsx  → Difficulty selector
│   └── ModeSelector.jsx   → 2 Player or vs AI
├── App.jsx                → Main logic & AI
└── App.css                → All styles