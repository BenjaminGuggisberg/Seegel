import React, { useRef, useEffect } from 'react';
import Map from 'ol/Map';
import View from 'ol/View';
import ImageLayer from 'ol/layer/Image';
import ImageStatic from 'ol/source/ImageStatic';
import { fromLonLat } from 'ol/proj';

const TifLayer = () => {
  const mapRef = useRef(null);

  useEffect(() => {
    const map = new Map({
      target: mapRef.current,
      layers: [
        new ImageLayer({
          source: new ImageStatic({
            url: '/path/to/your/raster.tif',
            imageExtent: [-180, -90, 180, 90],
            projection: 'EPSG:4326',
          }),
          opacity: 0.8,
        }),
      ],
      view: new View({
        center: fromLonLat([0, 0]),
        zoom: 2,
      }),
    });

    // Colorize the layer gradiently based on the rastered values
    const layer = map.getLayers().item(0);
    layer.on('postrender', function () {
      const canvas = layer.getImage().getImage();
      const context = canvas.getContext('2d');
      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < imageData.data.length; i += 4) {
        // The red channel of the imageData array contains the rastered values
        const redValue = imageData.data[i];

        // Calculate the blue color value based on the redValue
        const blueValue = Math.floor((redValue / 255) * 255);

        // Set the blue color value
        imageData.data[i + 2] = blueValue;
      }

      // Update the canvas with the colorized imageData
      context.putImageData(imageData, 0, 0);
      layer.changed();
    });

    return () => {
      map.setTarget(null);
    };
  }, []);

  return <div ref={mapRef} style={{ width: '100%', height: '500px' }}></div>;
};

export default TifLayer;
