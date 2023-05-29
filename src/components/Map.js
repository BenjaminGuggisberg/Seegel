import React, { Component } from 'react';
import { useState, useEffect, useRef } from 'react';
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

function MapComponent(props) {
    const dataWindowRef = useRef();
    const [clickedCoordinate, setClickedCoordinate] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [latitude, setLatitude] = useState(null);
    const [demValue, setDemValue] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [mapClick, setMapClick] = useState(false);
    const [namen, setNamen] = useState("");
    const [fetchedData, setFetchedData] = useState([]);

    const GetValueFromPosition = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get(`http://localhost:8000/dem?longitude=${longitude}&latitude=${latitude}`, {
                params: {
                    longitude,
                    latitude,
                    tif_file: props.url,
                },
            });
            const demValue = response.data.dem_value;
            setDemValue(demValue);
            setIsLoading(false);
            console.log("Longitude: ", longitude, "Latitude: ", latitude, "Dem Value: ", demValue);
        } catch (error) {
            console.error(error);
            setIsLoading(false);
        }
    };

    const handleClick = (event) => {
        setMapClick(true);
        const clickedCoordinate = event.coordinate;
        const [longitude, latitude] = clickedCoordinate;
        setClickedCoordinate(clickedCoordinate);
        setLongitude(longitude);
        setLatitude(latitude);
        props.onChildClick(clickedCoordinate);
        setTimeout(() => {
            GetValueFromPosition();
        }, 100);
    };

    const CloseData = () => {
        setMapClick(false);
    };

    useEffect(() => {
        const { center, zoom, layer, prognose, component01, component02 } = props;
        const mapContainer = document.getElementById('map');
        mapContainer.style.width = '85%';
        mapContainer.style.margin = 'auto';
        mapContainer.style.height = '400px';

        const vectorSource = new VectorSource({
            format: new GeoJSON(),
            url: function (extent) {
                return `http://localhost:8080/geoserver/messstationen/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=messstationen:${layer}&outputFormat=application/json`;
            },
            strategy: bboxStrategy
        });

        const vector = new VectorLayer({
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

        const swisstopoWMTSLayer = 'ch.swisstopo.pixelkarte-farbe';

        const wmtsLayer = new TileLayer({
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

        const map = new Map({
            target: 'map',
            layers: [
                wmtsLayer,
                vector
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
        const displayFeatureInfo = (pixel) => {
            vector.getFeatures(pixel).then(function (features) {
                const feature = features.length ? features[0] : undefined;
                if (feature) {
                    const extent = feature.getGeometry().getExtent();
                    var att = feature.getProperties();
                    var stat_id = feature.getId();
                    var id = stat_id.substring(stat_id.indexOf('.') + 1);
                    console.log(id, att.name);

                    fetch(`http://localhost:8000/prognose_s/${id}`)
                        .then(response => {
                            if (!response.ok) {
                                throw new Error(`HTTP error! Status: ${response.status}`);
                            }
                            return response.json();
                        })
                        .then(data => {
                            setFetchedData(data);
                            data.forEach(item => {
                                const zeit = item.zeit;
                                const windrichtung = item.windrichtung;
                                const boehen = item.boehen;
                                const windgeschwindigkeit = item.windgeschwindigkeit;
                                const fetchedData = `Zeit: ${zeit}, Windrichtung: ${windrichtung}, Boehen: ${boehen}, Windgeschwindigkeit: ${windgeschwindigkeit}`;
                                console.log(fetchedData)
                            });
                        })
                        .catch(error => {
                            console.error('Error:', error);
                        });
                }
            });
        };

        map.on('click', (evt) => {
            handleClick(evt);
            displayFeatureInfo(evt.pixel);
        });


        return (
            <>
                <div id="map" />
                <div>
                    {mapClick ? (
                        <div ref={dataWindowRef} className='datawindow'>
                            {isLoading ? (
                                <div>Loading ...</div>
                            ) : (
                                <>
                                    {isNaN(demValue) ? null : (
                                        <>
                                            {demValue === 0 ? (
                                                <>
                                                    <div>
                                                        <p style={{ fontWeight: 'bolder' }}>Seetiefe</p>
                                                    </div>
                                                    <p>Ohne Wasser geht es nicht weiter!</p>
                                                </>
                                            ) : (
                                                <>
                                                    <div>
                                                        <p style={{ fontWeight: 'bolder' }}>Seetiefe</p>
                                                    </div>
                                                    <p>{(props.actuallevel - demValue).toFixed(3)} Meter</p>
                                                </>
                                            )}
                                        </>
                                    )}
                                    {fetchedData && fetchedData.map(item => (
                                        <div key={item.zeit}>
                                            Zeit: {item.zeit}, Windrichtung: {item.windrichtung}, Boehen: {item.boehen}, Windgeschwindigkeit: {item.windgeschwindigkeit}
                                        </div>
                                    ))}
                                    <button
                                        onClick={CloseData}
                                        style={{
                                            position: 'absolute',
                                            top: '5px',
                                            right: '5px',
                                            cursor: 'pointer',
                                            border: 'none',
                                            background: 'none',
                                            color: 'black',
                                            fontSize: 'medium',
                                        }}
                                    >
                                        X
                                    </button>
                                </>
                            )}
                        </div>
                    ) : null}
                </div>
            </>
        )

    })
}
export default Map;