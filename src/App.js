import { useEffect, useState } from 'react';
import './App.css';
import BoardList from './components/BoardList.js';
import Card from './components/Card.js';
import BoardForm from './components/BoardForm.js';
import CardForm from './components/CardForm.js';
import Alert from './components/Alert.js';
import axios from 'axios';

const URL = 'http://localhost:5000';

function App() {
  const [activeBoard, setActiveBoard] = useState({
    title: '',
    owner: '',
    cards: [],
    board_id: null,
  });
  const [boards, setBoards] = useState([]);
  const [cards, setCards] = useState([]);
  const onBoardSelect = (boardData) => {
    setActiveBoard(boardData);
    setCards(boardData.cards);
  };
  const [alert, setAlert] = useState(null);
  const [boardFormHide, setBoardFormHide] = useState(false);

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

  const displayError = (err) => {
    setAlert(err.response.data.error);
    setTimeout(() => {
      setAlert(null);
    }, 5000);
  };

  const addBoard = (data) => {
    axios
      .post(`${URL}/boards`, data)
      .then((response) => {
        setBoards([...boards, response.data]);
      })
      .catch((err) => {
        displayError(err);
      });
  };

  const addCard = (data) => {
    axios
      .post(`${URL}/boards/${activeBoard.board_id}/cards`, data)
      .then((response) => {
        setCards([...cards, response.data]);
      })
      .catch((err) => {
        displayError(err);
      });
  };

  const handleSort = (event) => {
    let newCards = [...cards];
    if (event.target.value === 'id') {
      newCards.sort((a, b) => (a.card_id > b.card_id ? 1 : -1));
      setCards(newCards);
    } else if (event.target.value === 'name') {
      newCards.sort((a, b) => (a.message > b.message ? 1 : -1));
      setCards(newCards);
    } else if (event.target.value === 'likes') {
      newCards.sort((a, b) => (a.likes_count < b.likes_count ? 1 : -1));
      setCards(newCards);
    } else {
      console.log('no match');
    }
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
      <label htmlFor='sort'>Choose a sorting option:</label>
      <select name='sort' id='sort' onChange={handleSort}>
        <option value='id'>ID</option>
        <option value='name'>Name</option>
        <option value='likes'>Number of likes</option>
      </select>
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
      <Alert message={alert} />
      <BoardForm addBoard={addBoard} hidden={boardFormHide} />
      <button
        onClick={() => {
          setBoardFormHide(!boardFormHide);
        }}
      >
        {boardFormHide ? 'Show' : 'Hide'}
      </button>
      <CardForm addCard={addCard} />
    </div>
  );
}

export default App;
