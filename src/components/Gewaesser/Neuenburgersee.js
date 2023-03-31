import React from 'react';
import { useState } from 'react';
import DataNeuenburgersee from 'C:/Users/benjg/Dokumente/React_projekte/G4/Projekt_WebGIS/template/src/components/lake_components/DataNeuenburgersee';
import MapComponent from 'C:/Users/benjg/Dokumente/React_projekte/G4/Projekt_WebGIS/template/src/components/MapComponent';
import OLmap from 'C:/Users/benjg/Dokumente/React_projekte/G4/Projekt_WebGIS/template/src/components/OLmap';

function Page2() {
  const center = [2554874.0445, 1194485.5261];
  const zoom = 11;
  const [showMap, setShowMap] = useState(true);

  return (
    <div style={{marginTop: '70px'}}>
      <h1>Neuenburgersee</h1>
      <div>
        Hier ist der Inhalt für Neuenburgersee.
      </div><br/>
      <div>
        <button onClick={() => setShowMap(true)}>Map</button>
        <button onClick={() => setShowMap(false)}>Data</button>
      </div>
      <br/><br/>
      {showMap ? <OLmap center={center} zoom={zoom}/> : <DataNeuenburgersee />}
      <br/><br/>

    </div>
  );
}

export default Page2;
