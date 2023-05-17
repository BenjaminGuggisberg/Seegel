import React, { Component } from 'react';
import { Map, View } from 'ol';
import ImageLayer from 'ol/layer/Image';
import { Projection } from 'ol/proj';
import ImageWMS from 'ol/source/ImageWMS';
import TileLayer from 'ol/layer/Tile';
import TileWMS from 'ol/source/TileWMS';


class BrienzerseeMap extends Component {
    componentDidMount() {
        const { center, zoom } = this.props;
        const mapContainer = document.getElementById('map');
        mapContainer.style.width = '85%';
        mapContainer.style.margin = 'auto';
        mapContainer.style.height = '400px';
      
        var brienzerseeWMS = 'sail:vektorisiert_brienzersee_kopie';
      
        var brienzersee = new ImageLayer({
          source: new ImageWMS({
            url: 'http://localhost:8080/geoserver/wms',
            crossOrigin: 'anonymous',
            projection: 'EPSG:2056',
            params: {
              'LAYERS': brienzerseeWMS, 
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
    
        wmtsLayer.setOpacity(1)
        wmtsLayer.setZIndex(0)    

        brienzersee.setOpacity(1)
        brienzersee.setZIndex(0.5)
      
        const map = new Map({
          target: 'map',
          layers: [
            wmtsLayer,
            brienzersee
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

      
    }
      

  render() {
    return (
      <div id="map"/>)}
};

export default BrienzerseeMap;