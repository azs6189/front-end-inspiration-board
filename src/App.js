import { useState } from 'react';
import './App.css';
import TestBoards from './data/TestBoards.json';
import TestCards from './data/TestCards.json';
import BoardList from './components/BoardList.js';

function App() {
  const [activeBoard, setActiveBoard] = useState({
    title: '',
    owner: '',
    cards: [],
  });
  // Components possibly needed:

  // Board
  //// Each Board is an <li> element
  //// Clicking on the name of a board changes the active board

  // Card
  //// You can click a "like" button to update likes on a card
  //// Each card is associated with a single board

  // BoardList (under "Boards" heading in demo)

  // CardList (under "Cards for ${}" heading in demo)

  // BoardForm
  //// Board form has inputs for title and owner, both required
  //// Submitting the new board form creates a new board
  //// Board form can be hidden/unhidden with a button

  // CardForm
  //// Card form has an input for message
  //// Submitting creates a new card associated with the active board

  return (
    <div className='App'>
      <h1>Inspiration Board</h1>
      <ol>
        <BoardList
          data={TestBoards}
          boardUpdate={(boardData) => setActiveBoard(boardData)}
        />
      </ol>
      <h2>Selected Board</h2>
      <p>
        {activeBoard.name} - {activeBoard.owner}
      </p>
      <h2>Cards for {activeBoard.name}</h2>
      <ul>
        {activeBoard.cards.map((card) => {
          return <li>{card.message}</li>;
        })}
      </ul>
    </div>
  );
}

export default App;
