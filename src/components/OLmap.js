import React, { Component } from 'react';
import { Map, View } from 'ol';
import ImageLayer from 'ol/layer/Image';
import { Projection } from 'ol/proj';
import ImageWMS from 'ol/source/ImageWMS';
import TileLayer from 'ol/layer/Tile';
import TileWMS from 'ol/source/TileWMS';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import { bbox as bboxStrategy } from 'ol/loadingstrategy.js';
import { Style, Fill, Circle, Stroke, RegularShape } from 'ol/style';
import axios from 'axios';
// import {bbox as bboxStrategy} from 'ol/loadingstrategy.js';


class OLmap extends Component {
  constructor(props) {
    super(props);
    this.dataWindowRef = React.createRef();
    this.handleClick = this.handleClick.bind(this);
    this.GetValueFromPosition = this.GetValueFromPosition.bind(this);
    this.CloseData = this.CloseData.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    
    this.state = {
      clickedCoordinate: null,
      longitude: null,
      latitude: null,
      demValue: null,
      isLoading: false,
      mapclick: false,
    };
  }

  async GetValueFromPosition() {
    try {
      this.setState({ isLoading: true });
      const response = await axios.get(`http://localhost:8000/dem?longitude=${this.state.longitude}&latitude=${this.state.latitude}`, {
        params: {
          longitude: this.state.longitude,
          latitude: this.state.latitude,
          tif_file: this.props.url,
        },
      });
      const demValue = response.data.dem_value;
      this.setState({ demValue, isLoading: false })
      console.log("Longitude: ", this.state.longitude, "Latitude: ", this.state.latitude, "Dem Value: ", demValue);
    } catch (error) {
      console.error(error);
      this.setState({ isLoading: false });
    }
  };

  handleClick = (event) => {
    this.setState({ mapclick: true });
    const clickedCoordinate = event.coordinate;
    const [longitude, latitude] = clickedCoordinate;
    this.setState({ clickedCoordinate, longitude, latitude });
    this.props.onChildClick(clickedCoordinate);
    setTimeout(() => {
      this.GetValueFromPosition();        // Timeout wird genutzt, damit beim ERSTEN MAL/NACH LANGEM WARTEN die Verbindung zur API wieder aufgebaut,
    }, 100);                              // und der Wert demValue wieder dargestellt werden kann. Braucht Delay, um Wert darzustellen
  };                                      // IMPLEMENTIERUNG Loading ...

  CloseData = () => {
    this.setState({ mapclick: false })
  }


  componentDidMount() {
    const { center, zoom, layer, prognose, component01, component02 } = this.props;
    this.state = {wd: null};
    const mapContainer = document.getElementById('map');
    mapContainer.style.width = '85%';
    mapContainer.style.margin = 'auto';
    mapContainer.style.height = '400px';

// ------ Vector Source --------------------------------------------------------------
    var vectorSource = new VectorSource({
      format: new GeoJSON(),
      url: function(extent) {
        return 'http://localhost:8080/geoserver/wfs?service=WFS&' +
                'version=1.1.0&request=GetFeature&typename=messstationen:' + layer + '&' +
                'outputFormat=application/json';
      },
      strategy: bboxStrategy
    });

// ------ Vector Layer ---------------------------------------------------------------
    var vector = new VectorLayer({
      source: vectorSource,
      style: new Style({
        image: new Circle({
          radius: 5,
          fill: new Fill({
            color: 'black'
          }),
          stroke: new Stroke({
            color: 'white',
            width: '1.3'
          })
        })
      })
    });

// ------ Windpfeile -----------------------------------------------------------------

    const shaft = new RegularShape({
      points: 2,
      radius: 5,
      stroke: new Stroke({
        width: 2,
        color: 'black',
      }),
      rotateWithView: true,
    });
    
    const head = new RegularShape({
      points: 3,
      radius: 5,
      fill: new Fill({
        color: 'black',
      }),
      rotateWithView: true,
    });
    
    const styles = [new Style({image: shaft}), new Style({image: head})];

    var wind = new VectorLayer({
      source: vectorSource,
      style: function (feature) {

      }
    })

    //     var vectorSource = new VectorSource({
    //       format: new GeoJSON(),
    //       url: function(extent) {
    //         return 'http://localhost:8080/geoserver/sail/wms?service=WMS&version=1.1.0&request=GetMap&layers=sail:' + component01 + '&' +
    //                 'bbox=2572080.999999999%2C1209548.0%2C2584722.999999999%2C1220463.0&width=768&height=663&srs=EPSG%3A2056&styles=&format=application/openlayers'}
    //       // strategy: bboxStrategy
    //     });

    //     var bielersee_bat = new VectorLayer({
    //       source: vectorSource
    //     })

    var bielersee = new ImageLayer({
      source: new ImageWMS({
        url: 'http://localhost:8080/geoserver/wms',
        crossOrigin: 'anonymous',
        projection: 'EPSG:2056',
        params: {
          'LAYERS': component01,
          'FORMAT': 'image/png'
        }
      })
    });

    var bielersee_float64 = new ImageLayer({
      source: new ImageWMS({
        url: 'http://localhost:8080/geoserver/wms',
        crossOrigin: 'anonymous',
        projection: 'EPSG:2056',
        params: {
          'LAYERS': component02,
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

    bielersee.setOpacity(0.7)
    bielersee.setZIndex(0.5)

    bielersee_float64.setOpacity(0.7)
    bielersee_float64.setZIndex(0.5)

    const map = new Map({
      target: 'map',
      layers: [
        wmtsLayer,
        // bielersee,
        bielersee_float64,                        // KOMMENTAR:  Dies sind Vektorlayer von Geoserver - ursprüngliche erstellte Methode zur Visualisierung im 1m Bereich anhand von WFS
        vector,
        
      ],                                          // Neu Rasteranalyse der Daten und Darstellung über Geoserver
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

// ------ Forecast -------------------------------------------------------------------

  const displayFeatureInfo = pixel => {
    vector.getFeatures(pixel).then(function (features) {
      const feature = features.length ? features[0] : undefined;
      if (feature) {
        const extent = feature.getGeometry().getExtent();
        var att = feature.getProperties();
        var stat_id = feature.getId()
        var id = stat_id.substring(stat_id.indexOf('.')+1);
        console.log(id, att.name);

        axios.get('http://localhost:8000/' + prognose + `/${id}`)
        .then(response => {
          
          //this.setState({wd: response.data[0][0]});
          var wd = response.data[0][1];
          var ws = response.data.map(subArray => subArray[2]);
          var wg = response.data.map(subArray => subArray[3]);
          var dtl = response.data.map(subArray => subArray[4]);

          //this.setState({wd: wd});

          console.log(response.data, "Windrichtung: ", wd,"Windgeschwindigkeit: ", ws, "Böen: ", wg, "Zeit: ", dtl);
        })
        .catch(error => {
          console.error(error);
        });
      };
     });
  };

    map.on('click', (evt) => {displayFeatureInfo(evt.pixel);})
  };

  render() {
    const { demValue, isLoading, mapclick } = this.state
    if (mapclick) {
      if (this.dataWindowRef.current) {
        this.dataWindowRef.current.scrollIntoView({behavior: "smooth"});
      }
    }
    return (
      <>
        <div id="map" />
        <div>
          {mapclick ? (
            <div ref={this.dataWindowRef} className='datawindow'>
              {isLoading ? (
                <div>Loading ...</div>
              ) : (
                <>
                  {/* <div><p style={{fontWeight:'bolder'}}>DEM Value:</p><p>{demValue}</p></div> */}
                  <div><p style={{fontWeight:'bolder'}}>Lake Depth</p><p>{(this.props.actuallevel - demValue).toFixed(3)} Meter</p></div>
                  {/* <div><p style={{fontWeight:'bolder'}}>Forecast</p><p>{(this.props.wd)}</p></div> */}
                  <button onClick={this.CloseData}
                    style={{
                      position: 'absolute',
                      top: '5px',
                      right: '5px',
                      cursor: 'pointer',
                      border: 'none',
                      background: 'none',
                      color: 'black',
                      fontSize: 'medium',
                    }}> X </button>
                </>
              )}
            </div>
          ) : (null)}
        </div>
      </>
    )
  };
}

export default OLmap;