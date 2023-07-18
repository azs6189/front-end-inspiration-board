import { useEffect, useState } from 'react';
import './App.css';
import TestBoards from './data/TestBoards.json';
import BoardList from './components/BoardList.js';
import Card from './components/Card.js';
import axios from 'axios';

const URL = 'http://localhost:5000';

function App() {
  const [activeBoard, setActiveBoard] = useState({
    title: '',
    owner: '',
    cards: [],
  });
  const [boards, setBoards] = useState([]);
  const [cards, setCards] = useState([]);
  const onBoardSelect = (boardData) => {
    setActiveBoard(boardData);
    setCards(boardData.cards);
  };

  useEffect(() => {
    axios
      .get(`${URL}/boards`)
      .then((response) => {
        const newBoards = response.data.map((board) => {
          return {
            board_id: board.board_id,
            owner: board.owner,
            title: board.title,
            cards: board.cards,
          };
        });
        setBoards(newBoards);
      })
      .catch((err) => console.log(err));
  }, [activeBoard]);

  // BoardForm
  //// Board form has inputs for title and owner, both required
  //// Submitting the new board form creates a new board
  //// Board form can be hidden/unhidden with a button

  // CardForm
  //// Card form has an input for message
  //// Submitting creates a new card associated with the active board

  const onCardLike = (card_id) => {
    axios
      .put(`${URL}/cards/${card_id}/add_like`)
      .then((response) => {
        setCards(
          cards.map((card) => {
            return card.card_id === card_id ? response.data : card;
          })
        );
      })
      .catch((err) => console.log(err));
  };

  const onCardDelete = (card_id) => {
    axios
      .delete(`${URL}/cards/${card_id}`)
      .then(() => {
        setCards(cards.filter((card) => card.card_id !== card_id));
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className='App'>
      <h1>Inspiration Board</h1>
      <ol>
        <BoardList data={boards} boardUpdate={onBoardSelect} />
      </ol>
      <h2>Selected Board</h2>
      <p>
        {activeBoard.name} - {activeBoard.owner}
      </p>
      <h2>Cards for {activeBoard.name}</h2>
      <ul>
        {cards.map((card) => {
          return (
            <Card
              card={card}
              key={card.card_id}
              onLike={onCardLike}
              onDelete={onCardDelete}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default App;
