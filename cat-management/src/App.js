import React, { useState, useEffect } from 'react';
import CatList from './components/CatList';
import CatForm from './components/CatForm';
import { getAllCats, addCat, updateCat, deleteCat } from './services/api';

function App() {
  const [cats, setCats] = useState([]);
  const [selectedCat, setSelectedCat] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchCats = async () => {
    try {
      setLoading(true);
      const data = await getAllCats();
      setCats(data);
      setError('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCats();
  }, []);

  const handleSubmit = async (formData) => {
    try {
      setLoading(true);
      if (selectedCat) {
        await updateCat(selectedCat.id, formData);
      } else {
        await addCat(formData);
      }
      await fetchCats();
      setIsFormOpen(false);
      setSelectedCat(null);
      setError('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('确定要删除这只猫咪的信息吗？')) return;

    try {
      setLoading(true);
      await deleteCat(id);
      await fetchCats();
      setError('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (cat) => {
    setSelectedCat(cat);
    setIsFormOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
          <div className="max-w-md mx-auto">
            <div className="flex items-center space-x-5">
              <div className="block pl-2 font-semibold text-xl text-gray-700">
                <h2 className="leading-relaxed">校园猫咪管理系统</h2>
              </div>
            </div>
            
            {error && (
              <div className="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}

            {loading && (
              <div className="mt-4 text-center">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
                <p className="mt-2 text-gray-600">加载中...</p>
              </div>
            )}

            {isFormOpen ? (
              <div className="mt-8">
                <CatForm
                  cat={selectedCat}
                  onSubmit={handleSubmit}
                  onCancel={() => {
                    setIsFormOpen(false);
                    setSelectedCat(null);
                  }}
                />
              </div>
            ) : (
              <div className="mt-8">
                <button
                  onClick={() => setIsFormOpen(true)}
                  className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  添加新猫咪
                </button>
                <div className="mt-8">
                  <CatList
                    cats={cats}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App; 