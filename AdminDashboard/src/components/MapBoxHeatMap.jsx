import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

// Set Mapbox token directly at the top level
mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

const MapboxHeatmap = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  // Set initial view to Bilbao coordinates
  const [lng, setLng] = useState(-2.9253);
  const [lat, setLat] = useState(43.2627);
  const [zoom, setZoom] = useState(11); // Higher zoom level to focus on Bilbao
  const [mapLoaded, setMapLoaded] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Don't reinitialize if map already exists
    if (map.current) return;
    
    try {
      // Ensure the container is available
      if (!mapContainer.current) {
        console.error("Map container not found");
        setError("Map container not found");
        return;
      }
      
      // Create map instance focused on Bilbao
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/light-v11',
        center: [lng, lat],
        zoom: zoom,
        // Set max bounds to limit panning (roughly Bilbao metropolitan area)
        maxBounds: [
          [-3.0553, 43.1627], // Southwest coordinates
          [-2.7953, 43.3627]  // Northeast coordinates
        ]
      });

      // Add navigation controls
      map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

      // Set up map events
      map.current.on('load', () => {
        console.log("Map loaded successfully");
        setMapLoaded(true);
        
        // Data points focused on Bilbao and nearby areas
        const heatmapData = {
          'type': 'FeatureCollection',
          'features': [
            // Bilbao City Center and neighborhoods
            createFeature(-2.9253, 43.2627, 95, 'Bilbao Centro'),
            createFeature(-2.9338, 43.2569, 85, 'Abando'),
            createFeature(-2.9154, 43.2710, 80, 'Deusto'),
            createFeature(-2.9108, 43.2599, 75, 'Indautxu'),
            createFeature(-2.9369, 43.2543, 70, 'Basurto'),
            createFeature(-2.9204, 43.2766, 65, 'San Ignacio'),
            createFeature(-2.9081, 43.2697, 85, 'Universidad de Deusto'),
            createFeature(-2.9463, 43.2711, 60, 'Zorrotza'),
            createFeature(-2.9023, 43.2595, 75, 'Campo Volantín'),
            createFeature(-2.9300, 43.2539, 90, 'Plaza Moyua'),
            
            // Nearby towns in Greater Bilbao
            createFeature(-2.9929, 43.2883, 55, 'Barakaldo'),
            createFeature(-3.0132, 43.3232, 50, 'Portugalete'),
            createFeature(-2.9841, 43.3376, 45, 'Santurtzi'),
            createFeature(-2.9881, 43.3182, 60, 'Sestao'),
            createFeature(-2.8646, 43.2930, 55, 'Getxo'),
            createFeature(-2.8548, 43.3283, 40, 'Sopela'),
            createFeature(-2.8845, 43.2717, 65, 'Leioa'),
            createFeature(-2.8671, 43.3177, 45, 'Berango'),
            createFeature(-2.8954, 43.2366, 50, 'Galdakao')
          ]
        };

        // Add source for heatmap
        map.current.addSource('activity-data', {
          'type': 'geojson',
          'data': heatmapData
        });

        // Add heatmap layer
        map.current.addLayer({
          'id': 'activity-heat',
          'type': 'heatmap',
          'source': 'activity-data',
          'maxzoom': 15,
          'paint': {
            // Increase the heatmap weight based on intensity
            'heatmap-weight': [
              'interpolate',
              ['linear'],
              ['get', 'intensity'],
              0, 0,
              100, 1
            ],
            // Increase the heatmap color weight by zoom level
            'heatmap-intensity': [
              'interpolate',
              ['linear'],
              ['zoom'],
              0, 1,
              9, 3
            ],
            // Color ramp for heatmap from blue to red
            'heatmap-color': [
              'interpolate',
              ['linear'],
              ['heatmap-density'],
              0, 'rgba(0, 0, 255, 0)',
              0.2, 'rgba(0, 0, 255, 0.5)',
              0.4, 'rgba(0, 255, 255, 0.7)',
              0.6, 'rgba(0, 255, 0, 0.7)',
              0.8, 'rgba(255, 255, 0, 0.8)',
              1, 'rgba(255, 0, 0, 0.9)'
            ],
            // Adjust the heatmap radius by zoom level
            'heatmap-radius': [
              'interpolate',
              ['linear'],
              ['zoom'],
              0, 10,
              9, 30
            ],
            // Transition from heatmap to circle layer by zoom level
            'heatmap-opacity': [
              'interpolate',
              ['linear'],
              ['zoom'],
              8, 0.7,
              11, 0.5
            ]
          }
        });

        // Add circle layer for points
        map.current.addLayer({
          'id': 'activity-points',
          'type': 'circle',
          'source': 'activity-data',
          'minzoom': 9,
          'paint': {
            // Size circle radius by intensity and zoom level
            'circle-radius': [
              'interpolate',
              ['linear'],
              ['zoom'],
              9, [
                'interpolate',
                ['linear'],
                ['get', 'intensity'],
                0, 1,
                100, 4
              ],
              16, [
                'interpolate',
                ['linear'],
                ['get', 'intensity'],
                0, 5,
                100, 15
              ]
            ],
            // Color circle by intensity
            'circle-color': [
              'interpolate',
              ['linear'],
              ['get', 'intensity'],
              0, '#add8e6',
              50, '#ffff00',
              100, '#ff0000'
            ],
            'circle-stroke-color': 'white',
            'circle-stroke-width': 1,
            'circle-opacity': [
              'interpolate',
              ['linear'],
              ['zoom'],
              9, 0,
              10, 0.7
            ]
          }
        });

        // Add popup on hover
        const popup = new mapboxgl.Popup({
          closeButton: false,
          closeOnClick: false
        });

        map.current.on('mouseenter', 'activity-points', (e) => {
          map.current.getCanvas().style.cursor = 'pointer';
          
          const coordinates = e.features[0].geometry.coordinates.slice();
          const { name, intensity } = e.features[0].properties;
          
          const popupContent = `
            <div class="p-1.5">
              <h3 class="m-0 mb-1 text-sm font-medium">${name}</h3>
              <p class="m-0 text-xs">Intensidad: <strong>${intensity}</strong></p>
            </div>
          `;

          popup
            .setLngLat(coordinates)
            .setHTML(popupContent)
            .addTo(map.current);
        });

        map.current.on('mouseleave', 'activity-points', () => {
          map.current.getCanvas().style.cursor = '';
          popup.remove();
        });
      });

      // Handle map errors
      map.current.on('error', (e) => {
        console.error("Mapbox error:", e);
        setError(`Mapbox error: ${e.error.message || 'Unknown error'}`);
      });

      // Update state on map movement
      map.current.on('move', () => {
        setLng(map.current.getCenter().lng.toFixed(4));
        setLat(map.current.getCenter().lat.toFixed(4));
        setZoom(map.current.getZoom().toFixed(2));
      });
      
    } catch (err) {
      console.error("Error initializing map:", err);
      setError(err.message);
    }
    
    // Force map resize when component mounts
    setTimeout(() => {
      if (map.current) {
        map.current.resize();
      }
    }, 100);
    
    // Cleanup function
    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  // Helper function to create GeoJSON feature
  function createFeature(lng, lat, intensity, name) {
    return {
      'type': 'Feature',
      'properties': {
        'intensity': intensity,
        'name': name
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [lng, lat]
      }
    };
  }

  if (error) {
    return (
      <div className="p-5 text-red-600 bg-red-50 border border-red-500 rounded-md">
        <h3 className="font-medium">Error loading map</h3>
        <p>{error}</p>
        <p>Check console for more details.</p>
      </div>
    );
  }

  return (
    <div className="w-full h-full relative">
      <div className=" text-white py-1.5 px-3 font-mono z-10 absolute top-0 left-0 m-3 rounded">
       
      </div>
      <div 
        ref={mapContainer} 
        className="w-full h-full" 
      />
      {mapLoaded && (
        <div className="bg-white rounded shadow p-2.5 absolute bottom-5 right-5 z-10">
          <h4 className="m-0 mb-2.5 font-medium">Intensidad de Actividad</h4>
          <div className="flex items-center mb-1.5">
            <span className="w-[15px] h-[15px] mr-1.5 border border-gray-300" style={{ backgroundColor: '#add8e6' }}></span>
            <span>Baja</span>
          </div>
          <div className="flex items-center mb-1.5">
            <span className="w-[15px] h-[15px] mr-1.5 border border-gray-300" style={{ backgroundColor: '#ffff00' }}></span>
            <span>Media</span>
          </div>
          <div className="flex items-center">
            <span className="w-[15px] h-[15px] mr-1.5 border border-gray-300" style={{ backgroundColor: '#ff0000' }}></span>
            <span>Alta</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default MapboxHeatmap;
