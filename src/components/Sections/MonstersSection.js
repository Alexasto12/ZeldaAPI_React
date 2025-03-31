import React, { useState } from 'react';
import MonstersList from '../Monsters/MonstersList';
import MonsterForm from '../Monsters/MonsterForm';
import { useMonsters } from '../../hooks/useMonsters';

const MonstersSection = ({ showForm }) => {
  const { monsters, loading, error, addMonster, editMonster, removeMonster } = useMonsters();
  const [editingMonster, setEditingMonster] = useState(null);
  const [selectedMonsters, setSelectedMonsters] = useState([]);

  const handleSave = async (monsterData) => {
    if (editingMonster) {
      await editMonster(editingMonster.id_num, monsterData);
      setEditingMonster(null);
    } else {
      await addMonster(monsterData);
    }
  };

  const handleEdit = (monster) => {
    setEditingMonster(monster);
  };

  const handleDelete = async (id_num) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este monstruo?')) {
      await removeMonster(id_num);
    }
  };

  const handleCancel = () => {
    setEditingMonster(null);
  };

  const toggleSelection = (monster) => {
    if (selectedMonsters.some(m => m.id_num === monster.id_num)) {
      setSelectedMonsters(selectedMonsters.filter(m => m.id_num !== monster.id_num));
    } else {
      setSelectedMonsters([...selectedMonsters, monster]);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row">
      {showForm && (
        <div className="lg:w-1/3 p-6 border-r border-gray-700">
          <div className="bg-gray-800 rounded-lg p-6">
            <MonsterForm 
              monster={editingMonster}
              onSave={handleSave}
              onCancel={editingMonster ? handleCancel : null}
            />
          </div>
        </div>
      )}
      <div className={showForm ? "lg:w-2/3 p-6" : "w-full p-6"}>
        <MonstersList 
          monsters={monsters}
          loading={loading}
          error={error}
          onEdit={handleEdit}
          onDelete={handleDelete}
          selectedItems={selectedMonsters}
          onToggleSelection={toggleSelection}
          selectionMode={true}
        />
      </div>
    </div>
  );
};

export default MonstersSection;