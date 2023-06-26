import './App.css';
import TestBoards from TestBoards.js;
import TestCards from TestCards.js;

function App() {
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

  return <div className='App'></div>;
}

export default App;
