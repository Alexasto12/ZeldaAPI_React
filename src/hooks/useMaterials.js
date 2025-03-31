import { useState, useEffect } from 'react';
import { getMaterials, createMaterial, updateMaterial, deleteMaterial } from '../services/api';

export const useMaterials = () => {
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMaterials = async () => {
    setLoading(true);
    try {
      const data = await getMaterials();
      setMaterials(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addMaterial = async (materialData) => {
    setLoading(true);
    try {
      const newMaterial = await createMaterial(materialData);
      setMaterials([...materials, newMaterial]);
      return newMaterial;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const editMaterial = async (id, materialData) => {
    setLoading(true);
    try {
      const updatedMaterial = await updateMaterial(id, materialData);
      setMaterials(materials.map(m => m.id === id ? updatedMaterial : m));
      return updatedMaterial;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const removeMaterial = async (id) => {
    setLoading(true);
    try {
      await deleteMaterial(id);
      setMaterials(materials.filter(m => m.id !== id));
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMaterials();
  }, []);

  return { 
    materials, 
    loading, 
    error, 
    fetchMaterials, 
    addMaterial, 
    editMaterial, 
    removeMaterial 
  };
};