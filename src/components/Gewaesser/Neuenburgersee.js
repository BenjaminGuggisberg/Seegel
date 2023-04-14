import React from 'react';
import { useState } from 'react';
import DataNeuenburgersee from 'C:/Users/benjg/Dokumente/React_projekte/G4/Projekt_WebGIS/template/src/components/lake_components/DataNeuenburgersee';
import OLmap from 'C:/Users/benjg/Dokumente/React_projekte/G4/Projekt_WebGIS/template/src/components/OLmap';
import '../css/Footer.css'
import DataWindow from '../lake_components/datawindow_neuenb'

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

  const MapViewer = () => {
    setShowMap(true)
  }
  const DataViewer = () => {
    setShowMap(false)
    setShowDataWindow(false)
  }

  return (
    <div style={{ marginTop: '70px' }}>
      <h1>Neuenburgersee</h1>
      <div>
        Hier ist der Inhalt für Neuenburgersee.
      </div><br />
      <div>
        {showMap ? <OLmap center={center} zoom={zoom} onClick={handleMapClick} /> : <DataNeuenburgersee />}
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

export default Page2;
