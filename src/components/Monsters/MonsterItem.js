import React, { useState } from 'react';
import Modal from '../common/Modal';

const MonsterItem = ({ monster, onEdit, onDelete }) => {
  const [showModal, setShowModal] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleItemClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <>
      {/* Tarjeta para la lista */}
      <div 
        className="bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-700 hover:border-blue-500/50 transition-all duration-300 cursor-pointer hover:-translate-y-2 hover:shadow-blue-500/20 group"
        onClick={handleItemClick}
      >
        {/* Contenedor de imagen con relación 4:3 */}
        <div className="relative pt-[75%] overflow-hidden bg-gray-700">
          {monster.image && !imageError ? (
            <img 
              src={monster.image} 
              alt={monster.name} 
              className="absolute inset-0 w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-700 p-2" 
              onError={handleImageError}
            />
          ) : (
            <div className="absolute inset-0 w-full h-full bg-gray-700 flex items-center justify-center text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-0 group-hover:opacity-70 transition-opacity duration-300"></div>
        </div>
        
        <div className="p-4">
          <h3 className="text-blue-400 font-bold text-lg mb-1 group-hover:text-blue-300 transition-colors duration-300">{monster.name}</h3>
          <p className="text-gray-400 text-sm">{monster.category}</p>
        </div>
      </div>

      {/* Modal de detalles */}
      {showModal && (
        <Modal isOpen={showModal} onClose={handleCloseModal}>
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-blue-400 mb-2">{monster.name}</h2>
              <div className="h-1 w-24 bg-blue-500 mx-auto rounded-full"></div>
            </div>
            
            {/* Imagen en el modal con mejor manejo para baja resolución */}
            <div className="img-hover-zoom rounded-xl overflow-hidden highlight-pulse max-w-md mx-auto bg-gray-800">
              <div className="relative pt-[75%] bg-gray-700">
                {monster.image && !imageError ? (
                  <img 
                    src={monster.image} 
                    alt={monster.name} 
                    className="absolute inset-0 w-full h-full object-contain p-4 image-rendering-smooth" 
                    onError={handleImageError}
                  />
                ) : (
                  <div className="absolute inset-0 w-full h-full bg-gray-700 flex items-center justify-center text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                )}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div style={{animationDelay: '0.1s'}} className="bg-gray-800/50 p-4 rounded-lg reveal-element">
                <p className="text-blue-400 font-medium mb-1">ID</p>
                <p className="text-gray-300">{monster.id_num}</p>
              </div>
              
              <div style={{animationDelay: '0.2s'}} className="bg-gray-800/50 p-4 rounded-lg reveal-element">
                <p className="text-blue-400 font-medium mb-1">Categoría</p>
                <p className="text-gray-300">{monster.category}</p>
              </div>
              
              <div style={{animationDelay: '0.3s'}} className="bg-gray-800/50 p-4 rounded-lg col-span-1 md:col-span-2 reveal-element">
                <p className="text-blue-400 font-medium mb-1">Descripción</p>
                <p className="text-gray-300">{monster.description}</p>
              </div>
              
              {monster.common_locations && monster.common_locations.length > 0 && (
                <div style={{animationDelay: '0.4s'}} className="bg-gray-800/50 p-4 rounded-lg reveal-element">
                  <p className="text-blue-400 font-medium mb-1">Ubicaciones</p>
                  <div className="flex flex-wrap gap-2">
                    {monster.common_locations.map((location, index) => (
                      <span key={index} className="bg-gray-700 px-3 py-1 rounded-full text-sm text-gray-300">
                        {location}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {monster.drops && monster.drops.length > 0 && (
                <div style={{animationDelay: '0.5s'}} className="bg-gray-800/50 p-4 rounded-lg reveal-element">
                  <p className="text-blue-400 font-medium mb-1">Objetos que deja</p>
                  <div className="flex flex-wrap gap-2">
                    {monster.drops.map((drop, index) => (
                      <span key={index} className="bg-blue-900/50 px-3 py-1 rounded-full text-sm text-blue-200">
                        {drop}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex justify-end space-x-4 mt-8">
              <button 
                onClick={() => {
                  onEdit(monster);
                  handleCloseModal();
                }} 
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-300 flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
                Editar
              </button>
              <button 
                onClick={() => {
                  onDelete(monster.id_num);
                  handleCloseModal();
                }} 
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-300 flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                Eliminar
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default MonsterItem;