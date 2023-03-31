import React from 'react';
import { useState } from 'react';
import MapComponent from 'C:/Users/benjg/Dokumente/React_projekte/G4/Projekt_WebGIS/template/src/components/MapComponent';
import DataBielersee from 'C:/Users/benjg/Dokumente/React_projekte/G4/Projekt_WebGIS/template/src/components/lake_components/DataBielersee';
import OLmap from 'C:/Users/benjg/Dokumente/React_projekte/G4/Projekt_WebGIS/template/src/components/OLmap';

function Page1() {
  const center = [2579487.0988, 1214651.8038];
  const zoom = 12
  const [showMap, setShowMap] = useState(true);

  return (<>
    <div style={{marginTop: '70px'}}>
      <h1>Bielersee</h1>
      <div>
        Hier ist der Inhalt für Bielersee.
      </div><br/><br/>
    </div>
    <div>
        <button onClick={() => setShowMap(true)}>Map</button>
        <button onClick={() => setShowMap(false)}>Data</button>
      </div>
      <br/><br/>
      {showMap ? <OLmap center={center} zoom={zoom}/> : <DataBielersee />}
      <br/><br/>
      </>
  );
}

export default Page1;

