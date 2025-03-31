import { useState, useEffect } from 'react';
import { getMonsters, createMonster, updateMonster, deleteMonster } from '../services/monsterApi';

export const useMonsters = () => {
  const [monsters, setMonsters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMonsters = async () => {
    setLoading(true);
    try {
      const data = await getMonsters();
      setMonsters(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addMonster = async (monsterData) => {
    setLoading(true);
    try {
      const newMonster = await createMonster(monsterData);
      setMonsters([...monsters, newMonster]);
      return newMonster;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const editMonster = async (id, monsterData) => {
    setLoading(true);
    try {
      const updatedMonster = await updateMonster(id, monsterData);
      setMonsters(monsters.map(m => m.id_num === id ? updatedMonster : m));
      return updatedMonster;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const removeMonster = async (id) => {
    setLoading(true);
    try {
      await deleteMonster(id);
      setMonsters(monsters.filter(m => m.id_num !== id));
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMonsters();
  }, []);

  return { 
    monsters, 
    loading, 
    error, 
    fetchMonsters, 
    addMonster, 
    editMonster, 
    removeMonster 
  };
};