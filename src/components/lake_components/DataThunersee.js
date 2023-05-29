import React, { useState, useEffect } from "react";
import { LineChart, Line, Area, AreaChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import '../css/data.css'

function DataThunersee(props) {
  const [waterlevels, setWaterLevels] = useState([]);
  const [showlevel, setShowLevel] = useState(true);
  const [InfosVisible, setInfosVisible] = useState(false);
  const [buttonname, setButtonName] = useState('Gefahrenstufen einblenden')

  const winddata_example = [{ 'localtime': '15.00', 'direction': 230, 'speed': 23, 'maxSpeed': 29 },
  { 'localtime': '16.00', 'direction': 233, 'speed': 24, 'maxSpeed': 30 },
  { 'localtime': '17.00', 'direction': 140, 'speed': 27, 'maxSpeed': 34 },
  { 'localtime': '18.00', 'direction': 148, 'speed': 12, 'maxSpeed': 14 },
  { 'localtime': '19.00', 'direction': 139, 'speed': 11, 'maxSpeed': 14 },]

  const showInformations = () => {
    setInfosVisible(!InfosVisible);
    setButtonName(InfosVisible ? 'Gefahrenstufen einblenden' : 'Gefahrenstufen ausblenden');
  }

  useEffect(() => {
    if (!props.showMap) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    if (InfosVisible) {
      window.scrollTo({ top: 500, behavior: 'smooth' });
    }
    
  }, [props.showMap, InfosVisible]);

  const LevelViewer = () => {
    setShowLevel(true)
  }
  const WindViewer = () => {
    setShowLevel(false)
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/waterlevel/thunersee');
        const jsonData = await response.json();
        setWaterLevels(jsonData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);


  return (
    <div style={{ marginTop: '3%' }}>
      <div className="button-container">
        <button className="waterlevel-button" onClick={LevelViewer}>
          Wasserpegel
        </button>
        <button className="wind-button" onClick={WindViewer}>
          Weitere Daten
        </button>
        <div className="swipe"></div>
      </div>

      {showlevel ? (<>
        <div style={{ marginTop: '5%', textAlign: 'center'}}>
          <h2>Wasserpegel (letzte 10 Einträge)</h2>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 0 }}>
            <ResponsiveContainer width='80%' height={300}>
              <LineChart
                width={800}
                height={500}
                data={waterlevels.slice(Math.max(waterlevels.length - 10, 0)).reverse()}
                margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
              >
                <XAxis dataKey="level_datetime" />
                <YAxis domain={[557.675, 557.69]} fontFamily="Lucida Sans" fontSize={11}/>
                <CartesianGrid stroke="#f5f5f5" />
                <Tooltip formatter={(value, name, props) => {
                  return [`${props.payload.timestamp} | ${value}`];
                }} />
                <Legend />
                <Line type="monotone" dataKey="Spiez" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <br/>
          <hr style={{ borderTop: '2px solid lightblue', width: '80%', marginTop: '6%' }} />
          <div style={{textAlign: 'center'}}>
            <button style={{ marginTop: '10%', padding: '10px', background: 'transparent', color: 'black', border: 'none', borderBottom: '2px solid lightblue', fontSize: '16px', cursor: 'pointer', transition: 'all 0.3s ease-in-out', position:'realtive', fontFamily: 'Lucida Sans' }} onClick={() => showInformations()}>{buttonname}</button>
          </div>
          <br/><br/><br/>
          {InfosVisible && (<>
            <table style={{ margin: '0 auto', border: '1px solid lightblue', fontFamily: 'Lucida Sans', fontSize: 'smaller' }}>
              <thead>
                <tr>
                  <th>Gefahrenstufe</th>
                  <th>Wasserstand (m ü.M)</th>
                </tr>
              </thead>
              <tbody>{props.renderTableRows()}</tbody>
            </table>
            </>)}
        </div>
      </>
      ) : (<>
        <div style={{textAlign: 'center'}}>
          <p>Weitere Daten: Beispiel Wind-Chart</p>
        </div>
        <ResponsiveContainer width='80%' height={300}>
          <AreaChart 
            width={730} 
            height={250} 
            data={winddata_example.slice(Math.max(winddata_example.length - 4, 0))}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="localtime" />
            <YAxis />
            <CartesianGrid stroke="#f5f5f5" />
            <Tooltip />
            <Area type="monotone" dataKey="maxSpeed" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
            <Area type="monotone" dataKey="speed" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
          </AreaChart>
      </ResponsiveContainer>
    </>
  )
}

    </div >
  );
}

export default DataThunersee;
