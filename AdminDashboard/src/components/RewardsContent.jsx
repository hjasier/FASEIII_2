import React, { useState, useEffect } from 'react';
import { Search, Plus, Edit, Trash2, Filter, Award, Check, X, Coins, Image } from 'lucide-react';
import { supabase } from '../hooks/supabaseClient';

const RewardsContent = () => {
  const [rewards, setRewards] = useState([]);
  const [filteredRewards, setFilteredRewards] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [currentReward, setCurrentReward] = useState(null);
  const [filterStatus, setFilterStatus] = useState('Todos');
  const [loading, setLoading] = useState(true);

  const statuses = ['Todos', 'Activo', 'Inactivo'];

  // Fetch rewards from Supabase
  useEffect(() => {
    const fetchRewards = async () => {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('Prize')
        .select('*');
      
      if (error) {
        console.error('Error fetching rewards:', error);
        setLoading(false);
        return;
      }
      
      // Transform the database data to match our component's expected format
      const formattedRewards = data.map(prize => ({
        id: prize.id,
        name: prize.name || prize.description.substring(0, 30) + '...', // Use description as name if not provided
        description: prize.description,
        pointsCost: prize.price,
        status: prize.status || 'Activo', // Default status if not in database
        redemptions: prize.redemptions || 0, // Default redemptions if not in database
        couponCode: prize.coupon_code,
        image: prize.image_url // Use the image_url from database
      }));
      
      setRewards(formattedRewards);
      setFilteredRewards(formattedRewards);
      setLoading(false);
    };
    
    fetchRewards();
  }, []);

  // Filter rewards based on search and filters
  useEffect(() => {
    let filtered = rewards;
    
    if (searchTerm) {
      filtered = filtered.filter(reward => 
        reward.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reward.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (filterStatus !== 'Todos') {
      filtered = filtered.filter(reward => reward.status === filterStatus);
    }
    
    setFilteredRewards(filtered);
  }, [searchTerm, filterStatus, rewards]);

  // Open modal to add new reward
  const handleAddNew = () => {
    setCurrentReward({
      id: null,
      name: '',
      description: '',
      pointsCost: 100,
      status: 'Activo',
      redemptions: 0,
      image: null
    });
    setShowModal(true);
  };

  // Open modal to edit existing reward
  const handleEdit = (reward) => {
    setCurrentReward({...reward});
    setShowModal(true);
  };

  // Delete reward
  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este premio?')) {
      const { error } = await supabase
        .from('Prize')
        .delete()
        .eq('id', id);
      
      if (error) {
        console.error('Error deleting reward:', error);
        return;
      }
      
      setRewards(rewards.filter(reward => reward.id !== id));
    }
  };

  // Save changes (new reward or edit)
  const handleSave = async () => {
    try {
      // Handle image upload first if a new file is selected
      let imageUrl = currentReward.image;
      
      if (currentReward.image instanceof File) {
        // Create unique file name
        const fileExt = currentReward.image.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
        // Specify the path to include prize-images subfolder
        const filePath = `prize-images/${fileName}`;
        
        // Upload to Supabase storage
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('prizes')
          .upload(filePath, currentReward.image);
        
        if (uploadError) {
          console.error('Error uploading image:', uploadError);
          throw uploadError;
        }
        
        // Get the public URL
        const { data: publicURLData } = supabase.storage
          .from('prizes')
          .getPublicUrl(filePath);
        
        imageUrl = publicURLData.publicUrl;
      }
      
      // Prepare data for Supabase - include all fields from the Prize table
      const prizeData = {
        price: currentReward.pointsCost,
        description: currentReward.description,
        image_url: imageUrl
        // No need to specify coupon_code as it's generated automatically
      };

      if (currentReward.id) {
        // Update existing reward
        const { data, error } = await supabase
          .from('Prize')
          .update(prizeData)
          .eq('id', currentReward.id)
          .select();
        
        if (error) {
          console.error('Error updating reward:', error);
          return;
        }
        
        // Update local state
        if (data && data[0]) {
          const updatedReward = {
            ...currentReward,
            pointsCost: data[0].price,
            description: data[0].description,
            couponCode: data[0].coupon_code,
            image: data[0].image_url,
            // Keep the UI-only fields that aren't in the database
            name: currentReward.name || data[0].description.substring(0, 30) + '...',
            status: currentReward.status,
            redemptions: currentReward.redemptions
          };
          
          setRewards(rewards.map(r => 
            r.id === currentReward.id ? updatedReward : r
          ));
        }
      } else {
        // Add new reward
        const { data, error } = await supabase
          .from('Prize')
          .insert(prizeData)
          .select();
        
        if (error) {
          console.error('Error adding reward:', error);
          return;
        }
        
        // Add to local state with DB-generated ID and coupon code
        if (data && data[0]) {
          const newReward = {
            id: data[0].id,
            pointsCost: data[0].price,
            description: data[0].description,
            couponCode: data[0].coupon_code,
            image: data[0].image_url,
            // UI-only fields
            name: currentReward.name || data[0].description.substring(0, 30) + '...',
            status: currentReward.status || 'Activo',
            redemptions: 0
          };
          
          setRewards([...rewards, newReward]);
        }
      }
      
      setShowModal(false);
    } catch (error) {
      console.error('Error saving prize:', error);
      alert('Error al guardar el premio. Por favor, inténtalo de nuevo.');
    }
  };

  return (
    <div className="flex flex-col h-full p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gestión de Premios</h1>
        <button 
          onClick={handleAddNew}
          className="flex items-center gap-2 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
        >
          <Plus size={18} />
          <span>Añadir Premio</span>
        </button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="flex items-center px-3 py-2 bg-white rounded-lg border flex-1 min-w-64">
          <Search size={18} className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Buscar premios..."
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

      {/* Rewards List */}
      <div className="flex-grow overflow-auto bg-white rounded-lg">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : filteredRewards.length > 0 ? (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Premio</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Costo en Puntos</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Canjes</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Código</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredRewards.map((reward) => (
                <tr key={reward.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {/* Add image thumbnail */}
                      {reward.image && (
                        <div className="flex-shrink-0 h-10 w-10 mr-3">
                          <img 
                            className="h-10 w-10 rounded-full object-cover" 
                            src={reward.image} 
                            alt={reward.name}
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = 'https://via.placeholder.com/40?text=No+Image';
                            }}
                          />
                        </div>
                      )}
                      <div className="flex flex-col">
                        <div className="font-medium text-gray-900">{reward.name}</div>
                        <div className="text-sm text-gray-500 truncate max-w-xs">{reward.description}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                    {reward.pointsCost} trotamundis
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      reward.status === 'Activo' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {reward.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {reward.redemptions} canjes
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span className="text-xs font-mono">{reward.couponCode?.substring(0, 8)}...</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex gap-3">
                      <button 
                        onClick={() => handleEdit(reward)}
                        className="text-blue-600 hover:text-blue-900">
                        <Edit size={18} />
                      </button>
                      <button 
                        onClick={() => handleDelete(reward.id)}
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
            <p>No se encontraron premios con los filtros actuales</p>
          </div>
        )}
      </div>

      {/* Modal for Add/Edit Reward */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-all duration-300 ease-in-out">
          <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
            {/* Header */}
            <div className="p-6 border-b border-gray-200 dark:border-gray-700 sticky top-0 bg-blue-600 text-white rounded-t-2xl z-10">
              <h2 className="text-2xl font-bold">
                {currentReward.id ? 'Editar Premio' : 'Añadir Nuevo Premio'}
              </h2>
              <p className="text-blue-100 mt-1 text-sm">
                Completa los detalles para {currentReward.id ? 'actualizar este premio' : 'crear un nuevo premio'}
              </p>
            </div>
            
            {/* Form Content */}
            <div className="p-6 space-y-6">
              <div className="space-y-5">
                {/* Name - UI only field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Nombre del Premio</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all outline-none"
                    placeholder="Ej: Entrada al museo"
                    value={currentReward.name}
                    onChange={(e) => setCurrentReward({...currentReward, name: e.target.value})}
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Solo para visualización en la interfaz</p>
                </div>

                {/* Description - This is stored in the database */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                    Descripción
                  </label>
                  <textarea
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all outline-none resize-none"
                    rows="4"
                    placeholder="Describe el premio de manera detallada"
                    value={currentReward.description}
                    onChange={(e) => setCurrentReward({...currentReward, description: e.target.value})}
                  ></textarea>
                </div>

                {/* Cost and Status */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                      Costo en Puntos
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        min="0"
                        step="5"
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all outline-none"
                        placeholder="100"
                        value={currentReward.pointsCost}
                        onChange={(e) => setCurrentReward({
                          ...currentReward, 
                          pointsCost: parseInt(e.target.value) || 0
                        })}
                      />
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">
                        <Coins size={18} />
                      </span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Estado</label>
                    <select
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all outline-none"
                      value={currentReward.status}
                      onChange={(e) => setCurrentReward({...currentReward, status: e.target.value})}
                    >
                      <option value="Activo">Activo</option>
                      <option value="Inactivo">Inactivo</option>
                    </select>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Solo para visualización en la interfaz</p>
                  </div>
                </div>

                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                    Imagen del Premio
                  </label>
                  
                  {/* Image Preview */}
                  {(currentReward.image instanceof File || (typeof currentReward.image === 'string' && currentReward.image)) && (
                    <div className="mb-4 border rounded-xl overflow-hidden w-full h-48">
                      <img 
                        src={currentReward.image instanceof File ? URL.createObjectURL(currentReward.image) : currentReward.image} 
                        alt={currentReward.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = 'https://via.placeholder.com/300x150?text=Sin+Imagen';
                        }}
                      />
                    </div>
                  )}
                  
                  {/* Upload Control */}
                  <div className="bg-gray-100 dark:bg-gray-700/30 p-5 rounded-xl border border-dashed border-gray-300 dark:border-gray-600">
                    <div className="flex items-center justify-center w-full">
                      <label className="flex flex-col items-center justify-center w-full h-24 bg-white dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 border-dashed rounded-xl cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-600/50 transition-all">
                        <div className="flex flex-col items-center justify-center pt-4 pb-4">
                          <Image className="text-blue-500 mb-2" size={24} />
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            <span className="font-semibold text-blue-500">Haz clic para subir</span> 
                          </p>
                        </div>
                        <input 
                          type="file" 
                          accept="image/*"
                          className="hidden" 
                          onChange={(e) => setCurrentReward({...currentReward, image: e.target.files[0]})}
                        />
                      </label>
                    </div>
                  </div>
                </div>

                {/* Redemption Info - Read Only */}
                {currentReward.id && (
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl border border-blue-100 dark:border-blue-800/30">
                    <div className="flex items-center gap-2 mb-2">
                      <Award className="text-blue-600 dark:text-blue-400" size={18} />
                      <h3 className="text-sm font-medium text-blue-700 dark:text-blue-300">Detalles del premio</h3>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      {currentReward.couponCode && (
                        <div>
                          <span className="block text-gray-500 dark:text-gray-400">Código único</span>
                          <span className="font-mono text-gray-800 dark:text-gray-200">{currentReward.couponCode?.substring(0, 12)}...</span>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Este código se genera automáticamente</p>
                        </div>
                      )}
                      <div>
                        <span className="block text-gray-500 dark:text-gray-400">Canjes realizados</span>
                        <span className="font-medium text-gray-800 dark:text-gray-200">{currentReward.redemptions || 0}</span>
                      </div>
                    </div>
                  </div>
                )}
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

export default RewardsContent;