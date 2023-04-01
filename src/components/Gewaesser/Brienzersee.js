import React from 'react';
import { useState } from 'react';
import DataBrienzersee from '../lake_components/DataBrienzersee';
import MapComponent from '../MapComponent';
import OLmap from '../OLmap';


function Page4() {
  const center = [2640648.9647, 1175226.5319];
  const zoom =13;
  const [showMap, setShowMap] = useState(true);

  return (
    <div style={{marginTop: '70px'}}>
      <h1>Brienzersee</h1>
      <div>
        Hier ist der Inhalt für Brienzersee.
      </div><br/>
      <div>
        <button onClick={() => setShowMap(true)}>Map</button>
        <button onClick={() => setShowMap(false)}>Data</button>
      </div>
      <br/><br/>
      {showMap ? <OLmap center={center} zoom={zoom}/> : <DataBrienzersee />}
      <br/><br/>
    </div>
  );
}

export default Page4;
