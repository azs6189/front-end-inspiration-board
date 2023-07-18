import React, { useState } from 'react';
import PropTypes from 'prop-types';

const BoardForm = ({ addBoard, hidden }) => {
  const [boardData, setBoardData] = useState({ title: '', owner: '' });

  if (hidden) return null;

  const submitBoard = (event) => {
    event.preventDefault();
    addBoard(boardData);
    setBoardData({ title: '', owner: '' });
  };

  const handleChange = (event) => {
    setBoardData({ ...boardData, [event.target.name]: event.target.value });
  };

  return (
    <React.Fragment>
      <form onSubmit={submitBoard}>
        <label htmlFor='title'>Title</label>
        <input
          name='title'
          id='title'
          value={boardData.title}
          onChange={handleChange}
        />
        <label htmlFor='owner'>Owner</label>
        <input
          name='owner'
          id='owner'
          value={boardData.owner}
          onChange={handleChange}
        />
        <input type='submit' value='Add Board' />
      </form>
    </React.Fragment>
  );
};

BoardForm.propTypes = {
  addBoard: PropTypes.func.isRequired,
};

export default BoardForm;
