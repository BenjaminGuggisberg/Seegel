import React from 'react';
import { useState } from 'react';
import DataThunersee from '../lake_components/DataThunersee';
import OLmap from '../OLmap';
import '../css/Footer.css'
import DataWindow from '../lake_components/datawindow_thunersee'

function Page3(props) {
  const center = [2620575.305, 1171579.4879];
  const zoom = 12;
  const [showMap, setShowMap] = useState(true);
  const [showDataWindow, setShowDataWindow] = useState(false);

  const handleMapClick = () => {
    setShowDataWindow(true);
    console.log(showDataWindow)
    // console.log(showDataWindow)
  };

  const handleCloseDataWindow = () => {
    setShowDataWindow(false);
  };

  return (
    <div style={{marginTop: '70px'}}>
      <h1>Thunersee</h1>
      <div>
        Hier ist der Inhalt für Thunersee.
      </div><br/>
      <div>
      {showMap ? <OLmap center={center} zoom={zoom} onClick={handleMapClick}/> : <DataThunersee />}
    {showDataWindow ? (
      <DataWindow onClose={handleCloseDataWindow} />
    ) : (
      null
    )}
      </div>
      <br/><br/>
      <footer>
        <button onClick={() => setShowMap(true)}>Map</button>
        <button onClick={() => setShowMap(false)}>Data</button>
        <button onClick={() => props.onClick('menu')}>See</button>
      </footer>
      <br/><br/>
    </div>
  );
}

export default Page3;
