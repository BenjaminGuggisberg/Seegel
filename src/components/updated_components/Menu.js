import React, { useState } from 'react';
import Page1 from '../Gewaesser/Bielersee';
import Page2 from '../Gewaesser/Neuenburgersee';
import Page3 from '../Gewaesser/Thunersee';
import Page4 from '../Gewaesser/Brienzersee';
// import User from './User';

function Menu(props) {
  const [currentPage, setCurrentPage] = useState('menu');

  const handleClick = (page) => {
    setCurrentPage(page);
    console.log(page)
  };

  return (
    <div>
      {currentPage === 'menu' && (
        <div>
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
      {currentPage !== 'menu' && (<>
          <button onClick={() => handleClick('menu')}>Zurück zum Menü</button><br/><br/><br/>
      </>
      )}
    </div>
  );
}

export default Menu;
