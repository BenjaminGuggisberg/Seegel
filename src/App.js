import React, { useState } from 'react';
import Page1 from './components/Gewaesser/Bielersee';
import Page2 from './components/Gewaesser/Neuenburgersee';
import Page3 from './components/Gewaesser/Thunersee';
import Page4 from './components/Gewaesser/Brienzersee';
import User from './components/User';
import { useEffect } from 'react';
import AppbarMenu from './components/AppbarMenu';
import '../src/components/css/seegel.css'
import Login from './components/Login';
import Appbar from './components/Appbar';
import axios from 'axios';
import ButtonList from './components/favouriteLakes';

function App() {
  const [nameTag, setNameTag] = useState('');
  const [currentPage, setCurrentPage] = useState('menu');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [clickedCoordinate, setClickedCoordinate] = useState(null);

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
    sessionStorage.setItem('favoriteButtons', JSON.stringify(updatedButtons));
  };

  useEffect(() => {
    const savedButtons = sessionStorage.getItem('favoriteButtons');
    if (savedButtons) {
      setButtons(JSON.parse(savedButtons));
    }
  }, []);
  

  const renderButton = (button) => {
    let buttonClickHandler = null;
    switch (button.text) {
    case 'Bielersee':
    buttonClickHandler = () => handleClick('page1');
    break;
    case 'Neuenburgersee':
    buttonClickHandler = () => handleClick('page2');
    break;
    case 'Thunersee':
    buttonClickHandler = () => handleClick('page3');
    break;
    case 'Brienzersee':
    buttonClickHandler = () => handleClick('page4');
    break;
    default:
    buttonClickHandler = () => {};
    break;
    }
    return (
      <li key={button.id} className='li'>
        <button style={{ marginTop: '10px' }} onClick={buttonClickHandler}>
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



  const handleChildClick = (coordinate) => {
    setClickedCoordinate(coordinate)
  };  

  const handleLoginSuccess = (response) => {
    sessionStorage.setItem("isLoggedIn", true);
    setIsLoggedIn(true);
    sessionStorage.setItem("username", response.data.username);
    sessionStorage.setItem("email", response.data.email);
  };
  

  const handleLogout = () => {
    sessionStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };

  // const handleLougoutSuccess = (response) => {
  //   sessionStorage.removeItem("isLoggedIn")
  // }

  const setname = () => {
    if (currentPage === 'page1') {
      setNameTag('Bielersee')
    } else if (currentPage === 'page2') {
      setNameTag('Neuenburgersee')
    } else if (currentPage === 'page3') {
      setNameTag('Thunersee')
    } else if (currentPage === 'page4') {
      setNameTag('Brienzersee')
    } else if (currentPage === 'menu') {
      setNameTag('') // setNameTag('Main Menu')
    } else if (currentPage === 'user') {
      setNameTag('User Settings')
    }
  };

  useEffect(() => {
    if (sessionStorage.getItem("isLoggedIn")) {
      setIsLoggedIn(true);
    }
    setname();
  }, [currentPage]);

  const handleClick = (page) => {
    // if (currentPage === 'user') {
    //   setCurrentPage('menu')
    // } else {
    //   setCurrentPage(page)
    // };
    setCurrentPage(page);
    console.log('page index: ', page)
  };
  // console.log('nameTag: ', nameTag)


  return (
    <>
      <div id='first' style={{fontFamily: "Lucida Sans"}}>
        <div id='second'>
          {isLoggedIn ? (<>
            <div id='third'>
              <div id='fourth'>
                {currentPage === 'menu' && (
                  <>
                    <AppbarMenu handleLogout={handleLogout} nameTag={nameTag} handleClick={handleClick} currentPage={currentPage} />
                    <div id='list'>
                      {/* <ul id='ul'>
                        <li className='li'><button style={{ marginTop: '70px' }} onClick={() => handleClick('page1')}>Bielersee</button></li>
                        <li className='li'><button style={{ marginTop: '10px' }} onClick={() => handleClick('page2')}>Neuenburgersee</button></li>
                        <li className='li'><button style={{ marginTop: '10px' }} onClick={() => handleClick('page3')}>Thunersee</button></li>
                        <li className='li'><button style={{ marginTop: '10px' }} onClick={() => handleClick('page4')}>Brienzersee</button></li>
                      </ul> */}
                      <div id='list'>{renderButtons()}</div>
                    </div>
                  </>
                )}
                {currentPage === 'page1' && (
                  <>
                    <Appbar nameTag={nameTag} onClick={handleClick} handleClick={handleClick} currentPage={currentPage} />
                    <Page1 handleLogout={handleLogout} onChildClick={handleChildClick} clickedCoordinate={clickedCoordinate} />
                  </>)}
                {currentPage === 'page2' && (
                  <>
                    <Appbar nameTag={nameTag} onClick={handleClick} handleClick={handleClick} currentPage={currentPage} />
                    <Page2 handleLogout={handleLogout} onChildClick={handleChildClick} clickedCoordinate={clickedCoordinate} />
                  </>)}
                {currentPage === 'page3' && (
                  <>
                    <Appbar nameTag={nameTag} onClick={handleClick} handleClick={handleClick} currentPage={currentPage} />
                    <Page3 handleLogout={handleLogout} onChildClick={handleChildClick} clickedCoordinate={clickedCoordinate} />
                  </>)}
                {currentPage === 'page4' && (
                  <>
                    <Appbar nameTag={nameTag} onClick={handleClick} handleClick={handleClick} currentPage={currentPage} />
                    <Page4 handleLogout={handleLogout} onChildClick={handleChildClick} clickedCoordinate={clickedCoordinate} />
                  </>)}
                  {currentPage === 'user' && (
                  <>
                    <Appbar nameTag={nameTag} onClick={handleClick} handleClick={handleClick} currentPage={currentPage} />
                    <User handleLogout={handleLogout} />
                  </>)}
              </div>
            </div><br /><br />
            {currentPage === 'menu' && <footer id='menufooter'><p id='p1'>Copyright © 2023 | Sara Hauser | Benjamin Guggisberg</p><p id='p2'>All rights reserved</p></footer>}
          </>
          ) : (
            <Login onLoginSuccess={handleLoginSuccess} />
          )}
        </div>
      </div>
      {/* <div>
        Longitude: {clickedCoordinate[0]}
        Latitude: {clickedCoordinate[1]}
      </div> */}
    </>
  );
}

export default App;
