import React, { useState, useEffect, useRef } from 'react';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import XYZ from 'ol/source/XYZ';

const OpenLayersMap = () => {
  const mapRef = useRef(null);

  const [layers, setLayers] = useState([
    { name: 'OpenStreetMap', layer: new TileLayer({ source: new OSM() }) },
    { name: 'Satellite', layer: new TileLayer({ source: new XYZ({ url: 'https://example.com/satellite/{z}/{x}/{y}.jpg' }) }) }
  ]);
  const [activeLayer, setActiveLayer] = useState(layers[0].layer);

  useEffect(() => {
    const map = new Map({
      target: mapRef.current,
      layers: layers.map(l => l.layer),
      view: new View({
        center: [0, 0],
        zoom: 2
      })
    });
    setActiveLayer(layers[0].layer);

    return () => {
      map.setTarget(null);
    };
  }, []);

  const handleLayerSelect = (layer) => {
    setActiveLayer(layer.layer);
  };

  return (
    <div>
      <div ref={mapRef} className="map-container" />
      <div className="layer-menu">
        <ul>
          {layers.map((layer, index) => (
            <li key={index} className={activeLayer === layer.layer ? 'active' : ''} onClick={() => handleLayerSelect(layer)}>
              {layer.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default OpenLayersMap;
