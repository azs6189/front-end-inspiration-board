const Alert = ({ message }) => {
  if (!message) {
    return null;
  }

  return (
    <div className='errorMessage'>
      <p>{message}</p>
    </div>
  );
};

export default Alert;
