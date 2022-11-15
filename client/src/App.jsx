import "./App.css";
import Board from "./components/Board";
import Keyboard from "./components/Keyboard";
import { createContext, useState } from "react";
import { boardDefault, generateWordSet } from "./Words";
import { useEffect } from "react";

export const AppContext = createContext();

function App() {
  const [board, setBoard] = useState(boardDefault);
  const [currAttempt, setCurrAttempt] = useState({
    attempt: 0,
    letterPosition: 0,
  });
  const [wordSet, setWordSet] = useState(new Set());
  const [disabledLetters, setDisabledLetters] = useState([])

  const correctWord = "BITCH";

  useEffect(() => {
    generateWordSet().then((words) => {
      setWordSet(words.wordSet);
    });
  }, []);

  const onSelectLetter = (keyValue) => {
    if (currAttempt.letterPosition > 4) return;
    const newBoard = [...board];
    newBoard[currAttempt.attempt][currAttempt.letterPosition] = keyValue;
    setBoard(newBoard);
    setCurrAttempt({
      ...currAttempt,
      letterPosition: currAttempt.letterPosition + 1,
    });
  };

  const onEnter = () => {
    if (currAttempt.letterPosition !== 5) return;

    let currWord = "";
    for (let i = 0; i < 5; i++) {
      currWord += board[currAttempt.attempt][i];
    }
    if (wordSet.has(currWord.toLowerCase())) {
      setCurrAttempt({ attempt: currAttempt.attempt + 1, letterPosition: 0 });
    } else {
      alert("Word Not Found")
    }

  };

  const onDelete = () => {
    if (currAttempt.letterPosition === 0) return;
    const newBoard = [...board];
    newBoard[currAttempt.attempt][currAttempt.letterPosition - 1] = "";
    setBoard(newBoard);
    setCurrAttempt({
      ...currAttempt,
      letterPosition: currAttempt.letterPosition - 1,
    });
  };

  return (
    <div className="App">
      <nav>
        <h1>Wordle</h1>
      </nav>
      <AppContext.Provider
        value={{
          board,
          setBoard,
          currAttempt,
          setCurrAttempt,
          onSelectLetter,
          onEnter,
          onDelete,
          correctWord,
          disabledLetters,
          setDisabledLetters
        }}
      >
        <div className="game">
          <Board />
          <Keyboard />
        </div>
      </AppContext.Provider>
    </div>
  );
}

export default App;
