// CategoryModal.tsx
import React, { useState, useEffect } from 'react';
import { apiRequest } from './apiRequest ';

interface CategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CategoryModal: React.FC<CategoryModalProps> = ({ isOpen, onClose }) => {
  const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);
  const [newCategoryName, setNewCategoryName] = useState('');

  const fetchCategories = async () => {
    try {
      const response = await apiRequest('http://34.125.24.110:4000/categories', 'GET');
      if (response.ok) {
        const data = await response.json();
        setCategories(data);
      } else {
        console.error('Error fetching categories:', await response.text());
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleAddCategory = async () => {
    try {
      const response = await apiRequest('http://34.125.24.110:4000/categories', 'POST', JSON.stringify({ name: newCategoryName }));
      if (response.ok) {
        fetchCategories();
        setNewCategoryName('');
      } else {
        console.error('Error adding category:', await response.text());
      }
    } catch (error) {
      console.error('Error adding category:', error);
    }
  };

  const handleDeleteCategory = async (id: number) => {
    try {
      const response = await apiRequest(`http://34.125.24.110:4000/categories/${id}`, 'DELETE');
      if (response.ok) {
        fetchCategories();
      } else {
        console.error('Error deleting category:', await response.text());
      }
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchCategories();
    }
  }, [isOpen]);

  return (
    <div className="z-50 modal-bg fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="modal-content p-4 bg-white rounded-lg shadow-lg relative mb-4">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
          &times;
        </button>
        <h2 className="text-xl mb-4"> 管理标签 </h2>
        <input
          type="text"
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
          placeholder="New category name"
          className="w-full p-2 mb-2 border rounded-md"
        />
        <button onClick={handleAddCategory} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 shadow-md mb-4">
          Add Category
        </button>
        <ul>
          {categories.map((category) => (
            <li key={category.id} className="flex justify-between mb-2">
              <span>{category.name}</span>
              <button onClick={() => handleDeleteCategory(category.id)} className="text-red-500 hover:text-red-700">
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CategoryModal;
