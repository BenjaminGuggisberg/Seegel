import React, { useState } from 'react';
import Page1 from './components/Gewaesser/Bielersee';
import Page2 from './components/Gewaesser/Neuenburgersee';
import Page3 from './components/Gewaesser/Thunersee';
import Page4 from './components/Gewaesser/Brienzersee';
import User from './components/User';
import { useEffect } from 'react';
import Appbar from './components/Appbar';
import '../src/components/css/seegel.css'
import Login from './components/Login';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [currentPage, setCurrentPage] = useState('menu');
  const [nameTag, setNameTag] = useState('Boat Adventure');

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  const UsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleClick = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    const isLoggedInLocalStorage = localStorage.getItem('isLoggedIn');
    if (isLoggedInLocalStorage === 'true') {
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      localStorage.setItem('isLoggedIn', 'true');
    } else {
      localStorage.removeItem('isLoggedIn');
    }
  }, [isLoggedIn]);

  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/">
            <div>
              {isLoggedIn ? (
                <div>
                  <Appbar nameTag={nameTag} username={username} />
                  <div>
                    {currentPage === 'menu' && (
                      <div id="list">
                        <ul id="ul">
                          <li className="li">
                            <button
                              style={{ marginTop: '70px' }}
                              onClick={() => handleClick('page1')}
                            >
                              Bielersee
                            </button>
                          </li>
                          <li className="li">
                            <button
                              style={{ marginTop: '10px' }}
                              onClick={() => handleClick('page2')}
                            >
                              Neuenburgersee
                            </button>
                          </li>
                          <li className="li">
                            <button
                              style={{ marginTop: '10px' }}
                              onClick={() => handleClick('page3')}
                            >
                              Thunersee
                            </button>
                          </li>
                          <li className="li">
                            <button
                              style={{ marginTop: '10px' }}
                              onClick={() => handleClick('page4')}
                            >
                              Brienzersee
                            </button>
                          </li>
                        </ul>
                      </div>
                    )}
                    {currentPage === 'page1' && <Page1 onClick={handleClick} />}
                    {currentPage === 'page2' && <Page2 onClick={handleClick} />}
                    {currentPage === 'page3' && <Page3 onClick={handleClick} />}
                    {currentPage === 'page4' && <Page4 onClick={handleClick} />}
                  </div>
                </div>
              ) : (
                <Login onLoginSuccess={handleLoginSuccess} onUsername={UsernameChange} />
              )}
            </div>
          </Route>
          <Route exact path="/user">
            {isLoggedIn ? (
              <User username={username} />
            ) : (
              <Login onLoginSuccess={handleLoginSuccess} onUsername={UsernameChange} />
            )}
          </Route>
        </Switch>
      </Router>
      </>);
}

export default App;
