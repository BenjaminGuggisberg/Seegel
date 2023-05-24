import React from 'react';
import '../css/datawindow.css';

function DataWindow(props) {
  const closeButtonStyle = {
    position: 'absolute',
    top: '5px',
    right: '5px',
    cursor: 'pointer',
    border: 'none',
    background: 'none',
    fontWeight: 'bold',
    color: 'black',
  };

  return (
    <div className='datawindow' style={{width: '80%'}}>
      <h2>Data Window</h2>
      <p>This is the data window content.</p>
      <button onClick={props.onClose} style={closeButtonStyle}>X</button>
    </div>
  );
}

export default DataWindow;
