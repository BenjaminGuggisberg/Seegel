import React, { useState, useEffect } from "react";
import { LineChart, Line, Area, AreaChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import '../css/data.css'

function DataThunersee() {
  const [waterlevels, setWaterLevels] = useState([]);
  const [showlevel, setShowLevel] = useState(true);

  const winddata_example = [{ 'localtime': '15.00', 'direction': 230, 'speed': 23, 'maxSpeed': 29 },
  { 'localtime': '16.00', 'direction': 233, 'speed': 24, 'maxSpeed': 30 },
  { 'localtime': '17.00', 'direction': 140, 'speed': 27, 'maxSpeed': 34 },
  { 'localtime': '18.00', 'direction': 148, 'speed': 12, 'maxSpeed': 14 },
  { 'localtime': '19.00', 'direction': 139, 'speed': 11, 'maxSpeed': 14 },]

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
          Waterlevel
        </button>
        <button className="wind-button" onClick={WindViewer}>
          Wind Forecast
        </button>
        <div className="swipe"></div>
      </div>

      {showlevel ? (<>
        <div style={{ marginTop: '5%' }}>
          <h2>Water Levels (last 5 hours)</h2>
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

        </div>
      </>
      ) : (<>
        <p>This is an example for the Wind Forecast</p>
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
