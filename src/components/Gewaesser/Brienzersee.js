import React from 'react';
import { useState } from 'react';
import DataBrienzersee from 'C:/Users/benjg/Dokumente/React_projekte/G4/Projekt_WebGIS/template/src/components/lake_components/DataBrienzersee';
import OLmap from 'C:/Users/benjg/Dokumente/React_projekte/G4/Projekt_WebGIS/template/src/components/OLmap';
import '../css/Footer.css'
import DataWindow from '../lake_components/datawindow_brienzersee';

function Page4(props) {
  const center = [2640648.9647, 1175226.5319];
  const zoom = 13;
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
      <h1>Brienzersee</h1>
      <div>
        Hier ist der Inhalt für Brienzersee.
      </div><br />
      <div>
        {showMap ? <OLmap center={center} zoom={zoom} onClick={handleMapClick} /> : <DataBrienzersee />}
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

export default Page4;
