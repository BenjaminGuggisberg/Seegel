import React from 'react';
import { useState, useRef, useEffect } from 'react';
// import MapComponent from 'C:/Users/benjg/Dokumente/React_projekte/G4/Projekt_WebGIS/template/src/components/MapComponent';
import DataBielersee from 'C:/Users/benjg/Dokumente/React_projekte/G4/Projekt_WebGIS/template/src/components/lake_components/DataBielersee';
import OLmap from 'C:/Users/benjg/Dokumente/React_projekte/G4/Projekt_WebGIS/template/src/components/OLmap';
import '../css/Footer.css'
import DataWindow from '../lake_components/datawindow_bielersee';

function Page1(props) {
  const center = [2579487.0988, 1214651.8038];
  const zoom = 12
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


  return (<>
    <div style={{marginTop: '70px'}}> 
      <h1>Bielersee</h1>
      <div>
        Hier ist der Inhalt für Bielersee.
      </div><br/><br/>
    </div>
    <div className='map-container' > {/* style={{height: showDataWindow ? 'calc(100vh - 300px)' : 'calc(100vh - 50px)'}} */}
    {showMap ? <OLmap className='map' center={center} zoom={zoom} onClick={handleMapClick}/> : <DataBielersee />}
    {showDataWindow ? (<>
      <DataWindow onClose={handleCloseDataWindow} /></>
    ) : (
      null
    )}
    </div>
    <br/><br/>    
    <footer>
      <button type="footer" onClick={MapViewer}>Map</button>
      <button type="footer" onClick={DataViewer}>Data</button>
      <button type="footer" onClick={() => props.onClick('menu')}>Main Menu</button>
    </footer>
      </>
  );
}

export default Page1;

