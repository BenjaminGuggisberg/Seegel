import { useState } from 'react';

function ButtonList({ handleLogout, nameTag, handleClick, currentPage }) {
  const [buttons, setButtons] = useState([
    { id: 1, text: 'Bielersee', favorite: false },
    { id: 2, text: 'Neuenburgersee', favorite: false },
    { id: 3, text: 'Thunersee', favorite: false },
    { id: 4, text: 'Brienzersee', favorite: false },
  ]);

  const handleFavoriteClick = (id) => {
    const updatedButtons = buttons.map((button) =>
      button.id === id ? { ...button, favorite: !button.favorite } : button
    );
    setButtons(updatedButtons);
  };

  const renderButton = (button) => {
    return (
      <li key={button.id} className='li'>
        <button style={{ marginTop: '10px' }} onClick={() => handleClick(button.text)}>
          {button.text}
        </button>
        <span
          className='favorite-icon'
          onClick={() => handleFavoriteClick(button.id)}
          style={{ marginLeft: '5px', color: button.favorite ? 'yellow' : 'grey', cursor: 'pointer' }}
        >
          &#9733;
        </span>
      </li>
    );
  };

  const renderButtons = () => {
    const sortedButtons = [...buttons].sort((a, b) => (b.favorite ? 1 : 0) - (a.favorite ? 1 : 0));
    return <ul id='ul'>{sortedButtons.map((button) => renderButton(button))}</ul>;
  };

  return (
    <>
      <div id='list'>{renderButtons()}</div>
    </>
  );
}

export default ButtonList