import React from 'react';
import { useState, useEffect } from 'react';
// import MapComponent from 'C:/Users/benjg/Dokumente/React_projekte/G4/Projekt_WebGIS/template/src/components/MapComponent';
import DataBrienzersee from '../lake_components/DataBrienzersee';
// import OLmap from 'C:/Users/benjg/Dokumente/React_projekte/G4/Projekt_WebGIS/template/src/components/OLmap';
import '../css/Footer.css';
import DataWindow from '../lake_components/datawindow_bielersee';
import OLmap from '../OLmap';


function Page4(props) {
  const center = [2640648.9647, 1175226.5319];
  const zoom = 12;
  const layer = 'messstationen_BO';
  const component01 = '';
  const component02 = '';
  const url = './bathimetry_tif/zusammengefuehrt_brienzersee.tif';
  const [showMap, setShowMap] = useState(true);
  const [showDataWindow, setShowDataWindow] = useState(false);

  const MapViewer = () => {
    setShowMap(true)
  }
  const DataViewer = () => {
    setShowMap(false)
    setShowDataWindow(false)
  }

  const [leveldata, setLevelData] = useState([]);
  const [actuallevel, setActualLevel] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/waterlevel/brienzersee');
        const jsonData = await response.json();
        setLevelData(jsonData);
        const values = Object.values(jsonData[0]).filter((v) => typeof v === 'number');
        const average = values.reduce((sum, v) => sum + v, 0) / values.length;
        setActualLevel(average.toFixed(3));
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  

  return (<>
    <div style={{ marginTop: '42%' }}>
    </div>
    {/* <OLmap id='map' className='map' center={center} zoom={zoom} onClick={handleMapClick}> */}
    {showMap ? <OLmap id='map' className='map' center={center} zoom={zoom} layer={layer} component01={component01} component02={component02} url={url} onChildClick={props.onChildClick} actuallevel={actuallevel}/> : <DataBrienzersee />}
    {/* </OLmap> */}
    {/* {showMap && (<><div style={{ marginTop: '10%', textAlign: 'center' }}>
          <h4>Further Information</h4>
          <p>lorem ipsum</p>
        </div></>)} */}
    <br /><br />
    <footer>
      <button type="footer" onClick={MapViewer}>Map</button>
      <button type="footer" onClick={DataViewer}>Data</button>
    </footer>
    <br /><br />
    {/* <div style={{ marginBottom: '25%', textAlign: 'center' }}>
      {leveldata.length > 0 && (
        <div>
          {actuallevel !== null && (
            <div>
              <p style={{fontSize: 'smaller'}}>Longitude: {props.clickedCoordinate? (props.clickedCoordinate[0]):(null)}</p>
              <p style={{fontSize: 'smaller'}}>Latitude: {props.clickedCoordinate? (props.clickedCoordinate[1]):(null)}</p>
              <p>Aktueller Wasserstand: {actuallevel} m.ü.M</p>
            </div>
          )}
        </div>
      )}
    </div> */}
  </>
  );
}

export default Page4;

