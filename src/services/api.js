// Funciones para interactuar con la API
const API_URL = 'http://localhost:3001';

export const getMaterials = async () => {
  const response = await fetch(`${API_URL}/materials`);
  if (!response.ok) throw new Error('Error fetching materials');
  return response.json();
};

export const createMaterial = async (materialData) => {
  const response = await fetch(`${API_URL}/materials`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(materialData)
  });
  if (!response.ok) throw new Error('Error creating material');
  return response.json();
};

export const updateMaterial = async (id, materialData) => {
  const response = await fetch(`${API_URL}/materials/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(materialData)
  });
  if (!response.ok) throw new Error('Error updating material');
  return response.json();
};

export const deleteMaterial = async (id) => {
  const response = await fetch(`${API_URL}/materials/${id}`, {
    method: 'DELETE'
  });
  if (!response.ok) throw new Error('Error deleting material');
  return response.json();
};