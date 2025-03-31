import React, { useState, useEffect } from 'react';
import { useMonsters } from '../../hooks/useMonsters';

const MonsterForm = ({ monster, onSave, onCancel }) => {
  const { monsters } = useMonsters();
  const [formData, setFormData] = useState({
    name: '',
    common_locations: [],
    description: '',
    drops: [],
    id_num: 0,
    image: ''
  });

  const [errors, setErrors] = useState({
    name: '',
    description: '',
    common_locations: '',
    drops: '',
    image: ''
  });

  const [locationsInput, setLocationsInput] = useState('');
  const [dropsInput, setDropsInput] = useState('');
  const [previewImage, setPreviewImage] = useState('');

  useEffect(() => {
    let nextId = 1;
    if (monsters && monsters.length > 0) {
      nextId = Math.max(...monsters.map(m => m.id_num)) + 1;
    }

    if (monster) {
      setFormData({
        name: monster.name || '',
        common_locations: monster.common_locations || [],
        description: monster.description || '',
        drops: monster.drops || [],
        id_num: monster.id_num || nextId,
        image: monster.image || ''
      });
      setLocationsInput((monster.common_locations || []).join(', '));
      setDropsInput((monster.drops || []).join(', '));
      setPreviewImage(monster.image || '');
    } else {
      setFormData({
        name: '',
        common_locations: [],
        description: '',
        drops: [],
        id_num: nextId,
        image: ''
      });
      setLocationsInput('');
      setDropsInput('');
      setPreviewImage('');
    }
  }, [monster, monsters]);

  const validateField = (name, value) => {
    let error = '';
    switch (name) {
      case 'name':
        if (!value.trim()) {
          error = 'El nombre no puede estar vacío.';
        } else if (value.length > 32) {
          error = 'El nombre no puede tener más de 32 caracteres.';
        }
        break;
      case 'description':
        if (!value.trim()) {
          error = 'La descripción no puede estar vacía.';
        }
        break;
      case 'common_locations':
        const locationRegex = /^.+,.+$/; // Permite cualquier texto separado por una coma
        if (!locationRegex.test(value)) {
          error = 'Debe haber al menos dos ubicaciones separadas por una coma.';
        }
        break;
      case 'drops':
        if (!value.trim()) {
          error = 'Debe haber al menos un drop separado por comas.';
        }
        break;
      case 'image':
        const imageRegex = /\.(png|jpg|webm)$/i;
        if (!imageRegex.test(value)) {
          error = 'La URL de la imagen debe terminar en .png, .jpg o .webm.';
        }
        break;
      default:
        break;
    }
    setErrors(prevErrors => ({ ...prevErrors, [name]: error }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'image') {
      setFormData({ ...formData, [name]: value });
      setPreviewImage(value);
      validateField(name, value);
    } else if (name === 'common_locations') {
      setLocationsInput(value);
      validateField(name, value);
      const locationsArray = value.split(',').map(loc => loc.trim()).filter(loc => loc !== '');
      setFormData({ ...formData, common_locations: locationsArray });
    } else if (name === 'drops') {
      setDropsInput(value);
      validateField(name, value);
      const dropsArray = value.split(',').map(drop => drop.trim()).filter(drop => drop !== '');
      setFormData({ ...formData, drops: dropsArray });
    } else {
      setFormData({ ...formData, [name]: value });
      validateField(name, value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.values(errors).some(error => error)) {
      alert('Por favor, corrige los errores antes de enviar el formulario.');
      return;
    }
    if (!formData.name.trim() || !formData.description.trim()) {
      alert('El nombre y la descripción no pueden estar vacíos.');
      return;
    }
    onSave({ ...formData, category: 'monster' });
  };

  return (
    <div className="animate-fadeIn">
      <h2 className="text-2xl font-bold text-blue-400 mb-6 pb-2 border-b border-gray-700">
        {monster ? 'Editar Monstruo' : 'Añadir Nuevo Monstruo'}
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Nombre */}
        <div className="form-group">
          <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">Nombre:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className={`w-full bg-gray-700 text-gray-100 border ${errors.name ? 'border-red-500' : 'border-gray-600'} rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
            placeholder="Nombre del monstruo"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>
        
        {/* ID Numérico (ahora deshabilitado) */}
        <div className="form-group">
          <label htmlFor="id_num" className="block text-sm font-medium text-gray-300 mb-1">ID Numérico:</label>
          <input
            type="number"
            id="id_num"
            name="id_num"
            value={formData.id_num}
            disabled
            className="w-full bg-gray-800 text-gray-400 border border-gray-700 rounded-lg px-3 py-2 cursor-not-allowed"
          />
          <p className="text-xs text-gray-500 mt-1">ID generado automáticamente</p>
        </div>
        
        {/* Descripción */}
        <div className="form-group">
          <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-1">Descripción:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows="3"
            className={`w-full bg-gray-700 text-gray-100 border ${errors.description ? 'border-red-500' : 'border-gray-600'} rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none`}
            placeholder="Descripción detallada del monstruo"
          />
          {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
        </div>
        
        {/* Ubicaciones */}
        <div className="form-group">
          <label htmlFor="common_locations" className="block text-sm font-medium text-gray-300 mb-1">
            Ubicaciones (separadas por comas):
          </label>
          <input
            type="text"
            id="common_locations"
            name="common_locations"
            value={locationsInput}
            onChange={handleChange}
            className={`w-full bg-gray-700 text-gray-100 border ${errors.common_locations ? 'border-red-500' : 'border-gray-600'} rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
            placeholder="Ej: Llanura de Hyrule, Montaña de la Muerte"
          />
          {errors.common_locations && <p className="text-red-500 text-sm mt-1">{errors.common_locations}</p>}
          
          {/* Mostrar las ubicaciones como etiquetas */}
          {formData.common_locations.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.common_locations.map((location, index) => (
                <span key={index} className="bg-blue-900/40 text-blue-200 text-xs px-2 py-1 rounded-full">
                  {location}
                </span>
              ))}
            </div>
          )}
        </div>
        
        {/* Objetos que deja */}
        <div className="form-group">
          <label htmlFor="drops" className="block text-sm font-medium text-gray-300 mb-1">
            Objetos que deja (separados por comas):
          </label>
          <input
            type="text"
            id="drops"
            name="drops"
            value={dropsInput}
            onChange={handleChange}
            className={`w-full bg-gray-700 text-gray-100 border ${errors.drops ? 'border-red-500' : 'border-gray-600'} rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
            placeholder="Ej: Cuerno, Garra, Colmillo"
          />
          {errors.drops && <p className="text-red-500 text-sm mt-1">{errors.drops}</p>}
          
          {/* Mostrar los objetos como etiquetas */}
          {formData.drops.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.drops.map((drop, index) => (
                <span key={index} className="bg-purple-900/40 text-purple-200 text-xs px-2 py-1 rounded-full">
                  {drop}
                </span>
              ))}
            </div>
          )}
        </div>
        
        {/* URL de la imagen */}
        <div className="form-group">
          <label htmlFor="image" className="block text-sm font-medium text-gray-300 mb-1">URL de la imagen:</label>
          <input
            type="text"
            id="image"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className={`w-full bg-gray-700 text-gray-100 border ${errors.image ? 'border-red-500' : 'border-gray-600'} rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
            placeholder="https://ejemplo.com/imagen.jpg"
          />
          {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image}</p>}
          
          {/* Vista previa de la imagen */}
          {previewImage && (
            <div className="mt-2 relative pt-[75%] overflow-hidden rounded-lg border border-gray-700 bg-gray-700">
              <img 
                src={previewImage} 
                alt="Vista previa" 
                className="absolute inset-0 w-full h-full object-contain p-2" 
                onError={() => setPreviewImage('')}
              />
            </div>
          )}
        </div>
        
        {/* Botones de acción */}
        <div className="flex justify-end space-x-3 pt-4 border-t border-gray-700">
          {onCancel && (
            <button 
              type="button" 
              onClick={onCancel} 
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors duration-300"
            >
              Cancelar
            </button>
          )}
          <button 
            type="submit" 
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-300 flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            {monster ? 'Actualizar' : 'Añadir'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default MonsterForm;