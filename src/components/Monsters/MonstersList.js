import React from 'react';
import MonsterItem from './MonsterItem';

const MonstersList = ({ monsters, onEdit, onDelete, loading, error }) => {
  if (loading) return <div className="loading">Cargando monstruos...</div>;
  if (error) return <div className="error">Error: {error}</div>;
  
  if (monsters.length === 0) {
    return <div className="empty-list">No hay monstruos disponibles</div>;
  }

  return (
    <div className="monsters-container">
      <h2 className="text-2xl font-bold text-blue-400 mb-6">Lista de Monstruos</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {monsters.map(monster => (
          <MonsterItem 
            key={monster.id_num || monster._id} 
            monster={monster} 
            onEdit={onEdit} 
            onDelete={onDelete} 
          />
        ))}
      </div>
    </div>
  );
};

export default MonstersList;