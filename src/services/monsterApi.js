// Funciones para interactuar con la API de monsters
const API_URL = 'http://localhost:3001';

export const getMonsters = async () => {
  try {
    const response = await fetch(`${API_URL}/monsters`);
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      console.error("Server error:", errorData);
      throw new Error(`Error fetching monsters: ${response.status} ${response.statusText}`);
    }
    return response.json();
  } catch (error) {
    console.error("Request failed:", error);
    throw error;
  }
};

export const createMonster = async (monsterData) => {
  try {
    console.log("Enviando datos:", monsterData);
    
    const response = await fetch(`${API_URL}/monsters`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(monsterData)
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      console.error("Server error:", errorData);
      throw new Error(`Error creating monster: ${response.status} ${errorData ? JSON.stringify(errorData) : response.statusText}`);
    }
    
    return response.json();
  } catch (error) {
    console.error("Request failed:", error);
    throw error;
  }
};

export const updateMonster = async (id, monsterData) => {
  try {
    const response = await fetch(`${API_URL}/monsters/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(monsterData)
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      console.error("Server error:", errorData);
      throw new Error(`Error updating monster: ${response.status} ${response.statusText}`);
    }
    
    return response.json();
  } catch (error) {
    console.error("Request failed:", error);
    throw error;
  }
};

export const deleteMonster = async (id) => {
  try {
    const response = await fetch(`${API_URL}/monsters/${id}`, {
      method: 'DELETE'
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      console.error("Server error:", errorData);
      throw new Error(`Error deleting monster: ${response.status} ${response.statusText}`);
    }
    
    return response.json();
  } catch (error) {
    console.error("Request failed:", error);
    throw error;
  }
};