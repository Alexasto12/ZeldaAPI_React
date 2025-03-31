import React, { useState } from 'react';
import MaterialsList from '../Materials/MaterialsList';
import MaterialForm from '../Materials/MaterialForm';
import { useMaterials } from '../../hooks/useMaterials';

const MaterialsSection = ({ showForm }) => {
  const { materials, loading, error, addMaterial, editMaterial, removeMaterial } = useMaterials();
  const [editingMaterial, setEditingMaterial] = useState(null);
  const [selectedMaterials, setSelectedMaterials] = useState([]);

  const handleSave = async (materialData) => {
    if (editingMaterial) {
      await editMaterial(editingMaterial.id_num, materialData);
      setEditingMaterial(null);
    } else {
      await addMaterial(materialData);
    }
  };

  const handleEdit = (material) => {
    setEditingMaterial(material);
  };

  const handleDelete = async (id_num) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este material?')) {
      await removeMaterial(id_num);
    }
  };

  const handleCancel = () => {
    setEditingMaterial(null);
  };

  const toggleSelection = (material) => {
    if (selectedMaterials.some(m => m.id_num === material.id_num)) {
      setSelectedMaterials(selectedMaterials.filter(m => m.id_num !== material.id_num));
    } else {
      setSelectedMaterials([...selectedMaterials, material]);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row">
      {showForm && (
        <div className="lg:w-1/3 p-6 border-r border-gray-700">
          <div className="bg-gray-800 rounded-lg p-6">
            <MaterialForm 
              material={editingMaterial}
              onSave={handleSave}
              onCancel={editingMaterial ? handleCancel : null}
            />
          </div>
        </div>
      )}
      <div className={showForm ? "lg:w-2/3 p-6" : "w-full p-6"}>
        <MaterialsList 
          materials={materials}
          loading={loading}
          error={error}
          onEdit={handleEdit}
          onDelete={handleDelete}
          selectedItems={selectedMaterials}
          onToggleSelection={toggleSelection}
          selectionMode={true}
        />
      </div>
    </div>
  );
};

export default MaterialsSection;