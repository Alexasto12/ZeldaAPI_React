import React from 'react';
import MaterialItem from './MaterialItem';

const MaterialsList = ({ materials, onEdit, onDelete, loading, error }) => {
  if (loading) return <div className="loading">Cargando materiales...</div>;
  if (error) return <div className="error">Error: {error}</div>;
  
  if (materials.length === 0) {
    return <div className="empty-list">No hay materiales disponibles</div>;
  }

  return (
    <div className="materials-container">
      <h2 className="text-2xl font-bold text-blue-400 mb-6">Lista de Materiales</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {materials.map(material => (
          <MaterialItem 
            key={material.id_num || material._id} 
            material={material} 
            onEdit={onEdit} 
            onDelete={onDelete} 
          />
        ))}
      </div>
    </div>
  );
};

export default MaterialsList;