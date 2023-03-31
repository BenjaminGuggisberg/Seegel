import React from 'react';
import { useState } from 'react';

function Menu() {

  const [isContentVisible1, setIsContentVisible1] = useState(false);
  const [isContentVisible2, setIsContentVisible2] = useState(false);
  const [isContentVisible3, setIsContentVisible3] = useState(false);

    
  function toggleContent1() {
      setIsContentVisible1(!isContentVisible1);
    }
  function toggleContent2() {
      setIsContentVisible2(!isContentVisible2);
    }
  function toggleContent3() {
      setIsContentVisible3(!isContentVisible3);
    }


  return <>
  <div>
    <button onClick={toggleContent1}>Inhalt {isContentVisible1 ? "verbergen" : "anzeigen"}</button>
    {isContentVisible1 && <p> Hier ist der zu verbergende oder anzuzeigende Content</p>}
  </div><br/><br/>
  <p>============================================</p>
  <div>
    <button onClick={toggleContent2}>Inhalt {isContentVisible2 ? "verbergen" : "anzeigen"}</button>
    {isContentVisible2 && <p> Hier ist der zu verbergende oder anzuzeigende Content</p>}
  </div><br/><br/>
  <p>============================================</p>
  <div>
    <button onClick={toggleContent3}>Inhalt {isContentVisible3 ? "verbergen" : "anzeigen"}</button>
    {isContentVisible3 && <p> Hier ist der zu verbergende oder anzuzeigende Content</p>}
  </div><br/><br/>
  <p>============================================</p>
  


  
  
  </>;
}

export default Menu;

