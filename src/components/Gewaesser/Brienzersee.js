import React from 'react';
import { useState, useEffect } from 'react';
// import MapComponent from 'C:/Users/benjg/Dokumente/React_projekte/G4/Projekt_WebGIS/template/src/components/MapComponent';
import DataBrienzersee from '../lake_components/DataBrienzersee'
// import OLmap from 'C:/Users/benjg/Dokumente/React_projekte/G4/Projekt_WebGIS/template/src/components/OLmap';
import '../css/Footer.css'
import DataWindow from '../lake_components/datawindow_bielersee';
import OLmap from '../OLmap';


function Page4(props) {
  const center = [2640648.9647, 1175226.5319];
  const zoom = 12;
  const layer = 'messstationen_bo';
  const prognose = 'prognose_bo';
  const component01 = '';
  const component02 = '';
  const url = './bathimetry_tif/zusammengefuehrt_brienzersee.tif';
  const [showMap, setShowMap] = useState(true);
  const [showDataWindow, setShowDataWindow] = useState(false);
  const [InfosVisible, setInfosVisible] = useState(false);
  const [buttonname, setButtonName] = useState('Gefahrenstufen einblenden')

  const showInformations = () => {
    setInfosVisible(!InfosVisible);
    setButtonName(InfosVisible ? 'Gefahrenstufen einblenden' : 'Gefahrenstufen ausblenden');
  }

  useEffect(() => {
    // Scroll the top div into view when showMap is true
    if (showMap) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    if (InfosVisible) {
      window.scrollTo({ top: 500, behavior: 'smooth' });
    }
  }, [showMap, InfosVisible]);

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

  const dangerLevels = [
    { level: 'Gefahrenstufe 1', min: 0, max: 564.65, color: 'yellow' },
    { level: 'Gefahrenstufe 2', min: 564.65, max: 564.95, color: 'orange' },
    { level: 'Gefahrenstufe 3', min: 564.95, max: 565.3, color: 'darkorange' },
    { level: 'Gefahrenstufe 4', min: 565.3, max: 565.55, color: 'tomato' },
    { level: 'Gefahrenstufe 5', min: 565.55, max: Infinity, color: 'red' },
  ];

  const getDangerLevel = (waterLevel) => {
    for (const dangerLevel of dangerLevels) {
      if (waterLevel >= dangerLevel.min && waterLevel <= dangerLevel.max) {
        return dangerLevel.level;
      }
    }
    return -1; // Return -1 if no matching danger level is found
  };

  const renderTableRows = () => {
    return dangerLevels.map((dangerLevel) => {
      const { level, min, max, color } = dangerLevel;
      const isCurrentLevel = actuallevel >= min && actuallevel <= max;
  
      const rowStyle = {
        backgroundColor: isCurrentLevel ? color : 'transparent',
        border: '1px solid lightblue'
      };
      const cellStyle = {
        border: '1px solid lightblue', 
        padding: '5px', 
      };
  
      return (
        <tr key={level} style={rowStyle}>
          <td style={cellStyle}>{level}</td>
          <td style={cellStyle}>{min} - {max !== Infinity ? max : ">"}</td>
        </tr>
      );
    });
  };
  
  

  return (<>
    <div style={{ marginTop: '42%' }}>
    </div>
    {/* <OLmap id='map' className='map' center={center} zoom={zoom} onClick={handleMapClick}> */}
    {showMap ? <OLmap id='map' className='map' center={center} zoom={zoom} layer={layer} prognose={prognose} component01={component01} component02={component02} url={url} onChildClick={props.onChildClick} actuallevel={actuallevel}/> : <DataBrienzersee renderTableRows={renderTableRows} showMap={showMap} />}
    <div style={{textAlign: 'center'}}>
    <br/>
    {showMap ? (<>
        <hr style={{ borderTop: '2px solid lightblue', width: '80%', marginTop: '6%' }} />
          <button style={{ marginTop: '10%', padding: '10px', background: 'transparent', color: 'black', border: 'none', borderBottom: '2px solid lightblue', fontSize: '16px', cursor: 'pointer', transition: 'all 0.3s ease-in-out', position:'realtive', fontFamily: 'Lucida Sans' }} onClick={() => showInformations()}>{buttonname}</button>
          <br/><br/><br/>
          {InfosVisible && (<>
            <table style={{ margin: '0 auto', border: '1px solid lightblue', fontFamily: 'Lucida Sans', fontSize: 'smaller' }}>
              <thead>
                <tr>
                  <th>Gefahrenstufe</th>
                  <th>Wasserstand (m ü.M)</th>
                </tr>
              </thead>
              <tbody>{renderTableRows()}</tbody>
            </table>
      </>)}
      </>):(
        null
      )}
      </div>
    {/* </OLmap> */}
    {/* {showMap && (<><div style={{ marginTop: '10%', textAlign: 'center' }}>
          <h4>Further Information</h4>
          <p>lorem ipsum</p>
        </div></>)} */}
    <br /><br />
    <footer>
      <button type="footer" onClick={MapViewer}>Karte</button>
      <button type="footer" onClick={DataViewer}>Daten</button>
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

