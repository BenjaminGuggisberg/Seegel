import { Component, useEffect, useState } from 'react';
import { Map, View } from 'ol';
import ImageLayer from 'ol/layer/Image';
import { Projection } from 'ol/proj';
import ImageWMS from 'ol/source/ImageWMS';
import TileLayer from 'ol/layer/Tile';
import TileWMS from 'ol/source/TileWMS';
import GeoJSON from 'ol/format/GeoJSON';


class BielerseeMap extends Component {
  componentDidMount() {
    const { center, zoom, layer } = this.props;
    const mapContainer = document.getElementById('map');
    mapContainer.style.width = '85%';
    mapContainer.style.margin = 'auto';
    mapContainer.style.height = '400px';

    // var bielerseeWMS = 'sail:bielersee_border';
    var bielerseefilledWMS = 'sail:differenz_bielersee';

    var bielersee = new ImageLayer({
      source: new ImageWMS({
        url: 'http://localhost:8080/geoserver/wms',
        crossOrigin: 'anonymous',
        projection: 'EPSG:2056',
        params: {
          'LAYERS': layer,
          'FORMAT': 'image/png'
        }
      })
    });
    var bielerseefilled = new ImageLayer({
      source: new ImageWMS({
        url: 'http://localhost:8080/geoserver/wms',
        crossOrigin: 'anonymous',
        projection: 'EPSG:2056',
        params: {
          'LAYERS': bielerseefilledWMS,
          'FORMAT': 'image/png'
        }
      })
    });

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

    wmtsLayer.setOpacity(0.7)
    wmtsLayer.setZIndex(0)

    bielersee.setOpacity(1)
    bielersee.setZIndex(0.5)

    bielerseefilled.setOpacity(0.7)
    bielerseefilled.setZIndex(0.5)

    const map = new Map({
      target: 'map',
      layers: [
        wmtsLayer,
        bielersee,
        bielerseefilled
      ],
      view: new View({
        center: center,
        zoom: zoom,
        projection: new Projection({
          code: 'EPSG:2056',
          units: 'm'
        })
      }),
      controls: [],
    });
    map.on('click', this.props.onClick);
  }

  

  
  render() {
    return(
     <>
      <div id="map"></div>
    </>
    )};
  }

export default BielerseeMap;
