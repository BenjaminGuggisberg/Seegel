import React, { Component } from 'react';
import { Map, View } from 'ol';
import { Projection } from 'ol/proj';
import TileLayer from 'ol/layer/Tile';
import TileWMS from 'ol/source/TileWMS';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import { bbox as bboxStrategy } from 'ol/loadingstrategy.js';
import { Style, Fill, Circle, Stroke, RegularShape } from 'ol/style';
import { LineChart, AreaChart, Area, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

import axios from 'axios';


class OLmap extends Component {
  constructor(props) {
    super(props);
    this.dataWindowRef = React.createRef();
    this.handleClick = this.handleClick.bind(this);
    this.GetValueFromPosition = this.GetValueFromPosition.bind(this);
    this.CloseData = this.CloseData.bind(this);
    this.state = {
      clickedCoordinate: null,
      longitude: null,
      latitude: null,
      demValue: null,
      isLoading: false,
      mapclick: false,
      namen: "",
    };
  }

  async GetValueFromPosition() {
    try {
      this.setState({ isLoading: true });
      this.setState({ isWindy: false });
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
    const self = this;
    const { center, zoom, layer, prognose, component01, component02 } = this.props;
    const mapContainer = document.getElementById('map');
    mapContainer.style.width = '85%';
    mapContainer.style.margin = 'auto';
    mapContainer.style.height = '400px';

    // ------ Vector Source --------------------------------------------------------------
    var vectorSource = new VectorSource({
      format: new GeoJSON(),
      url: function (extent) {
        return `http://localhost:8080/geoserver/messstationen/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=messstationen:${layer}&outputFormat=application/json`;
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


    // var bielersee = new ImageLayer({
    //   source: new ImageWMS({
    //     url: 'http://localhost:8080/geoserver/wms',
    //     crossOrigin: 'anonymous',
    //     projection: 'EPSG:2056',
    //     params: {
    //       'LAYERS': component01,
    //       'FORMAT': 'image/png'
    //     }
    //   })
    // });
    // var bielersee_float64 = new ImageLayer({
    //   source: new ImageWMS({
    //     url: 'http://localhost:8080/geoserver/wms',
    //     crossOrigin: 'anonymous',
    //     projection: 'EPSG:2056',
    //     params: {
    //       'LAYERS': component02,
    //       'FORMAT': 'image/png'
    //     }
    //   })
    // });

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

    wmtsLayer.setOpacity(0.55)
    wmtsLayer.setZIndex(0)

    // bielersee.setOpacity(0.7)
    // bielersee.setZIndex(0.5)
    // bielersee_float64.setOpacity(0.7)
    // bielersee_float64.setZIndex(0.5)

    const map = new Map({
      target: 'map',
      layers: [
        wmtsLayer,
        vector
        // bielersee,
        // bielersee_float64                      // KOMMENTAR:  Dies sind Vektorlayer von Geoserver - ursprüngliche erstellte Methode zur Visualisierung im 1m Bereich anhand von WFS
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
    const displayFeatureInfo = (pixel) => {
      vector.getFeatures(pixel).then(function (features) {
        const feature = features.length ? features[0] : undefined;
        if (feature) {
          const extent = feature.getGeometry().getExtent();
          var att = feature.getProperties();
          var stat_id = feature.getId();
          var id = stat_id.substring(stat_id.indexOf('.') + 1);
          console.log(id, att.name);

          // Make a GET request to your backend API
          fetch(`http://localhost:8000/prognose_s/${id}`)
            .then(response => {
              if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
              }
              return response.json(); // Parse the response as JSON
            })
            .then(data => {
              data.forEach(item => {
                const zeit = item.zeit;
                const windrichtung = item.windrichtung;
                const boehen = item.boehen;
                const windgeschwindigkeit = item.windgeschwindigkeit;

                // Use the data as needed (e.g., update state, render in JSX, etc.)
                const fetchedData = `Zeit: ${zeit}, Windrichtung: ${windrichtung}, Boehen: ${boehen}, Windgeschwindigkeit: ${windgeschwindigkeit}`;
                console.log(fetchedData)
              });

              // Update state or perform additional actions with the data
            })
            .catch(error => {
              // Handle any errors that occurred during the request
              console.error('Error:', error);
            });

        }
      });
    };


    map.on('click', (evt) => {
      this.handleClick(evt); // Call your custom handleClick method
      displayFeatureInfo(evt.pixel); // Call displayFeatureInfo on click event
    });
  }




  render() {
    const { demValue, isLoading, mapclick, namen, fetchedData } = this.state

    if (mapclick) {
      // if (this.dataWindowRef.current) {
      //   this.dataWindowRef.current.scrollIntoView({behavior: "smooth"});
      // }
      window.scrollTo({ top: 100, behavior: 'smooth' })

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
                  {/* {isNaN(demValue) && (!dataRows) && (<div style={{marginTop: '30px', fontWeight: 'bold'}}><p>Keine Daten vorhanden!</p></div>)} */}
                  {isNaN(demValue) ? (null) : (<>
                    {demValue === 0 ? (<><div><p style={{ fontWeight: 'bolder' }}>Seetiefe</p>
                    </div><p>Without water, sail no further!</p></>) : (<><div><p style={{ fontWeight: 'bolder' }}>Seetiefe</p>
                    </div><p>{(this.props.actuallevel - demValue).toFixed(3)} Meter</p></>)}
                  </>)}

                  {fetchedData && fetchedData.map(item => (
                    <div key={item.zeit}>
                      Zeit: {item.zeit}, Windrichtung: {item.windrichtung}, Boehen: {item.boehen}, Windgeschwindigkeit: {item.windgeschwindigkeit}
                    </div>
                  ))}

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
