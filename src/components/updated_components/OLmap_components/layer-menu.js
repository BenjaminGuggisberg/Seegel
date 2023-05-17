import React, { useEffect, useRef } from 'react';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import LayerGroup from 'ol/layer/Group';
import Control from 'ol/control/Control';
import 'ol/ol.css';
import ImageLayer from 'ol/layer/Image';
import ImageWMS from 'ol/source/ImageWMS';
import TileWMS from 'ol/source/TileWMS';
import { Projection } from 'ol/proj';
import LayerSwitcher from './LayerSwitcher';


function LayerMenu(props)  {
    const { center, zoom } = props;
    const mapRef = useRef(null);

    useEffect(() => {
        if (mapRef.current) {
            const map = new Map({
                target: mapRef.current,
                layers: [
                    new LayerGroup({
                        title: 'Base Layers',
                        layers: [
                            new TileLayer({
                                title: 'Swisstopo',
                                source: new TileWMS({
                                    url: 'https://wms.geo.admin.ch/',
                                    crossOrigin: 'anonymous',
                                    projection: 'EPSG:2056',
                                    params: {
                                        'LAYERS': 'ch.swisstopo.pixelkarte-farbe',
                                        'FORMAT': 'image/jpeg'
                                    },
                                })
                            }),
                        ],
                    }),
                    new LayerGroup({
                        title: 'Overlays',
                        layers: [
                            new ImageLayer({
                                title: 'Bielersee',
                                source: new ImageWMS({
                                    url: 'http://localhost:8080/geoserver/wms',
                                    crossOrigin: 'anonymous',
                                    projection: 'EPSG:2056',
                                    params: {
                                        'LAYERS': 'sail:bielersee_border',
                                        'FORMAT': 'image/png'
                                    }
                                })
                            }),
                            new ImageLayer({
                                title: 'Bielersee_Fill',
                                source: new ImageWMS({
                                    url: 'http://localhost:8080/geoserver/wms',
                                    crossOrigin: 'anonymous',
                                    projection: 'EPSG:2056',
                                    params: {
                                        'LAYERS': 'sail:differenz_bielersee',
                                        'FORMAT': 'image/png'
                                    }
                                })
                            }),
                        ],
                    }),
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
        }
    }, []);

    return (
        <div>
            <LayerSwitcher map={mapRef} />
            <div className='map'></div>
        </div>
    );
};

export default LayerMenu;