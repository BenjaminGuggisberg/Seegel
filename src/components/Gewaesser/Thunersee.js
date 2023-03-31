import React from 'react';
import { useState } from 'react';
import DataThunersee from 'C:/Users/benjg/Dokumente/React_projekte/G4/Projekt_WebGIS/template/src/components//lake_components/DataThunersee';
import MapComponent from 'C:/Users/benjg/Dokumente/React_projekte/G4/Projekt_WebGIS/template/src/components/MapComponent';
import OLmap from 'C:/Users/benjg/Dokumente/React_projekte/G4/Projekt_WebGIS/template/src/components/OLmap';

function Page3() {
  const center = [2620575.305, 1171579.4879];
  const zoom = 12;
  const [showMap, setShowMap] = useState(true);

  return (
    <div style={{marginTop: '70px'}}>
      <h1>Thunersee</h1>
      <div>
        Hier ist der Inhalt für Thunersee.
      </div><br/>
      <div>
        <button onClick={() => setShowMap(true)}>Map</button>
        <button onClick={() => setShowMap(false)}>Data</button>
      </div>
      <br/><br/>
      {showMap ? <OLmap center={center} zoom={zoom}/> : <DataThunersee />}
      <br/><br/>
    </div>
  );
}

export default Page3;
