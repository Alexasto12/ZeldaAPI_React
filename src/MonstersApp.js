import React, { useState } from 'react';
import './App.css';
import MonstersList from './components/Monsters/MonstersList';
import MonsterForm from './components/Monsters/MonsterForm';
import { useMonsters } from './hooks/useMonsters';

function MonstersApp() {
  const { monsters, loading, error, addMonster, editMonster, removeMonster } = useMonsters();
  const [editingMonster, setEditingMonster] = useState(null);

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

  return (
    <div className="App">
      <header className="App-header">
        <h1>Gestor de Monstruos Zelda</h1>
      </header>
      <main className="App-main">
        <div className="container">
          <div className="form-container">
            <MonsterForm 
              monster={editingMonster}
              onSave={handleSave}
              onCancel={editingMonster ? handleCancel : null}
            />
          </div>
          <div className="list-container">
            <MonstersList 
              monsters={monsters}
              loading={loading}
              error={error}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default MonstersApp;