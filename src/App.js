import React, { useState } from 'react';
import Page1 from './components/Gewaesser/Bielersee';
import Page2 from './components/Gewaesser/Neuenburgersee';
import Page3 from './components/Gewaesser/Thunersee';
import Page4 from './components/Gewaesser/Brienzersee';
import { useEffect } from 'react';
import Appbar from './components/Appbar';
import '../src/components/css/seegel.css'
// import LoginComponent from './components/LoginComponent';

function App() {
  const [nameTag, setNameTag] = useState('');
  const [currentPage, setCurrentPage] = useState('menu');

  const setname = () => {
    if (currentPage === 'page1'){
      setNameTag('Bielersee')
    } else if (currentPage === 'page2'){
      setNameTag('Neuenburgersee')
    } else if (currentPage === 'page3'){
      setNameTag('Thunersee')
    } else if (currentPage === 'page4'){
      setNameTag('Brienzersee')
    } else if (currentPage === 'menu'){
      setNameTag('Hauptmenü')
    }
  };

  useEffect(() => {
    setname();
  }, [currentPage]);

  const handleClick = (page) => {
    setCurrentPage(page);
    console.log('page index: ', page)
  };
  console.log('nameTag: ', nameTag)

  
  return (
  <>
  {/* <div>
    <LoginComponent />
  </div> */}
  <div>
  <Appbar nameTag={nameTag}/>
    <div>
    {currentPage === 'menu' && (
        <div id='list'>
        <ul id='ul'>
          <li className='li'><button style={{marginTop:'70px'}} onClick={() => handleClick('page1')}>Bielersee</button></li>
          <li className='li'><button style={{marginTop: '10px'}} onClick={() => handleClick('page2')}>Neuenburgersee</button></li>
          <li className='li'><button style={{marginTop: '10px'}} onClick={() => handleClick('page3')}>Thunersee</button></li>
          <li className='li'><button style={{marginTop: '10px'}} onClick={() => handleClick('page4')}>Brienzersee</button></li>
        </ul>
        </div>
      )}
      {currentPage === 'page1' && <Page1 onClick={handleClick} />}
      {currentPage === 'page2' && <Page2 onClick={handleClick} />}
      {currentPage === 'page3' && <Page3 onClick={handleClick} />}
      {currentPage === 'page4' && <Page4 onClick={handleClick} />}
      {/* {currentPage === 'user' && <User onClick={handleClick} />} */}
    </div>
  </div><br/><br/>
  {currentPage === 'menu' && <footer id='menufooter'><p id='p1'>Copyright © 2023 | Sara Hauser | Benjamin Guggisberg</p><p id='p2'>All rights reserved</p></footer>}
  </>
  );
  }

export default App;
