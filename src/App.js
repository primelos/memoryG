import React, { useState, useEffect } from "react";
import "./App.css";
import Board from "./component/board";
import initializeDeck from "./deck";

function App() {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [dimension, setDimension] = useState(400);
  const [solved, setSolved] = useState([]);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    resizeBoard();
    setCards(initializeDeck());
    preloadImages()
  }, []);

  // useEffect(() => {
  //   preloadImages()
  // }, cards);

  useEffect(() => {
    const resizeListener = window.addEventListener("resize", resizeBoard);
    return () => window.removeEventListener("resize", resizeListener);
  });

  const preloadImages = () => {

    cards.map(card => {
      const src = `/img/${card.type}.png`
      new Image().src = src
    })
  }

  const handleClick = (id) => {
    setDisabled(true);
    if (flipped.length === 0) {
      setFlipped([id]);
      setDisabled(false);
    } else {
      if (sameCardClicked(id)) return 'click another square';
      setFlipped([flipped[0], id]);
      if (isMatch(id)) {
        setSolved([...solved, flipped[0], id]);
        resetCards()
      } else {
        setTimeout(resetCards, 2000)
      }
    }
  };

  const resetCards = () => {
    setFlipped([])
    setDisabled(false)
  }

  const sameCardClicked = (id) => flipped.includes(id);

  const isMatch = (id) => {
    const clickedCard = cards.find((card) => card.id === id);
    const flippedCard = cards.find((card) => flipped[0] === card.id);
    return flippedCard.type === clickedCard.type;
  };

  const resizeBoard = () => {
    setDimension(
      Math.min(
        document.documentElement.clientWidth,
        document.documentElement.clientHeight
      )
    );
  };

  return (
    <div className="App">
      <div className="App-header">
        <h1>
          <span role="img" aria-label="head">
            👨
          </span>
          Test Your Memory
          <span role="img" aria-label="hurt head">
            🤕
          </span>
        </h1>
      </div>
      <Board
        dimension={dimension}
        cards={cards}
        flipped={flipped}
        handleClick={handleClick}
        disabled={disabled}
        solved={solved}
      />
    </div>
  );
}

export default App;
