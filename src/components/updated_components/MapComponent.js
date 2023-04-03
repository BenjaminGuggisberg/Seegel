import React from 'react';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import OSM from 'ol/source/OSM';
import VectorSource from 'ol/source/Vector';
import { fromLonLat } from 'ol/proj';
import {Map as OlMap} from 'ol';

function MapComponent({center, zoom}) {
  const mapRef = React.useRef();

  React.useEffect(() => {
    if (mapRef.current) {
      new OlMap({
        target: mapRef.current, 
        layers: [
          new TileLayer({
            source: new OSM(),
          }),
          new VectorLayer({
            soruce: new VectorSource(),
          }),
        ],
          view: new View({
            center: fromLonLat(center),
            zoom: zoom
          }),
      });
    }
  }, [center, zoom]);

  return (
    <div ref={mapRef} className="map" style={{width: '90%', height:'500px'}} />
  )
}

export default MapComponent;
