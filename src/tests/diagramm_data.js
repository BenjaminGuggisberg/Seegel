import React, { useState, useEffect } from 'react';

function diagramm_data() {
  const [data, setData] = useState([
    { timestamp: '2022-04-15T12:00:00Z', value: 5.2 },
    { timestamp: '2022-04-16T12:00:00Z', value: 5.3 },
    { timestamp: '2022-04-17T12:00:00Z', value: 5.5 },
    { timestamp: '2022-04-18T12:00:00Z', value: 5.7 },
    { timestamp: '2022-04-19T12:00:00Z', value: 5.6 },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      // Generate a random value between 5.0 and 6.0
      const newValue = (Math.random() * 1 + 5).toFixed(1);
      const newTimestamp = new Date().toISOString();
      setData(prevData => {
        if (prevData.length >= 5) {
          prevData.shift();
        }
        return [...prevData, { timestamp: newTimestamp, value: Number(newValue) }];
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  function x(i) {
    return i * 60 + 70;
  }

  function y(value) {
    return 180 - value * 20;
  }

  const xAxis = [0, 1, 2, 3, 4];
  const yAxis = [5.0, 5.5, 6.0];

  return (
    <div>
      <h2>Water Level Diagram</h2>
      <svg width="500" height="250">
        <g>
          {xAxis.map((value, i) => (
            <g key={i} transform={`translate(${x(i)}, 200)`}>
              <line y2="6" stroke="black" />
              <text y="20" textAnchor="middle">{data[i]?.timestamp.substring(5, 10)}</text>
            </g>
          ))}
          <text x="250" y="240" textAnchor="middle">Time (Month-Day)</text>
        </g>
        <g>
          {yAxis.map((value, i) => (
            <g key={i} transform={`translate(50, ${y(value)})`}>
              <line x2="420" stroke="black" />
              <text x="-30" y="-10" textAnchor="end">{value}</text>
            </g>
          ))}
          <text x="10" y="110" textAnchor="middle" transform="rotate(-90, 10, 110)">Water Level</text>
        </g>
        <path d={`M${x(0)},${y(data[0]?.value || 0)}${data.map((d, i) => `L${x(i)},${y(d.value)}`).join('')}`} stroke="blue" fill="none" />
      </svg>
    </div>
  );
}

export default diagramm_data;
