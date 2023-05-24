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
import zIndex from '@mui/material/styles/zIndex';
// import AnimatedIcon from './components/updated_components/animated_icon';

function App() {
  const [nameTag, setNameTag] = useState('');
  const [currentPage, setCurrentPage] = useState('menu');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [clickedCoordinate, setClickedCoordinate] = useState(null);
  const currentuser = sessionStorage.getItem('username');
  const [profilePictureUrl, setProfilePictureUrl] = useState('');
  const [Loadinganimation, setLoadingAnimation] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoadingAnimation(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (currentuser) {
      const timestamp = Date.now();
      axios
        .get(`http://localhost:8000/get-profile-picture/${currentuser}?timestamp=${timestamp}`, { responseType: 'blob' })
        .then((response) => {
          const file = new Blob([response.data], { type: 'image/png' });
          if (file === null) {
            setProfilePictureUrl('/example_icon.png');
          } else {
            setProfilePictureUrl(URL.createObjectURL(file));
          }
        })
        .catch((error) => {
          console.error(error);
          setProfilePictureUrl('/example_icon.png');
        });
    }
  }, [currentuser]);



  const [buttons, setButtons] = useState([
    { id: 1, text: 'Bielersee', favorite: false },
    { id: 2, text: 'Neuenburgersee', favorite: false },
    { id: 3, text: 'Thunersee', favorite: false },
    { id: 4, text: 'Brienzersee', favorite: false },
    { id: 5, text: 'Genfersee', favorite: false },
    { id: 6, text: 'Vierwaldstättersee', favorite: false },
    { id: 7, text: 'Zürichsee', favorite: false },
    { id: 8, text: 'Murtensee', favorite: false },
  ]);

  const handleFavoriteClick = (id) => {
    const updatedButtons = buttons.map((button) =>
      button.id === id ? { ...button, favorite: !button.favorite } : button
    );
    // console.log(buttons)
    setButtons(updatedButtons);
    localStorage.setItem(`favoriteButtons_${currentuser}`, JSON.stringify(updatedButtons));
  };

  useEffect(() => {
    const savedButtons = localStorage.getItem(`favoriteButtons_${currentuser}`);
    if (savedButtons) {
      setButtons(JSON.parse(savedButtons));
    } else {
      // Wenn die Favoritenstatus nicht im LocalStorage vorhanden sind, setzen Sie sie auf den Standardwert
      setButtons((prevButtons) =>
        prevButtons.map((button) => {
          if (button.id >= 5 && button.id <= 8) {
            return { ...button, favorite: false };
          }
          return button;
        })
      );
    }
  }, []);
  

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

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
      case 'Genfersee':
        buttonClickHandler = () => handleClick('menu');
        break;
      case 'Vierwaldstättersee':
        buttonClickHandler = () => handleClick('menu');
        break;
      case 'Zürichsee':
        buttonClickHandler = () => handleClick('menu');
        break;
      case 'Murtensee':
        buttonClickHandler = () => handleClick('menu');
        break;
      default:
        buttonClickHandler = () => { };
        break;
    }
    let buttonStyle = {}; // Define an empty object for button styles

  if (button.id >= 5 && button.id <= 8) {
    // Apply custom styles for buttons 5-8
    buttonStyle = {
      backgroundColor: 'lightblue',
      backgroundImage: 'linear-gradient(45deg, transparent 25%, rgba(255, 255, 255, 0.4) 25%, rgba(255, 255, 255, 0.4) 50%, transparent 50%, transparent 75%, rgba(255, 255, 255, 0.4) 75%, rgba(255, 255, 255, 0.4))',
      backgroundSize: '2px 2px',
      border: 'none',
      color: 'white', 
    };
  }

  return (
    <li key={button.id} className='li'>
      <button style={{ marginTop: '10px', ...buttonStyle }} onClick={buttonClickHandler}>
        {button.text}
      </button>
      <span
        className='favorite-icon'
        onClick={() => handleFavoriteClick(button.id)}
        style={{
          fontSize: '25px',
          marginLeft: '5px',
          color: button.favorite ? 'yellow' : 'grey',
          cursor: 'pointer',
        }}
      >
        &#9733;
      </span>
    </li>
  );
};

  const renderButtons = () => {
    const filteredButtons = buttons.filter((button) =>
      button.text.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const sortedButtons = [...filteredButtons].sort((a, b) => (b.favorite ? 1 : 0) - (a.favorite ? 1 : 0));
    return <ul id='ul'>{sortedButtons.map((button) => renderButton(button))}</ul>;
  };


  const handleChildClick = (coordinate) => {
    setClickedCoordinate(coordinate)
  };

  const handleLoginSuccess = (response) => {
    sessionStorage.setItem("isLoggedIn", true);
    setIsLoggedIn(true);
    window.location.reload();
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
      <div id='first' style={{ fontFamily: "Lucida Sans" }}>
        <div id='second'>
          {isLoggedIn ? (<>
            <div id='third'>
              <div id='fourth'>
                {currentPage === 'menu' && (
                  <>
                    <AppbarMenu handleLogout={handleLogout} nameTag={nameTag} handleClick={handleClick} currentPage={currentPage} profilePictureUrl={profilePictureUrl} />
                    <div id='button-list'>
                      {/* <ul id='ul'>
                        <li className='li'><button style={{ marginTop: '70px' }} onClick={() => handleClick('page1')}>Bielersee</button></li>
                        <li className='li'><button style={{ marginTop: '10px' }} onClick={() => handleClick('page2')}>Neuenburgersee</button></li>
                        <li className='li'><button style={{ marginTop: '10px' }} onClick={() => handleClick('page3')}>Thunersee</button></li>
                        <li className='li'><button style={{ marginTop: '10px' }} onClick={() => handleClick('page4')}>Brienzersee</button></li>
                      </ul> */}
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '40%', height: '750px' }}>
                        <div style={{ display: 'flex', width: 'inherit', justifyContent: 'center', marginRight: '30px'}}>
                          <input type='text' placeholder='  Wo möchtest du segeln ?' value={searchTerm} onChange={handleSearch} style={{ width: '230px', height: '25px' }} />
                          {searchTerm && (
                            <button onClick={() => setSearchTerm('')} style={{ alignSelf: 'flex-end', marginBottom: '18px', marginLeft: '10px', border: 'none', background: 'transparent', width: '0px' }}>
                              X
                            </button>
                          )}
                        </div>
                        <hr style={{ borderTop: '2px solid lightblue', width: '80%', marginTop: '6%' }} />
                        <div style={{ marginTop: '10px' }}>
                          <div id='list' style={{ height: '100%' }}>{renderButtons()}</div>
                        </div>
                      </div>

                      {/* <AnimatedIcon /> */}
                    </div>
                  </>
                )}
                {currentPage === 'page1' && (
                  <>
                    <Appbar nameTag={nameTag} onClick={handleClick} handleClick={handleClick} currentPage={currentPage} profilePictureUrl={profilePictureUrl} />
                    <Page1 handleLogout={handleLogout} onChildClick={handleChildClick} clickedCoordinate={clickedCoordinate} />
                  </>)}
                {currentPage === 'page2' && (
                  <>
                    <Appbar nameTag={nameTag} onClick={handleClick} handleClick={handleClick} currentPage={currentPage} profilePictureUrl={profilePictureUrl} />
                    <Page2 handleLogout={handleLogout} onChildClick={handleChildClick} clickedCoordinate={clickedCoordinate} />
                  </>)}
                {currentPage === 'page3' && (
                  <>
                    <Appbar nameTag={nameTag} onClick={handleClick} handleClick={handleClick} currentPage={currentPage} profilePictureUrl={profilePictureUrl} />
                    <Page3 handleLogout={handleLogout} onChildClick={handleChildClick} clickedCoordinate={clickedCoordinate} />
                  </>)}
                {currentPage === 'page4' && (
                  <>
                    <Appbar nameTag={nameTag} onClick={handleClick} handleClick={handleClick} currentPage={currentPage} profilePictureUrl={profilePictureUrl} />
                    <Page4 handleLogout={handleLogout} onChildClick={handleChildClick} clickedCoordinate={clickedCoordinate} />
                  </>)}
                {currentPage === 'user' && (
                  <>
                    <Appbar nameTag={nameTag} onClick={handleClick} handleClick={handleClick} currentPage={currentPage} profilePictureUrl={profilePictureUrl} />
                    <User handleLogout={handleLogout} profilePictureUrl={profilePictureUrl} />
                  </>)}
              </div>
            </div><br /><br />
            {currentPage === 'menu' && <footer id='menufooter'><p id='p1'>Copyright © 2023 | Sara Hauser | Benjamin Guggisberg</p><p id='p2'>All rights reserved</p></footer>}
          </>
          ) : (<>
            {Loadinganimation ? (<>
              <div>
                <p style={{
                  textAlign: 'center',
                  marginTop: '40%',
                  fontSize: '250%',
                  fontFamily: 'Lucida Sans'
                }}>Loading ...</p>
                <div>
                  <img
                    src="Sailing_contur.png"
                    alt="Sail"
                    style={{
                      width: '100%',
                      position: 'relative',
                      marginTop: '0%',
                      marginBottom: '50%',
                      animation: 'moveRight 4s linear infinite',
                      zIndex: '0'
                    }}
                  />
                </div>

                <style>
                  {`
        @keyframes moveRight {
          0% {
            left: -10%;
          }
          100% {
            left: 30%;
          }
        }
      `}
                </style>
              </div>
            </>) : (<Login onLoginSuccess={handleLoginSuccess} />)}
          </>
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
