import React from 'react';
import { useState } from 'react';
import DataThunersee from 'C:/Users/benjg/Dokumente/React_projekte/G4/Projekt_WebGIS/template/src/components//lake_components/DataThunersee';
import OLmap from 'C:/Users/benjg/Dokumente/React_projekte/G4/Projekt_WebGIS/template/src/components/OLmap';
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

  const MapViewer = () => {
    setShowMap(true)
  }
  const DataViewer = () => {
    setShowMap(false)
    setShowDataWindow(false)
  }

  return (
    <div style={{ marginTop: '70px' }}>
      <h1>Thunersee</h1>
      <div>
        Hier ist der Inhalt für Thunersee.
      </div><br />
      <div>
        {showMap ? <OLmap center={center} zoom={zoom} onClick={handleMapClick} /> : <DataThunersee />}
        {showDataWindow ? (
          <DataWindow onClose={handleCloseDataWindow} />
        ) : (
          null
        )}
      </div>
      <br /><br />
      <footer>
        <button type="footer" onClick={MapViewer}>Map</button>
        <button type="footer" onClick={DataViewer}>Data</button>
        <button type="footer" onClick={() => props.onClick('menu')}>Main Menu</button>
      </footer>
      <br /><br />
    </div>
  );
}

export default Page3;
