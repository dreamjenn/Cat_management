import React, { useState, useEffect } from 'react';
import { Button } from './components/ui/button';
import CatForm from './components/CatForm';
import CatList from './components/CatList';
import CatMap from './components/CatMap';
import { Cat, CatFormData } from './types';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

function App() {
  const [cats, setCats] = useState<Cat[]>([]);
  const [editingCat, setEditingCat] = useState<Cat | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterGender, setFilterGender] = useState('');
  const [filterHealth, setFilterHealth] = useState('');
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');

  useEffect(() => {
    fetchCats();
  }, []);

  const fetchCats = async () => {
    try {
      const response = await fetch(`${API_URL}/cats`);
      const data = await response.json();
      setCats(data);
    } catch (error) {
      console.error('Error fetching cats:', error);
    }
  };

  const handleAddCat = async (catData: CatFormData) => {
    try {
      const formData = new FormData();
      Object.entries(catData).forEach(([key, value]) => {
        if (value !== null) {
          formData.append(key, value);
        }
      });

      const response = await fetch(`${API_URL}/cats`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        fetchCats();
        setEditingCat(null);
      }
    } catch (error) {
      console.error('Error adding cat:', error);
    }
  };

  const handleUpdateCat = async (catData: CatFormData) => {
    if (!editingCat) return;

    try {
      const formData = new FormData();
      Object.entries(catData).forEach(([key, value]) => {
        if (value !== null) {
          formData.append(key, value);
        }
      });

      const response = await fetch(`${API_URL}/cats/${editingCat.id}`, {
        method: 'PUT',
        body: formData,
      });

      if (response.ok) {
        fetchCats();
        setEditingCat(null);
      }
    } catch (error) {
      console.error('Error updating cat:', error);
    }
  };

  const handleDeleteCat = async (id: number) => {
    try {
      const response = await fetch(`${API_URL}/cats/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchCats();
      }
    } catch (error) {
      console.error('Error deleting cat:', error);
    }
  };

  const handleSubmit = (catData: CatFormData) => {
    if (editingCat) {
      handleUpdateCat(catData);
    } else {
      handleAddCat(catData);
    }
  };

  const filteredCats = cats.filter(cat => {
    const matchesSearch = cat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cat.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGender = !filterGender || cat.gender === filterGender;
    const matchesHealth = !filterHealth || cat.health === filterHealth;
    return matchesSearch && matchesGender && matchesHealth;
  });

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">校园流浪猫管理系统</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between items-center mb-6">
            <div className="flex space-x-4">
              <input
                type="text"
                placeholder="搜索名字或位置..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
              <select
                value={filterGender}
                onChange={(e) => setFilterGender(e.target.value)}
                className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="">所有性别</option>
                <option value="公">公</option>
                <option value="母">母</option>
              </select>
              <select
                value={filterHealth}
                onChange={(e) => setFilterHealth(e.target.value)}
                className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="">所有健康状况</option>
                <option value="健康">健康</option>
                <option value="生病">生病</option>
                <option value="受伤">受伤</option>
              </select>
            </div>
            <div className="flex space-x-4">
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                onClick={() => setViewMode('list')}
              >
                列表视图
              </Button>
              <Button
                variant={viewMode === 'map' ? 'default' : 'outline'}
                onClick={() => setViewMode('map')}
              >
                地图视图
              </Button>
              <Button onClick={() => setEditingCat({} as Cat)}>
                添加新猫
              </Button>
            </div>
          </div>

          {editingCat && (
            <div className="bg-white shadow rounded-lg p-6 mb-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                {editingCat.id ? '编辑猫咪信息' : '添加新猫咪'}
              </h2>
              <CatForm
                onSubmit={handleSubmit}
                onCancel={() => setEditingCat(null)}
                initialData={editingCat}
              />
            </div>
          )}

          {viewMode === 'list' ? (
            <CatList
              cats={filteredCats}
              onEdit={setEditingCat}
              onDelete={handleDeleteCat}
            />
          ) : (
            <CatMap cats={filteredCats} onEdit={setEditingCat} />
          )}
        </div>
      </main>
    </div>
  );
}

export default App; 