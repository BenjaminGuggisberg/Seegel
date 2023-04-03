import React, { Component } from 'react';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import { Projection } from 'ol/proj';
import TileWMS  from 'ol/source/TileWMS';

class OLmap extends Component {
  componentDidMount() {
    const { center, zoom } = this.props;
    const mapContainer = document.getElementById('map');
    mapContainer.style.width = '80%';
    mapContainer.style.margin = 'auto';
    mapContainer.style.height = '350px';


    var swisstopoWMTSLayer = 'ch.swisstopo.pixelkarte-farbe';
    // ch.swisstopo.images-swissimage

    // var extent = [2420000, 130000, 2900000, 1350000];
    var wmtsLayer = new TileLayer({
      // extent: extent,
      source: new TileWMS({
    	  url: 'https://wms.geo.admin.ch/',
    	  crossOrigin: 'anonymous',
    	  projection: 'EPSG:2056',
    	  params: {
    		  'LAYERS': swisstopoWMTSLayer,
    		  'FORMAT': 'image/jpeg'
    	  },
      })
    });	

    const map = new Map({
      target: 'map',
      layers: [
        wmtsLayer
      ],
      view: new View({
        center: center,
    		zoom: zoom,
    		projection: new Projection({
    			code: 'EPSG:2056',
    			units: 'm'
    		})
      })
    }); 

    map.on('click', this.props.onClick);
  }

  render() {
    return (
      <div id="map"></div>)}
};

export default OLmap;
