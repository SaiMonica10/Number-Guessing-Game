import { useState } from "react";
import "./App.css";

function App() {
  const [guess, setGuess] = useState("");
  const [result, setResult] = useState("");
  const [clue, setClue] = useState("");
  const [gameStarted, setGameStarted] = useState(false);

  // Sound files (served from public folder)
  const successSound = new Audio("/sounds/correct.mp3.wav");
  const failSound = new Audio("/sounds/Click.mp3.wav");

  const startNewGame = async () => {
    // 🔊 Play fail sound on start or reset
    failSound.play();

    try {
      const res = await fetch("http://localhost:8000/new-game");
      const data = await res.json();
      setClue(data.clue);
      setResult("");
      setGuess("");
      setGameStarted(true);
    } catch (err) {
      console.error("Failed to start new game:", err);
    }
  };

  const handleGuess = async () => {
    if (!guess) return;

    try {
      const res = await fetch(`http://localhost:8000/guess?number=${guess}`);
      const data = await res.json();
      setResult(data.result);

      // 🔊 Play appropriate sound
      if (data.result.toLowerCase().includes("correct")) {
        successSound.play();
      } else {
        failSound.play();
      }
    } catch (err) {
      console.error("Guess failed:", err);
    }
  };

  return (
    <div style={{ padding: "2rem", textAlign: "center", fontFamily: "sans-serif" }}>
      <h1>🎯 Guess the Number (1 - 10)</h1>

      {!gameStarted && <button onClick={startNewGame}>Start Game</button>}

      {gameStarted && (
        <>
          <p style={{ fontSize: "1.2rem" }}>
            <strong>🕵️ Clue:</strong> {clue}
          </p>

          <input
            type="number"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            placeholder="Enter a number (1-10)"
            min="1"
            max="10"
            style={{ padding: "0.5rem", fontSize: "1rem" }}
          />
          <br /><br />
          <button onClick={handleGuess}>Guess</button>
          <p style={{ fontSize: "1.2rem", marginTop: "1rem" }}>{result}</p>
          <button onClick={startNewGame} style={{ marginTop: "1rem" }}>
            🔄 Play Again
          </button>
        </>
      )}
    </div>
  );
}

export default App;
