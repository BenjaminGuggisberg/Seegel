import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


function Data2NE() {
    const [waterlevels, setWaterlevels] = useState({});

    const data = [
        { name: '2023-04-19 14:50:00', Grandson: 429.417, 'Neuchâtel, Nid-du-Crô': 429.411 },
        { name: '2023-04-19 15:00:00', Grandson: 429.417, 'Neuchâtel, Nid-du-Crô': 429.411 },
    ];

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch('http://localhost:8000/api/waterlevel/neuenburgersee');
            const jsonData = await response.json();
            setWaterlevels(jsonData);
          } catch (error) {
            console.error(error);
          }
        };
    
        fetchData();
      }, []);

    return (
        <>
            <div>
                <h1>Water Level Data</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Timestamp</th>
                            <th>Station 1</th>
                            <th>Station 2</th>
                            {/* Add more station headers as needed */}
                        </tr>
                    </thead>
                    <tbody>
                        {Object.entries(waterlevels).map(([timestamp, levels]) => (
                            <tr key={timestamp}>
                                <td>{timestamp}</td>
                                {Object.entries(levels).map(([station, value]) => (
                                    <td key={station}>{value}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div><br/><br/>
            <p>Sample Data for this DataFormat:</p>
            <div style={{ display: 'flex', justifyContent: 'left', marginBottom:0}}>
                <ResponsiveContainer width='80%' height={300}>
                <LineChart
                    width={800}
                    height={500}
                    data={data}
                    margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
                >
                    <XAxis dataKey="name" />
                    <YAxis domain={[429.4, 429.43]}/>
                    <CartesianGrid stroke="#f5f5f5" />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="Grandson" stroke="#8884d8" />
                    <Line type="monotone" dataKey="Neuchâtel, Nid-du-Crô" stroke="#82ca9d" />
                </LineChart>
                </ResponsiveContainer>
            </div>
            <br/><br/>
            <p>Real API Data:</p>
            <div style={{ display: 'flex', justifyContent: 'left', marginBottom:0}}>
                <ResponsiveContainer width='80%' height={300}>
                <LineChart
                    width={800}
                    height={500}
                    data={waterlevels}
                    margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
                >
                    <XAxis dataKey="level_datetime" />
                    <YAxis domain={[429.4, 429.43]}/>
                    <CartesianGrid stroke="#f5f5f5" />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="Grandson" stroke="#8884d8" />
                    <Line type="monotone" dataKey="Neuchâtel, Nid-du-Crô" stroke="#82ca9d" />
                </LineChart>
                </ResponsiveContainer>
            </div>

        </>
    );
}

export default Data2NE;
