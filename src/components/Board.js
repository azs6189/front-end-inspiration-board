import React from 'react';
import PropTypes from 'prop-types';
// Board
//// Each Board is an <li> element
//// Clicking on the name of a board changes the active board

const Board = ({ name, owner, cards, board_id, update }) => {
  const onBoardNameClick = () => {
    update({ name, owner, cards, board_id });
  };

  return <li onClick={onBoardNameClick}>{name}</li>;
};

Board.propTypes = {
  name: PropTypes.string.isRequired,
  owner: PropTypes.string.isRequired,
  update: PropTypes.func.isRequired,
};

export default Board;
