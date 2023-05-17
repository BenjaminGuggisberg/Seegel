import { Control } from 'ol/control';
import React, { useRef, useEffect } from 'react';
import { View } from 'ol';
import { Projection } from 'ol/proj';


class LayerSwitcherControl extends Control {
    constructor() {
        super({
            element: document.createElement('div'),
        });
        this.element.className = 'layer-switcher';
    }

    render(map) {
        const layers = map.getLayers().getArray();
        for (let i = 0; i < layers.length; i++) {
            const layer = layers[i];
            const title = layer.get('title');
            if (title) {
                const input = document.createElement('input');
                input.type = 'checkbox';
                input.checked = layer.getVisible();
                input.addEventListener('change', () => {
                    layer.setVisible(input.checked);
                });
                const label = document.createElement('label');
                label.innerText = title;
                label.appendChild(input);
                this.element.appendChild(label);
            }
        }
    }
}

function LayerMenu(props)  {
    const { center, zoom } = props;
    const mapRef = useRef(null);

    useEffect(() => {
        if (mapRef.current) {
            const map = new Map({
                target: mapRef.current,
                layers: [
                    // your layers here
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

            const layerSwitcher = new LayerSwitcherControl();
            map.addControl(layerSwitcher);
        }
    }, []);

    return (
        <div>
            <div ref={mapRef} className="map" style={{width: '85%', margin: 'auto', height: '400px'}}/>
        </div>
    );
};

export default LayerSwitcherControl;
