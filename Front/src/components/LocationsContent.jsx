import { useState, useEffect, useRef } from 'react';
import { Plus, Search, Filter, Edit, Trash2, MapPin, Phone, Clock, ListFilter, Map as MapIcon, Check, X, Bell } from 'lucide-react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { supabase } from '../hooks/supabaseClient';
// Replace GeoJSON with WKB import
import WKB from 'ol/format/WKB';

// Set your Mapbox token
mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

// Create WKB format instance instead of GeoJSON
const wkbFormat = new WKB();

const LocationsContent = () => {
  // Helper function to convert between numeric status codes and display text
  const getStatusText = (statusCode) => {
    switch(statusCode) {
      case 1: return 'Solicitado';
      case 2: return 'Activo';
      case 3: return 'Inactivo';
      default: return 'Desconocido';
    }
  };
  
  const getStatusCode = (statusText) => {
    switch(statusText) {
      case 'Solicitado': return 1;
      case 'Activo': return 2;
      case 'Inactivo': return 3;
      case 'Todos': return 'Todos';
      default: return null;
    }
  };

  // Add this helper function after your existing helper functions (getStatusText, getStatusCode)

  // Helper function to get sustainability score color and label
  const getSustainabilityInfo = (score) => {
    if (score === "No aplica") {
      return { color: '#6b7280', bgColor: '#f3f4f6', label: 'No aplica' }; // Gray
    }
    // Normalize score if needed (assuming score range 0-100)
    const normalizedScore = Math.max(0, Math.min(100, score));
    
    // Determine color based on score ranges
    if (normalizedScore < 25) {
      return { color: '#ef4444', bgColor: '#fee2e2', label: 'Baja' }; // Red
    } else if (normalizedScore < 50) {
      return { color: '#f97316', bgColor: '#ffedd5', label: 'Media' }; // Orange
    } else if (normalizedScore < 75) {
      return { color: '#eab308', bgColor: '#fef9c3', label: 'Buena' }; // Yellow
    } else {
      return { color: '#22c55e', bgColor: '#dcfce7', label: 'Excelente' }; // Green
    }
  };

  // Existing states 
  const [locations, setLocations] = useState([]);
  const [filteredLocations, setFilteredLocations] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterArea, setFilterArea] = useState('Todas las zonas');
  const [filterStatus, setFilterStatus] = useState('Todos');
  const [showModal, setShowModal] = useState(false);
  const [currentLocation, setCurrentLocation] = useState({
    id: null,
    name: '',
    address: '',
    area: '',
    phone: '',
    email: '',
    schedule: '',
    status: 2, // Default to "Active" (2) instead of "Activo"
    description: '',
    image: null
  });
  
  // New state for petitions
  const [petitions, setPetitions] = useState([]);
  const [filteredPetitions, setFilteredPetitions] = useState([]);
  const [showPetitionsSection, setShowPetitionsSection] = useState(false);
  const [selectedPetition, setSelectedPetition] = useState(null);
  
  // Map refs and state
  const mapContainer = useRef(null);
  const map = useRef(null);
  const markers = useRef({});
  const [viewMode, setViewMode] = useState('table'); // 'table' or 'map'
  const [selectedMarker, setSelectedMarker] = useState(null);

  // Add this with the other refs at the beginning of the component
  const modalMapContainer = useRef(null);
  const modalMap = useRef(null);
  const modalMarker = useRef(null);

  // Fetch locations from Supabase
  useEffect(() => {
    const fetchLocations = async () => {
      const { data, error } = await supabase
        .from('Location')
        .select(`
          id, 
          name, 
          description, 
          image_url,
          point,
          LocationType(name),
          sustainability_score,
          LocationStatus(status),
          address,
          email,
          phone_number,
          opening_hours,
          status
        `)
        .not('status', 'eq', 1); // Exclude requested locations
      
      if (error) {
        console.error('Error fetching locations:', error);
        return;
      }
      
      console.log('Raw location data:', data); // Add this debug line
      
      // Transform data to match component structure
      const formattedLocations = data.map(loc => {
        let longitude = -2.934983;  // Default longitude
        let latitude = 43.262995;   // Default latitude
        
        if (loc.point) {
          try {
            // Parse the WKB point using OpenLayers
            // PostgreSQL/PostGIS may return WKB in hexadecimal string format
            // or as a binary buffer, we need to handle both cases
            const geometry = wkbFormat.readGeometry(loc.point);
            const coordinates = geometry.getCoordinates();

            // OpenLayers uses [longitude, latitude] order
            longitude = coordinates[0];
            latitude = coordinates[1];
          } catch (error) {
            console.error('Error parsing point geometry:', error);
          }
        }
        
        return {
          id: loc.id,
          name: loc.name,
          address: loc.address || '',
          area: loc.LocationType?.name ? loc.LocationType.name.charAt(0).toUpperCase() + loc.LocationType.name.slice(1) : 'Sin categoría', // Using LocationType as "area"
          phone: loc.phone_number || '',
          email: loc.email || '',
          schedule: loc.opening_hours || '',
          status: loc.status, // Keep as numeric code
          statusText: getStatusText(loc.status), // Add display text
          description: loc.description || '',
          image: loc.image_url || null, // This should be correct
          sustainability_score: loc.sustainability_score, 
          // Extract coordinates from PostGIS point type
          longitude: longitude,
          latitude: latitude
        };
      });
      
      setLocations(formattedLocations);
      setFilteredLocations(formattedLocations);
    };
    
    fetchLocations();
  }, []);

  // Fetch pending location requests
  useEffect(() => {
    const fetchPetitions = async () => {
      const { data, error } = await supabase
        .from('Location')
        .select('*')
        .eq('status', 1) // Status 1 means "requested"
        .not('solicited_at', 'is', null);
      
      if (error) {
        console.error('Error fetching location petitions:', error);
        return;
      }
      
      // Transform petition data
      const formattedPetitions = data.map(loc => ({
        id: loc.id,
        name: loc.name,
        address: loc.address || '',
        area: loc.area || 'Centro',
        phone: loc.phone_number || '',
        email: loc.email || '',
        schedule: loc.opening_hours || '',
        description: loc.description || '',
        location_type: loc.location_type,
        status: loc.status,
        longitude: loc.geography ? JSON.parse(loc.geography).coordinates[0] : -2.934983,
        latitude: loc.geography ? JSON.parse(loc.geography).coordinates[1] : 43.262995,
        requestDate: loc.solicited_at ? new Date(loc.solicited_at).toLocaleDateString() : 'Desconocido'
      }));
      
      setPetitions(formattedPetitions);
      setFilteredPetitions(formattedPetitions);
    };
    
    fetchPetitions();
  }, []);

  // Initialize map when the component mounts and viewMode changes to 'map'
  useEffect(() => {
    if (viewMode === 'map') {
      // Create new map instance or reinitialize if needed
      if (!map.current) {
        map.current = new mapboxgl.Map({
          container: mapContainer.current,
          style: 'mapbox://styles/mapbox/streets-v12',
          center: [-2.934984, 43.262969], 
          zoom: 12
        });
        
        // Add navigation controls
        map.current.addControl(new mapboxgl.NavigationControl());
        
        // Add markers when map loads
        map.current.on('load', () => {
          addMarkersToMap();
        });
      } else {
        // If map instance exists but container has changed, need to force resize
        map.current.resize();
        
        // Ensure markers are refreshed
        if (map.current.loaded()) {
          addMarkersToMap();
        }
      }
    }
    
    return () => {
      // Clean up markers and map when view changes or component unmounts
      if (viewMode !== 'map' && map.current) {
        Object.values(markers.current).forEach(marker => marker.remove());
        markers.current = {};
        map.current.remove();
        map.current = null;
      }
    };
  }, [viewMode]);

  // Update markers when filtered locations change
  useEffect(() => {
    if (map.current && map.current.loaded()) {
      addMarkersToMap();
    }
  }, [filteredLocations]);

  // Function to add markers to map
const addMarkersToMap = () => {
  // Remove existing markers
  Object.values(markers.current).forEach(marker => marker.remove());
  markers.current = {};
  
  // Add new markers for filtered locations
  filteredLocations.forEach(location => {
    // Create marker element
    const el = document.createElement('div');
    el.className = 'marker';
    el.style.width = '32px';
    el.style.height = '32px';
    el.style.borderRadius = '50%';
    el.style.backgroundColor = location.status === 2 ? '#3b82f6' : '#6b7280';
    el.style.display = 'flex';
    el.style.alignItems = 'center';
    el.style.justifyContent = 'center';
    
    // Add pin icon inside marker
    const icon = document.createElement('div');
    icon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>`;
    el.appendChild(icon);
    
    // Get sustainability info
    const { color, bgColor, label } = getSustainabilityInfo(location.sustainability_score || "No aplica");

    // Create popup with inline event handlers
    const popup = new mapboxgl.Popup({ offset: 25, closeButton: false })
      .setHTML(`
          <div class="flex justify-between items-center border-b border-gray-100 pb-2 mb-2">
            <h3 class="font-bold text-gray-800 truncate mr-2">${location.name}</h3>
            <button 
              onclick="document.dispatchEvent(new CustomEvent('closePopup', {detail: ${location.id}}))"
              class="text-gray-400 hover:text-gray-600 transition-colors p-0.5 rounded-full hover:bg-gray-100">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>
          
          <div class="space-y-1.5 mb-3">
            <p class="text-sm text-gray-600 flex items-start">
              <svg class="w-4 h-4 mr-1.5 mt-0.5 text-gray-500 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>
              <span class="truncate">${location.address}</span>
            </p>
            
            <p class="text-sm text-gray-600 flex items-center">
              <svg class="w-4 h-4 mr-1.5 text-gray-500 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
              <span>${location.phone || 'No disponible'}</span>
            </p>
          </div>
          
          <div class="mb-3 flex items-center">
            <div class="w-2 h-6 rounded-l-full" style="background-color: ${color};"></div>
            <div class="px-2 py-1 rounded-r-md flex items-center text-xs" style="background-color: ${bgColor};">
              <span class="font-medium mr-1" style="color: ${color};">${location.sustainability_score || "?"}</span>
              <span class="text-gray-600">/ 100</span>
            </div>
            <span class="ml-2 text-xs text-gray-600">${label}</span>
          </div>
          
          <div class="flex justify-between items-center pt-2 border-t border-gray-100">
            <div class="text-xs text-gray-500">${location.area}</div>
            <div class="flex gap-1">
              <button 
                onclick="document.dispatchEvent(new CustomEvent('editLocation', {detail: ${location.id}}))"
                class="p-1.5 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-full transition-colors" 
                title="Editar">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"></path><path d="m15 5 4 4"></path></svg>
              </button>
              <button 
                onclick="document.dispatchEvent(new CustomEvent('deleteLocation', {detail: ${location.id}}))"
                class="p-1.5 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-full transition-colors"
                title="Eliminar">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path><line x1="10" x2="10" y1="11" y2="17"></line><line x1="14" x2="14" y1="11" y2="17"></line></svg>
              </button>
            </div>
          </div>
      `);
    
    // Create marker
    const marker = new mapboxgl.Marker(el)
      .setLngLat([location.longitude, location.latitude])
      .setPopup(popup)
      .addTo(map.current);
      
    markers.current[location.id] = marker;
  });
};

  // Add event listeners outside of the loop, using document events
  useEffect(() => {
    // Create event listeners for edit and delete actions from map popup
    const handleEditFromMap = (e) => {
      const locationId = e.detail;
      const location = locations.find(loc => loc.id === locationId);
      if (location) handleEdit(location);
    };

    const handleDeleteFromMap = (e) => {
      const locationId = e.detail;
      handleDelete(locationId);
    };

    // Add handler for popup close button
    const handleClosePopup = (e) => {
      const locationId = e.detail;
      if (markers.current[locationId]) {
        markers.current[locationId].getPopup().remove();
      }
    };

    // Add event listeners
    document.addEventListener('editLocation', handleEditFromMap);
    document.addEventListener('deleteLocation', handleDeleteFromMap);
    document.addEventListener('closePopup', handleClosePopup);

    // Clean up
    return () => {
      document.removeEventListener('editLocation', handleEditFromMap);
      document.removeEventListener('deleteLocation', handleDeleteFromMap);
      document.removeEventListener('closePopup', handleClosePopup);
    };
  }, [locations]); // Depend on locations to get updated data for editing

  // Rest of your existing code (filter, add, edit, delete handlers)
  
  // Replace text status with objects that contain both code and text
  const statuses = [
    { code: 'Todos', text: 'Todos' },
    { code: 2, text: 'Activo' },
    { code: 3, text: 'Inactivo' }
  ];

  // Existing filter effect
  useEffect(() => {
    let filtered = locations;
    
    if (searchTerm) {
      filtered = filtered.filter(location => 
        location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        location.address.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (filterArea !== 'Todas las zonas') {
      filtered = filtered.filter(location => location.area === filterArea);
    }
    
    if (filterStatus !== 'Todos') {
      // Convert filterStatus to code if needed
      const statusCode = typeof filterStatus === 'number' ? filterStatus : getStatusCode(filterStatus);
      filtered = filtered.filter(location => location.status === statusCode);
    }
    
    setFilteredLocations(filtered);
  }, [searchTerm, filterArea, filterStatus, locations]);

  // Handler functions
  const handleAddNew = () => {
    setCurrentLocation({
      id: null,
      name: '',
      address: '',
      area: 'Centro',
      phone: '',
      email: '',
      schedule: '',
      status: 2, // Active status (2)
      description: '',
      image: null,
      longitude: -3.70379,
      latitude: 40.41678,
      sustainability_score: 0
    });
    setShowModal(true);
  };

  const handleEdit = (location) => {
    setCurrentLocation({...location});
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este local?')) {
      const { error } = await supabase
        .from('Location')
        .delete()
        .eq('id', id);
      
      if (error) {
        console.error('Error deleting location:', error);
        return;
      }
      
      setLocations(locations.filter(location => location.id !== id));
    }
  };

  const handleSave = async () => {
    try {
      // Define locationData without image initially
      let locationData = {
        name: currentLocation.name,
        address: currentLocation.address,
        description: currentLocation.description,
        email: currentLocation.email,
        phone_number: currentLocation.phone,
        opening_hours: currentLocation.schedule,
        status: currentLocation.status,
        // Use PostGIS ST_MakePoint function to create a proper geography point
        point: `SRID=4326;POINT(${currentLocation.longitude} ${currentLocation.latitude})`,
        sustainability_score: currentLocation.sustainability_score,
        location_type: currentLocation.location_type || null
      };

      // Handle image upload if a new file is selected
      if (currentLocation.image && currentLocation.image instanceof File) {
        // Create unique file name
        const fileExt = currentLocation.image.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
        // Update the path to include location-images subfolder
        const filePath = `location-images/${fileName}`;
        
        // Upload to Supabase storage
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('locations')
          .upload(filePath, currentLocation.image);
        
        if (uploadError) {
          console.error('Error uploading image:', uploadError);
          throw uploadError;
        }
        
        // Get the public URL
        const { data: publicURLData } = supabase.storage
          .from('locations')
          .getPublicUrl(filePath);
        
        // Add image URL to location data
        locationData.image_url = publicURLData.publicUrl;
      }

      if (currentLocation.id) {
        // Update existing location
        const { error } = await supabase
          .from('Location')
          .update(locationData)
          .eq('id', currentLocation.id);
        
        if (error) {
          console.error('Error updating location:', error);
          return;
        }
        
        // Update local state
        setLocations(locations.map(loc => 
          loc.id === currentLocation.id ? {
            ...loc, 
            ...currentLocation,
            image: locationData.image_url || loc.image
          } : loc
        ));
      } else {
        // Add new location
        const { data, error } = await supabase
          .from('Location')
          .insert(locationData)
          .select();
        
        if (error) {
          console.error('Error adding location:', error);
          return;
        }
        
        // Update with the returned data (to get the new ID)
        const newLocation = {
          ...currentLocation,
          id: data[0].id,
          image: locationData.image_url || null
        };
        
        setLocations([...locations, newLocation]);
      }
      
      setShowModal(false);
    } catch (error) {
      console.error('Error saving location:', error);
      alert('There was an error saving the location. Please try again.');
    }
  };

  // New handlers for petitions
  const handleAcceptPetition = async (petition) => {
    // Update the location status to Active (2)
    const { error } = await supabase
      .from('Location')
      .update({ 
        status: 2, // Active status (2)
      })
      .eq('id', petition.id);
    
    if (error) {
      console.error('Error accepting location petition:', error);
      return;
    }
    
    // Add to active locations
    const newLocation = {
      ...petition,
      status: 2, // Active status (2)
      statusText: 'Activo',
      sustainability_score: 0
    };
    
    setLocations([...locations, newLocation]);
    
    // Remove from petitions
    setPetitions(petitions.filter(p => p.id !== petition.id));
    
    // Close petition details if open
    if (selectedPetition && selectedPetition.id === petition.id) {
      setSelectedPetition(null);
    }
  };

  const handleRejectPetition = async (petitionId) => {
    // Delete the rejected location
    const { error } = await supabase
      .from('Location')
      .delete()
      .eq('id', petitionId);
    
    if (error) {
      console.error('Error rejecting location petition:', error);
      return;
    }
    
    // Remove from petitions
    setPetitions(petitions.filter(p => p.id !== petitionId));
    
    // Close petition details if open
    if (selectedPetition && selectedPetition.id === petitionId) {
      setSelectedPetition(null);
    }
  };

  const handleViewPetitionDetails = (petition) => {
    setSelectedPetition(petition);
  };

  const [locationTypes, setLocationTypes] = useState([]);

  // Fetch location types
  useEffect(() => {
    const fetchLocationTypes = async () => {
      const { data, error } = await supabase
        .from('LocationType')
        .select('id, name');
      
      if (error) {
        console.error('Error fetching location types:', error);
        return;
      }
      
      setLocationTypes(data || []);
    };
    
    fetchLocationTypes();
  }, []);

  // Then replace the hardcoded areas array
  const areas = ['Todas las zonas', ...locationTypes.map(type => type.name)];

  // Add this useEffect to handle the modal map
  useEffect(() => {
    if (showModal && modalMapContainer.current) {
      // Create new map instance for the modal
      if (!modalMap.current) {
        modalMap.current = new mapboxgl.Map({
          container: modalMapContainer.current,
          style: 'mapbox://styles/mapbox/streets-v12',
          center: [currentLocation.longitude || -2.934984, currentLocation.latitude || 43.262969],
          zoom: 12
        });
        
        // Add navigation controls
        modalMap.current.addControl(new mapboxgl.NavigationControl());
        
        // Add a marker for the current location
        const el = document.createElement('div');
        el.className = 'modal-marker';
        el.style.width = '24px';
        el.style.height = '24px';
        el.style.borderRadius = '50%';
        el.style.backgroundColor = '#3b82f6';
        el.style.border = '2px solid white';
        
        modalMarker.current = new mapboxgl.Marker(el)
          .setLngLat([currentLocation.longitude || -2.934984, currentLocation.latitude || 43.262969])
          .addTo(modalMap.current);
        
        // Add click event to update marker position
        modalMap.current.on('click', (e) => {
          const { lng, lat } = e.lngLat;
          modalMarker.current.setLngLat([lng, lat]);
          setCurrentLocation({
            ...currentLocation,
            longitude: lng,
            latitude: lat
          });
        });
      } else {
        // Update map and marker if they already exist
        modalMap.current.resize();
        modalMap.current.setCenter([currentLocation.longitude || -2.934984, currentLocation.latitude || 43.262969]);
        modalMarker.current.setLngLat([currentLocation.longitude || -2.934984, currentLocation.latitude || 43.262969]);
      }
    }
    
    return () => {
      if (!showModal && modalMap.current) {
        modalMap.current.remove();
        modalMap.current = null;
        modalMarker.current = null;
      }
    };
  }, [showModal, currentLocation.id]);

  return (
    <div className="flex flex-col h-full p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gestión de Locales</h1>
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode('table')}
            className={`flex items-center gap-2 py-2 px-4 rounded-lg ${
              viewMode === 'table' ? 'bg-blue-600 text-white' : 'bg-gray-100'
            }`}
          >
            <ListFilter size={18} />
            <span>Tabla</span>
          </button>
          <button
            onClick={() => setViewMode('map')}
            className={`flex items-center gap-2 py-2 px-4 rounded-lg ${
              viewMode === 'map' ? 'bg-blue-600 text-white' : 'bg-gray-100'
            }`}
          >
            <MapIcon size={18} />
            <span>Mapa</span>
          </button>
          <button 
            onClick={() => setShowPetitionsSection(!showPetitionsSection)}
            className="flex items-center gap-2 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 ml-2 relative"
          >
            <Bell size={18} />
            {petitions.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {petitions.length}
              </span>
            )}
            <span>Peticiones</span>
          </button>
        </div>
      </div>

      {/* Petitions Section */}
      {showPetitionsSection && (
        <div className="mb-6">
          <div className="bg-white rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Peticiones Pendientes</h2>
              <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                {petitions.length} peticiones
              </span>
            </div>
            
            {petitions.length > 0 ? (
              <div className="space-y-4">
                {petitions.map(petition => (
                  <div key={petition.id} className="border rounded-lg p-4 hover:bg-gray-50">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{petition.name}</h3>
                        <p className="text-sm text-gray-500">{petition.address}</p>
                        <p className="text-xs text-gray-400 mt-1">Solicitado: {petition.requestDate}</p>
                      </div>
                      <div className="flex gap-2">
                        <button 
                          onClick={() => handleViewPetitionDetails(petition)}
                          className="text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-2 py-1 rounded"
                        >
                          Detalles
                        </button>
                        <button 
                          onClick={() => handleAcceptPetition(petition)}
                          className="text-green-600 hover:text-green-800 bg-green-50 hover:bg-green-100 px-2 py-1 rounded"
                        >
                          <Check size={16} />
                        </button>
                        <button 
                          onClick={() => handleRejectPetition(petition.id)}
                          className="text-red-600 hover:text-red-800 bg-red-50 hover:bg-red-100 px-2 py-1 rounded"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center py-4 text-gray-500">No hay peticiones pendientes</p>
            )}
          </div>
        </div>
      )}

      {/* Petition Details Modal */}
      {selectedPetition && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-2xl max-h-screen overflow-y-auto p-6">
            <h2 className="text-xl font-bold mb-4">Detalles de la Petición</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre del Local</label>
                <p className="w-full px-3 py-2 border rounded-lg">{selectedPetition.name}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Dirección</label>
                <p className="w-full px-3 py-2 border rounded-lg">{selectedPetition.address}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
                  <p className="w-full px-3 py-2 border rounded-lg">{selectedPetition.phone}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <p className="w-full px-3 py-2 border rounded-lg">{selectedPetition.email}</p>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Horario</label>
                <p className="w-full px-3 py-2 border rounded-lg">{selectedPetition.schedule}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Área</label>
                <p className="w-full px-3 py-2 border rounded-lg">{selectedPetition.area}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                <p className="w-full px-3 py-2 border rounded-lg">{selectedPetition.description}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Longitud</label>
                  <p className="w-full px-3 py-2 border rounded-lg">{selectedPetition.longitude}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Latitud</label>
                  <p className="w-full px-3 py-2 border rounded-lg">{selectedPetition.latitude}</p>
                </div>
              </div>
              
              <div className="flex justify-end space-x-2 pt-4">
                <button
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg"
                  onClick={() => setSelectedPetition(null)}
                >
                  Cerrar
                </button>
                <button
                  className="px-4 py-2 bg-red-500 text-white rounded-lg flex items-center gap-2"
                  onClick={() => handleRejectPetition(selectedPetition.id)}
                >
                  <X size={16} />
                  Rechazar
                </button>
                <button
                  className="px-4 py-2 bg-green-500 text-white rounded-lg flex items-center gap-2"
                  onClick={() => handleAcceptPetition(selectedPetition)}
                >
                  <Check size={16} />
                  Aprobar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-4 mb-6">
        <div className="flex items-center px-3 py-2 bg-white rounded-lg border flex-1 min-w-64">
          <Search size={18} className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Buscar locales..."
            className="border-none outline-none w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="relative min-w-40">
          <div className="flex items-center gap-2 px-3 py-2 bg-white rounded-lg border cursor-pointer">
            <Filter size={18} className="text-gray-400" />
            <select 
              className="border-none outline-none w-full bg-transparent cursor-pointer"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value === 'Todos' ? 'Todos' : Number(e.target.value))}
            >
              {statuses.map(status => (
                <option key={status.code} value={status.code}>{status.text}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="relative min-w-40">
          <div className="flex items-center gap-2 px-3 py-2 bg-white rounded-lg border cursor-pointer">
            <MapPin size={18} className="text-gray-400" />
            <select 
              className="border-none outline-none w-full bg-transparent cursor-pointer"
              value={filterArea}
              onChange={(e) => setFilterArea(e.target.value)}
            >
              {areas.map(area => (
                <option key={area} value={area}>{area}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Table View */}
      {viewMode === 'table' && (
        <div className="flex-grow overflow-auto bg-white rounded-lg">
          {filteredLocations.length > 0 ? (
            <table className="min-w-full divide-y divide-gray-200">
              {/* Table content - existing code */}
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Local</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dirección</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Zona</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contacto</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sostenibilidad</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredLocations.map((location) => (
                  <tr key={location.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {/* Add image thumbnail */}
                        {location.image && (
                          <div className="flex-shrink-0 h-10 w-10 mr-3">
                            <img 
                              className="h-10 w-10 rounded-full object-cover" 
                              src={location.image} 
                              alt={location.name}
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = 'https://via.placeholder.com/40?text=No+Image';
                              }}
                            />
                          </div>
                        )}
                        <div className="flex flex-col">
                          <div className="font-medium text-gray-900">{location.name}</div>
                          <div className="text-sm text-gray-500">{location.schedule}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{location.address}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{location.area}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex flex-col">
                        <div>{location.phone}</div>
                        <div className="text-xs">{location.email}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        location.status === 2 ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {getStatusText(location.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                    {location.sustainability_score !== null ? (
                      (() => {
                        const { color, bgColor, label } = getSustainabilityInfo(location.sustainability_score);
                        return (
                          <div className="flex items-center">
                            <div 
                              className="w-2 h-8 rounded-l-full" 
                              style={{ backgroundColor: color }}
                            />
                            <div 
                              className="px-3 py-1 rounded-r-lg flex items-center"
                              style={{ backgroundColor: bgColor }}
                            >
                              <span className="font-medium" style={{ color }}>
                                {location.sustainability_score}
                              </span>
                              <span className="ml-1 text-xs text-gray-600">/ 100</span>
                            </div>
                            <span className="ml-2 text-xs text-gray-500">{label}</span>
                          </div>
                        );
                      })()
                    ) : (
                      <span className="text-gray-500 text-sm">No aplica</span>
                    )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex gap-3">
                        <button 
                          onClick={() => handleEdit(location)}
                          className="text-blue-600 hover:text-blue-900">
                          <Edit size={18} />
                        </button>
                        <button 
                          onClick={() => handleDelete(location.id)}
                          className="text-red-600 hover:text-red-900">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="flex flex-col items-center justify-center p-8 text-gray-500">
              <p>No se encontraron locales con los filtros actuales</p>
            </div>
          )}
        </div>
      )}

      {/* Map View */}
      {viewMode === 'map' && (
        <div className="flex-grow bg-white rounded-lg overflow-hidden">
          <div ref={mapContainer} style={{ width: '100%', height: '100%' }} />
        </div>
      )}

      {/* Modal for Add/Edit Location */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-all duration-300 ease-in-out">
          <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
            {/* Header */}
            <div className="p-6 border-b border-gray-200 dark:border-gray-700 sticky top-0 bg-blue-600 text-white rounded-t-2xl z-10">
              <h2 className="text-2xl font-bold">
                {currentLocation.id ? 'Editar Local' : 'Añadir Nuevo Local'}
              </h2>
              <p className="text-blue-100 mt-1 text-sm">
                Completa los detalles para {currentLocation.id ? 'actualizar este local' : 'crear un nuevo local'}
              </p>
            </div>
            
            {/* Form Content */}
            <div className="p-6 space-y-6">
              {/* Image Preview Section */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Imagen del Local</label>
                <div className="flex flex-col items-center gap-4">
                  {((typeof currentLocation.image === 'string' && currentLocation.image) || 
                     currentLocation.image_url || 
                     (currentLocation.image instanceof File)) && (
                    <div className="w-full h-48 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-700 flex items-center justify-center">
                      <img 
                        src={
                          currentLocation.image instanceof File ? 
                          URL.createObjectURL(currentLocation.image) : 
                          (typeof currentLocation.image === 'string' ? currentLocation.image : currentLocation.image_url)
                        } 
                        alt={currentLocation.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = 'https://via.placeholder.com/300x150?text=No+Image';
                        }}
                      />
                    </div>
                  )}
                  {!currentLocation.image && !currentLocation.image_url && !(currentLocation.image instanceof File) && (
                    <div className="w-full h-48 rounded-xl overflow-hidden border border-gray-200 border-dashed dark:border-gray-700 bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                      <div className="text-gray-400 flex flex-col items-center">
                        <MapPin size={48} strokeWidth={1.5} />
                        <p className="mt-2 text-sm">No hay imagen disponible</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-5">
                {/* Basic Information */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Nombre</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all outline-none"
                    placeholder="Nombre del local"
                    value={currentLocation.name}
                    onChange={(e) => setCurrentLocation({...currentLocation, name: e.target.value})}
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Descripción</label>
                  <textarea
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all outline-none resize-none"
                    rows="4"
                    placeholder="Describe el local"
                    value={currentLocation.description}
                    onChange={(e) => setCurrentLocation({...currentLocation, description: e.target.value})}
                  ></textarea>
                </div>

                {/* Address */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Dirección</label>
                  <div className="relative">
                    <input
                      type="text"
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all outline-none"
                      placeholder="Calle, número, código postal, ciudad"
                      value={currentLocation.address}
                      onChange={(e) => setCurrentLocation({...currentLocation, address: e.target.value})}
                    />
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                      <MapPin size={18} />
                    </span>
                  </div>
                </div>

                {/* Coordinates */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Longitud</label>
                    <input
                      type="number"
                      step="0.000001"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all outline-none"
                      placeholder="-3.70379"
                      value={currentLocation.longitude || ''}
                      onChange={(e) => setCurrentLocation({
                        ...currentLocation, 
                        longitude: parseFloat(e.target.value)
                      })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Latitud</label>
                    <input
                      type="number"
                      step="0.000001"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all outline-none"
                      placeholder="40.41678"
                      value={currentLocation.latitude || ''}
                      onChange={(e) => setCurrentLocation({
                        ...currentLocation, 
                        latitude: parseFloat(e.target.value)
                      })}
                    />
                  </div>
                </div>

                {/* Interactive Map for Point Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                    Ubicación en el Mapa (Haz clic para establecer el punto)
                  </label>
                  <div 
                    id="modal-map" 
                    className="w-full h-48 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-600"
                    ref={modalMapContainer}
                  ></div>
                </div>

                {/* Contact Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Teléfono</label>
                    <div className="relative">
                      <input
                        type="text"
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all outline-none"
                        placeholder="Ej: +34 911 234 567"
                        value={currentLocation.phone}
                        onChange={(e) => setCurrentLocation({...currentLocation, phone: e.target.value})}
                      />
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                        <Phone size={18} />
                      </span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Email</label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all outline-none"
                      placeholder="email@ejemplo.com"
                      value={currentLocation.email}
                      onChange={(e) => setCurrentLocation({...currentLocation, email: e.target.value})}
                    />
                  </div>
                </div>

                {/* Schedule */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Horario</label>
                  <div className="relative">
                    <input
                      type="text"
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all outline-none"
                      placeholder="Ej: L-V: 9:00-20:00, S-D: 10:00-14:00"
                      value={currentLocation.schedule}
                      onChange={(e) => setCurrentLocation({...currentLocation, schedule: e.target.value})}
                    />
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                      <Clock size={18} />
                    </span>
                  </div>
                </div>

                {/* Status and Type */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Estado</label>
                    <select
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all outline-none"
                      value={currentLocation.status}
                      onChange={(e) => setCurrentLocation({...currentLocation, status: Number(e.target.value)})}
                    >
                      <option value={2}>Activo</option>
                      <option value={3}>Inactivo</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Tipo de Local</label>
                    <select
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all outline-none"
                      value={currentLocation.location_type || ''}
                      onChange={(e) => setCurrentLocation({
                        ...currentLocation, 
                        location_type: e.target.value ? parseInt(e.target.value) : null,
                        area: locationTypes.find(t => t.id === parseInt(e.target.value))?.name || 'Sin categoría'
                      })}
                    >
                      <option value="">Seleccionar tipo</option>
                      {locationTypes.map(type => (
                        <option key={type.id} value={type.id}>{type.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Sustainability Score */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                    Puntuación de Sostenibilidad
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all outline-none"
                    placeholder="Puntuación de sostenibilidad"
                    value={currentLocation.sustainability_score}
                    onChange={(e) => setCurrentLocation({...currentLocation, sustainability_score: Math.max(0, Math.min(parseInt(e.target.value), 100)) || null})}
                  />
                </div>

                {/* Image Upload */}
                <div className="bg-gray-100 dark:bg-gray-700/30 p-5 rounded-xl border border-dashed border-gray-300 dark:border-gray-600">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Cambiar imagen</label>
                  <div className="flex items-center justify-center w-full">
                    <label className="flex flex-col items-center justify-center w-full h-24 bg-white dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 border-dashed rounded-xl cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-600/50 transition-all">
                      <div className="flex flex-col items-center justify-center pt-4 pb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500 mb-2"><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7"/><line x1="16" y1="5" x2="22" y2="5"/><line x1="19" y1="2" x2="19" y2="8"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          <span className="font-semibold text-blue-500">Haz clic para subir</span> 
                        </p>
                      </div>
                      <input 
                        type="file" 
                        accept="image/*"
                        className="hidden" 
                        onChange={(e) => setCurrentLocation({...currentLocation, image: e.target.files[0]})}
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Footer */}
            <div className="p-6 border-t border-gray-200 dark:border-gray-700 sticky bottom-0 bg-gray-50 dark:bg-gray-800 z-10">
              <div className="flex flex-col sm:flex-row justify-end gap-3">
                <button
                  className="px-4 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium rounded-xl transition-all focus:outline-none focus:ring-2 focus:ring-gray-300/30 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200 dark:focus:ring-gray-500/30"
                  onClick={() => setShowModal(false)}
                >
                  Cancelar
                </button>
                <button
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/30 flex items-center justify-center"
                  onClick={handleSave}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1.5"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>
                  Guardar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationsContent;