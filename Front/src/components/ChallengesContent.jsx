import React, { useState, useEffect, useRef } from 'react';
import { Search, Plus, Edit, Trash2, Filter, Calendar, Clock, Users, Image, Tag, Check, X, Award } from 'lucide-react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { supabase } from '../hooks/supabaseClient';
// Replace GeoJSON with WKB import
import WKB from 'ol/format/WKB';

// Set your Mapbox token
mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

// Create WKB format instance instead of GeoJSON
const wkbFormat = new WKB();

const ChallengesContent = () => {
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [challengeTypes, setChallengeTypes] = useState([]);
  const [completionTypes, setCompletionTypes] = useState([]);
  const [locations, setLocations] = useState([]);

  // Fetch locations
  useEffect(() => {
    const fetchLocations = async () => {
      const { data, error } = await supabase
        .from('Location')
        .select('id, name, LocationType(id, name), address, point');

      if (error) {
        console.error('Error fetching locations:', error);
        return;
      }

      console.log('Locations data:', data);
      setLocations(data || []);
    };

    fetchLocations();
  }, []);

  // Fetch challenge types
  useEffect(() => {
    const fetchChallengeTypes = async () => {
      const { data, error } = await supabase
        .from('ChallengeType')
        .select('*');

      if (error) {
        console.error('Error fetching challenge types:', error);
        return;
      }

      setChallengeTypes(data);
    };

    fetchChallengeTypes();
  }, []);

  // Fetch completion types
  useEffect(() => {
    const fetchCompletionTypes = async () => {
      const { data, error } = await supabase
        .from('CompletionType')
        .select('*');

      if (error) {
        console.error('Error fetching completion types:', error);
        return;
      }
      console.log('Completion types data:', data);
      setCompletionTypes(data);

    };

    fetchCompletionTypes();
  }, []);

  // Fetch challenges
  useEffect(() => {
    const fetchChallenges = async () => {
      setLoading(true);

      const { data, error } = await supabase
        .from('Challenge')
        .select(`
          *,
          ChallengeType:type (type),
          Location:location (name, address, point)
        `);

      if (error) {
        console.error('Error fetching challenges:', error);
        setLoading(false);
        return;
      }

      console.log('Raw challenge data from Supabase:', data);

      if (!data || data.length === 0) {
        console.warn('No challenges found in database');
        setLoading(false);
        return;
      }


      // Map data to match component's expected structure
      const formattedChallenges = data.map(challenge => {
        let longitude = -2.934983;  // Default longitude
        let latitude = 43.262995;   // Default latitude

        if (challenge.point) {
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
          id: challenge.id,
          title: challenge.name || 'Sin título',
          description: challenge.description || 'Sin descripción',
          points: challenge.reward || 0,
          priority: challenge.priority,
          cooldown_time: challenge.cooldown_time,
          cooldown_time_text: challenge.cooldown_time ? secondsToDhms(challenge.cooldown_time) : 'Sin límite',
          status: challenge.active ? 'Activo' : 'Inactivo',
          completions: 0, // You might want to fetch this from AcceptedChallenge
          abandonment: 0, // This would need a separate query
          completion_type: challenge.completion_type,
          category: challenge.ChallengeType?.type || 'Sin categoría',
          coverUrl: challenge.cover_url || '',
          type: challenge.type,
          location: challenge.location,
          longitude: longitude,
          latitude: latitude,
          repeatable: challenge.repeatable || false,
          expiration_date: challenge.expiration_date,
        }
      });

      console.log('Formatted challenges:', formattedChallenges);
      setChallenges(formattedChallenges);
      setLoading(false);
    };

    fetchChallenges();
  }, []);

  const secondsToDhms = (seconds) => {
    let d = Math.floor(seconds / 86400);
    let h = Math.floor(seconds % 86400 / 3600);
    let m = Math.floor(seconds % 86400 % 3600 / 60);
    let s = Math.floor(seconds % 86400 % 3600 % 60);

    let dDisplay = d > 0 ? d + "d " : "";
    var hDisplay = h > 0 ? h + "h " : "";
    var mDisplay = m > 0 ? m + "m " : "";
    var sDisplay = s > 0 ? s + "s" : "";
    return (dDisplay + hDisplay + mDisplay + sDisplay).trim();
  }

  const translateChallengeType = (type) => {
    switch (type) {
      case 'consume':
        return 'Consumo';
      case 'visit':
        return 'Visita';
      case 'route':
        return 'Ruta';
    }
  }

  const translateCompletionType = (type) => {
    switch (type) {
      case 'QR': return 'QR';
      case 'GPS': return 'Punto GPS';
      case 'GPS-ROUTE': return 'Ruta GPS';
      case 'PHOTO': return 'Foto';
    }
  }

  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [currentChallenge, setCurrentChallenge] = useState({
    id: null, // Let Supabase generate the ID
    title: '',
    description: '',
    points: 50,
    priority: 5,
    status: 'Activo',
    completions: 0,
    abandonment: 0,
    completion_type: null,
    category: challengeTypes.length > 0 ? challengeTypes[0].type : '',
    coverUrl: '',
    repeatable: false,
    cooldown_time: null,
    location: null, // Initialize location as null
    longitude: -2.934984, // Default longitude
    latitude: 43.262969, // Default latitude
    expiration_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // 30 days from now
  });
  const [filterStatus, setFilterStatus] = useState('Todos');

  const statuses = ['Todos', 'Activo', 'Inactivo'];
  const categories = ['Cultural', 'Gastronomía', 'Histórico', 'Arte', 'Naturaleza', 'Aventura'];

  // Función para filtrar retos
  const filteredChallenges = challenges.filter(challenge => {
    const matchesSearch = challenge.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      challenge.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'Todos' || challenge.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  // Add new challenge - update to include location
  const handleAddNew = () => {
    setCurrentChallenge({
      id: null, // Let Supabase generate the ID
      title: '',
      description: '',
      points: 50,
      priority: 5,
      status: 'Activo',
      completions: 0,
      abandonment: 0,
      completion_type: completionTypes.length > 0 ? completionTypes[0].id : null,
      category: challengeTypes.length > 0 ? challengeTypes[0].type : '',
      coverUrl: '',
      repeatable: false,
      cooldown_time: null,
      location: null, // Initialize location as null
      longitude: -2.934984, // Default longitude
      latitude: 43.262969, // Default latitude
      expiration_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
    });
    setShowModal(true);
  };

  // Add this with the other refs at the beginning of the component
  const modalMapContainer = useRef(null);
  const modalMap = useRef(null);
  const modalMarker = useRef(null);

  // Add this useEffect to handle the modal map
  useEffect(() => {
    if (showModal && modalMapContainer.current) {
      // Create new map instance for the modal
      if (!modalMap.current) {
        modalMap.current = new mapboxgl.Map({
          container: modalMapContainer.current,
          style: 'mapbox://styles/mapbox/streets-v12',
          center: [currentChallenge.longitude || -2.934984, currentChallenge.latitude || 43.262969],
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
          .setLngLat([currentChallenge.longitude || -2.934984, currentChallenge.latitude || 43.262969])
          .addTo(modalMap.current);

        // Add click event to update marker position
        modalMap.current.on('click', (e) => {
          const { lng, lat } = e.lngLat;
          modalMarker.current.setLngLat([lng, lat]);
          setCurrentChallenge({
            ...currentChallenge,
            longitude: lng,
            latitude: lat
          });
        });
      } else {
        // Update map and marker if they already exist
        modalMap.current.resize();
        modalMap.current.setCenter([currentChallenge.longitude || -2.934984, currentChallenge.latitude || 43.262969]);
        modalMarker.current.setLngLat([currentChallenge.longitude || -2.934984, currentChallenge.latitude || 43.262969]);
      }
    }

    return () => {
      if (!showModal && modalMap.current) {
        modalMap.current.remove();
        modalMap.current = null;
        modalMarker.current = null;
      }
    };
  }, [showModal, currentChallenge.id]);

  // Abrir modal para editar reto existente
  const handleEdit = (challenge) => {
    setCurrentChallenge({ ...challenge });
    setShowModal(true);
  };

  const uploadImage = async (file) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
    const filePath = `challenge-images/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('challenges')
      .upload(filePath, file);

    if (uploadError) {
      console.error('Error uploading image:', uploadError);
      return null;
    }

    const { data } = supabase.storage.from('challenges').getPublicUrl(filePath);
    return data.publicUrl;
  };

  // Save changes - update to include location
  const handleSave = async () => {
    const challengeData = {
      name: currentChallenge.title,
      description: currentChallenge.description,
      reward: currentChallenge.points,
      priority: currentChallenge.priority,
      active: currentChallenge.status === 'Activo',
      type: parseInt(currentChallenge.type),  // Make sure this is the ID, not the string
      completion_type: currentChallenge.completion_type,
      location: currentChallenge.location,
      cover_url: currentChallenge.coverUrl,
      repeatable: currentChallenge.repeatable,
      cooldown_time: parseInt(currentChallenge.cooldown_time) || null,
      expiration_date: currentChallenge.expiration_date
    };

    if (currentChallenge.image) {
      const imageUrl = await uploadImage(currentChallenge.image);
      if (imageUrl) {
        challengeData.cover_url = imageUrl;
      }
    }

    if (currentChallenge.id) {
      // Update existing challenge
      const { error } = await supabase
        .from('Challenge')
        .update(challengeData)
        .eq('id', currentChallenge.id);

      if (error) {
        console.error('Error updating challenge:', error);
        return;
      }

      setChallenges(challenges.map(c =>
        c.id === currentChallenge.id ? { ...c, ...currentChallenge } : c
      ));
    } else {
      // Add new challenge
      const { data, error } = await supabase
        .from('Challenge')
        .insert(challengeData)
        .select();

      if (error) {
        console.error('Error adding challenge:', error);
        return;
      }

      const newChallenge = {
        ...currentChallenge,
        id: data[0].id
      };

      setChallenges([...challenges, newChallenge]);
    }

    setShowModal(false);
  };

  // Delete challenge
  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este reto?')) {
      const { error } = await supabase
        .from('Challenge')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting challenge:', error);
        return;
      }

      setChallenges(challenges.filter(challenge => challenge.id !== id));
    }
  };

  return (
    <div className="flex flex-col h-full p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gestión de Retos</h1>
        <button
          onClick={handleAddNew}
          className="flex items-center gap-2 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
        >
          <Plus size={18} />
          <span>Añadir Reto</span>
        </button>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="flex items-center px-3 py-2 bg-white rounded-lg border flex-1 min-w-64">
          <Search size={18} className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Buscar retos..."
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
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              {statuses.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Challenges List */}
      <div className="flex-grow overflow-auto bg-white rounded-lg">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : filteredChallenges.length > 0 ? (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reto</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Puntos</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prioridad</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cooldown</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Completados</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredChallenges.map((challenge) => (
                <tr key={challenge.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col">
                      <div className="font-medium text-gray-900">{challenge.title}</div>
                      <div className="text-sm text-gray-500">{challenge.category}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">{challenge.points} trotamundis</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{challenge.priority} / 10</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{challenge.cooldown_time_text}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${challenge.status === 'Activo' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                      {challenge.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex flex-col">
                      <div>{challenge.completions} completados</div>
                      <div className="text-xs text-red-500">{challenge.abandonment} abandonos</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleEdit(challenge)}
                        className="text-blue-600 hover:text-blue-900">
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(challenge.id)}
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
            <p>No se encontraron retos con los filtros actuales</p>
          </div>
        )}
      </div>

      {/* Modal for Add/Edit Challenge */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-all duration-300 ease-in-out">
          <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
            {/* Header */}
            <div className="p-6 border-b border-gray-200 dark:border-gray-700 sticky top-0 bg-blue-600 text-white rounded-t-2xl z-10">
              <h2 className="text-2xl font-bold">
                {currentChallenge.id ? 'Editar Reto' : 'Añadir Nuevo Reto'}
              </h2>
              <p className="text-blue-100 mt-1 text-sm">
                Completa los detalles para {currentChallenge.id ? 'actualizar este reto' : 'crear un nuevo reto'}
              </p>
            </div>

            {/* Form Content */}
            <div className="p-6 space-y-6">
              {/* Image Preview Section */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Imagen del Reto</label>
                <div className="flex flex-col items-center gap-4">
                  {(currentChallenge.coverUrl || currentChallenge.image) && (
                    <div className="w-full h-48 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-700 flex items-center justify-center">
                      <img
                        src={currentChallenge.image ? URL.createObjectURL(currentChallenge.image) : currentChallenge.coverUrl}
                        alt={currentChallenge.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  {!currentChallenge.coverUrl && !currentChallenge.image && (
                    <div className="w-full h-48 rounded-xl overflow-hidden border border-gray-200 border-dashed dark:border-gray-700 bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                      <div className="text-gray-400 flex flex-col items-center">
                        <Image size={48} strokeWidth={1.5} />
                        <p className="mt-2 text-sm">No hay imagen disponible</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-5">
                {/* Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Título</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all outline-none"
                    placeholder="Ingresa un título atractivo"
                    value={currentChallenge.title}
                    onChange={(e) => setCurrentChallenge({ ...currentChallenge, title: e.target.value })}
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Descripción</label>
                  <textarea
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all outline-none resize-none"
                    rows="4"
                    placeholder="Describe el reto de manera clara y motivadora"
                    value={currentChallenge.description}
                    onChange={(e) => setCurrentChallenge({ ...currentChallenge, description: e.target.value })}
                  ></textarea>
                </div>

                {/* Challenge Type Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Tipo de Reto</label>
                  <select
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all outline-none"
                    value={currentChallenge.type || ''}
                    onChange={(e) => setCurrentChallenge({ ...currentChallenge, type: e.target.value })}
                  >
                    {challengeTypes.map((chType) => (
                      <option key={chType.id} value={chType.id}>
                        {translateChallengeType(chType.type)}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Completion Type Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Tipo de Completado</label>
                  <select
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all outline-none"
                    value={currentChallenge.completion_type || ''}
                    onChange={(e) => setCurrentChallenge({ ...currentChallenge, completion_type: parseInt(e.target.value) })}
                  >
                    {completionTypes.map((compType) => (
                      <option key={compType.id} value={compType.id}>
                        {translateCompletionType(compType.type)}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Conditional Location Select Field */}
                {currentChallenge.completion_type && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                      Seleccionar Ubicación
                    </label>
                    <select
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all outline-none"
                      value={currentChallenge.location || ''}
                      onChange={(e) => setCurrentChallenge({ ...currentChallenge, location: e.target.value })}
                    >
                      <option value="">
                        {currentChallenge.completion_type === 3 ? 'Selecciona una ruta' : 'Selecciona una ubicación'}
                      </option>
                      {locations
                        .filter((loc) =>
                          currentChallenge.completion_type === 3
                            ? loc.LocationType.name === 'route'
                            : loc.LocationType.name !== 'route'
                        )
                        .map((loc) => (
                          <option key={loc.id} value={loc.id}>
                            {loc.name}
                          </option>
                        ))}
                    </select>
                  </div>
                )}

                {/* Category Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Categoría</label>
                  <select
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all outline-none"
                    value={currentChallenge.category || ''}
                    onChange={(e) => setCurrentChallenge({ ...currentChallenge, category: e.target.value })}
                  >
                    {categories.map((cat, index) => (
                      <option key={index} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Points */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                    Puntos de recompensa
                  </label>
                  <input
                    type="number"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all outline-none"
                    placeholder="Ingresa la cantidad de puntos"
                    value={currentChallenge.points}
                    onChange={(e) =>
                      setCurrentChallenge({
                        ...currentChallenge,
                        points: parseInt(e.target.value) || 0
                      })
                    }
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="flex items-center">
                    <input
                      id="repeatable"
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      checked={currentChallenge.repeatable}
                      onChange={(e) =>
                        setCurrentChallenge({
                          ...currentChallenge,
                          repeatable: e.target.checked,
                          // Initialize cooldown if switching to repeatable; clear if not
                          cooldown_time: e.target.checked ? currentChallenge.cooldown_time || 3600 : null,
                          cooldown_time_text: e.target.checked ? secondsToDhms(currentChallenge.cooldown_time || 3600) : 'Sin límite'
                        })
                      }
                    />
                    <label htmlFor="repeatable" className="ml-2 block text-sm text-gray-700">
                      ¿Se puede repetir?
                    </label>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                      Prioridad
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="10"
                      placeholder="5"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all outline-none"
                      value={currentChallenge.priority}
                      onChange={(e) =>
                        setCurrentChallenge({
                          ...currentChallenge,
                          priority: e.target.value
                        })
                      }>
                    </input>
                  </div>
                </div>
                {currentChallenge.repeatable && (
                  <div className="mt-5">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                      Tiempo de espera (segundos)
                    </label>
                    <input
                      type="number"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all outline-none"
                      placeholder="Ingresa el tiempo en segundos"
                      value={currentChallenge.cooldown_time || 0}
                      onChange={(e) =>
                        setCurrentChallenge({
                          ...currentChallenge,
                          cooldown_time: e.target.value,
                          cooldown_time_text: secondsToDhms(e.target.value) || 'Sin límite'
                        })
                      }
                    />
                  </div>
                )}
                {/* Image Upload - Updated */}
                <div className="bg-gray-100 dark:bg-gray-700/30 p-5 rounded-xl border border-dashed border-gray-300 dark:border-gray-600">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Cambiar imagen</label>
                  <div className="flex items-center justify-center w-full">
                    <label className="flex flex-col items-center justify-center w-full h-24 bg-white dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 border-dashed rounded-xl cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-600/50 transition-all">
                      <div className="flex flex-col items-center justify-center pt-4 pb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500 mb-2"><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7" /><line x1="16" y1="5" x2="22" y2="5" /><line x1="19" y1="2" x2="19" y2="8" /><circle cx="9" cy="9" r="2" /><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" /></svg>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          <span className="font-semibold text-blue-500">Haz clic para subir</span>
                        </p>
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => setCurrentChallenge({ ...currentChallenge, image: e.target.files[0] })}
                      />
                    </label>
                  </div>
                </div>

                {/* Image URL */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">URL de Imagen</label>
                  <div className="relative">
                    <input
                      type="text"
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all outline-none"
                      placeholder="https://example.com/image.jpg"
                      value={currentChallenge.coverUrl || ''}
                      onChange={(e) => setCurrentChallenge({ ...currentChallenge, coverUrl: e.target.value })}
                    />
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" /><circle cx="9" cy="9" r="2" /><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" /></svg>
                    </span>
                  </div>
                </div>

                {/* Continue with existing form fields... */}
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
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1.5"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" /><polyline points="17 21 17 13 7 13 7 21" /><polyline points="7 3 7 8 15 8" /></svg>
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

export default ChallengesContent;