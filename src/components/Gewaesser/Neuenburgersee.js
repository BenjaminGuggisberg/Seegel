import React from 'react';
import { useState } from 'react';
import DataNeuenburgersee from 'C:/Users/benjg/Dokumente/React_projekte/G4/Projekt_WebGIS/template/src/components/lake_components/DataNeuenburgersee';
import OLmap from 'C:/Users/benjg/Dokumente/React_projekte/G4/Projekt_WebGIS/template/src/components/OLmap';
import '../css/Footer.css'
import DataWindow from '../lake_components/DataNeuenburgersee'

function Page2(props) {
  const center = [2554874.0445, 1194485.5261];
  const zoom = 11;
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
      <h1>Neuenburgersee</h1>
      <div>
        Hier ist der Inhalt für Neuenburgersee.
      </div><br/>
      <div>
      {showMap ? <OLmap center={center} zoom={zoom} onClick={handleMapClick}/> : <DataNeuenburgersee />}
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

export default Page2;
