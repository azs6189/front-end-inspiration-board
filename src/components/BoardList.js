import React from 'react';
import Board from './Board.js';
import PropTypes from 'prop-types';

const BoardList = ({ data, boardUpdate }) => {
  const boards = data.map((board) => {
    return (
      <Board
        name={board.title}
        owner={board.owner}
        cards={board.cards}
        board_id={board.board_id}
        key={board.board_id}
        update={boardUpdate}
      />
    );
  });
  return (
    <React.Fragment>
      <h2>Boards</h2>
      {boards}
    </React.Fragment>
  );
};

BoardList.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      board_id: PropTypes.number.isRequired,
      owner: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      cards: PropTypes.array.isRequired,
    })
  ),
};

export default BoardList;
