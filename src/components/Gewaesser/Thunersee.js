import React from 'react';
import { useState, useEffect } from 'react';
import DataThunersee from '../lake_components/DataThunersee';
import OLmap from '../OLmap';
import '../css/Footer.css';
import DataWindow from '../lake_components/datawindow_thunersee';

function Page3(props) {
  const center = [2620575.305, 1171579.4879];
  const zoom = 11;
  const layer = 'messstationen_BO';
  const component01 = ''; // Add Layer 1
  const component02 = ''; // Add Layer 2
  const url = './bathimetry_tif/zusammengefuehrt_thunersee.tif';
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

  const [leveldata, setLevelData] = useState([]);
  const [actuallevel, setActualLevel] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/waterlevel/thunersee');
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
    <div className='map-container' > {/* style={{height: showDataWindow ? 'calc(100vh - 300px)' : 'calc(100vh - 50px)'}} */}
      {showMap ? <OLmap id='map' className='map' center={center} zoom={zoom} layer={layer} component01={component01} component02={component02} url={url} onChildClick={props.onChildClick} actuallevel={actuallevel}/> : <DataThunersee />}
      {showDataWindow ? (<>
        <DataWindow onClose={handleCloseDataWindow} /></>
      ) : (
        null
      )}
      {/* {showMap && (<><div style={{ marginTop: '10%', textAlign: 'center' }}>
          <h4>Further Information</h4>
          <p>lorem ipsum</p>
        </div></>)} */}
    </div>
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
              <p>Aktueller Wasserstand: {actuallevel} m.ü.M</p>
            </div>
          )}
        </div>
      )}
    </div> */}
  </>
  );
}

export default Page3;
