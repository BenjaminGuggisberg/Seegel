import React, { useState } from 'react';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import Layer from 'react-openlayers/Layer';
import LayerGroup from 'react-openlayers/LayerGroup';
import TileWMS from 'ol/source/TileWMS';
import ImageWMS from 'ol/source/ImageWMS';

const MyMap = () => {
  const [layers, setLayers] = useState([
    {
      id: 'layer1',
      name: 'Background',
      visible: true,
      opacity: 1,
      source: new TileLayer({
        source: new TileWMS({
            url: 'https://wms.geo.admin.ch/',
            crossOrigin: 'anonymous',
            projection: 'EPSG:2056',
            params: {
                'LAYERS': 'ch.swisstopo.pixelkarte-farbe',
                'FORMAT': 'image/jpeg'
            },
        })
    })},
    {
      id: 'layer2',
      name: 'Bielersee Bathimetrie',
      visible: true,
      opacity: 0.5,
      source: new TileLayer({
        source: new ImageWMS({
            url: 'http://localhost:8080/geoserver/wms',
            crossOrigin: 'anonymous',
            projection: 'EPSG:2056',
            params: {
              'LAYERS': 'sail:bielersee_border', 
              'FORMAT': 'image/jpeg'
            }
          })
      }),
    },
  ]);

  const handleLayerToggle = (id) => {
    setLayers((prevLayers) =>
      prevLayers.map((layer) =>
        layer.id === id ? { ...layer, visible: !layer.visible } : layer
      )
    );
  };

  return (
    <Map>
      <View center={[0, 0]} zoom={2} />
      <LayerGroup>
        {layers.map((layer) => (
          <Layer
            key={layer.id}
            visible={layer.visible}
            opacity={layer.opacity}
            source={layer.source}
          />
        ))}
      </LayerGroup>
      <div>
        {layers.map((layer) => (
          <div key={layer.id}>
            <label>
              <input
                type="checkbox"
                checked={layer.visible}
                onChange={() => handleLayerToggle(layer.id)}
              />
              {layer.name}
            </label>
          </div>
        ))}
      </div>
    </Map>
  );
};

export default MyMap;
