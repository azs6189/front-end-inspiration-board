import { useState } from 'react';

const CardForm = ({ addCard }) => {
  const [cardData, setCardData] = useState({ message: '' });

  const submitCard = (event) => {
    event.preventDefault();
    addCard(cardData);
    setCardData({ message: '' });
  };

  const handleChange = (event) => {
    setCardData({ message: event.target.value });
  };

  return (
    <form onSubmit={submitCard}>
      <label htmlFor='message'>Message</label>
      <input
        name='message'
        id='message'
        value={cardData.message}
        onChange={handleChange}
      />
      <input type='submit' value='Add Card' />
    </form>
  );
};

export default CardForm;
