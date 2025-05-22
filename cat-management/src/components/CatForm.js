import React, { useState, useEffect } from 'react';

const CatForm = ({ cat, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    age: '',
    color: '',
    location: '',
    health: '',
    neutered: '',
    description: '',
    image_url: ''
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (cat) {
      setFormData(cat);
      setImagePreview(cat.image_url);
    }
  }, [cat]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError('图片大小不能超过 5MB');
        return;
      }
      if (!file.type.startsWith('image/')) {
        setError('请上传图片文件');
        return;
      }
      setError('');
      setImagePreview(URL.createObjectURL(file));
      setFormData(prev => ({
        ...prev,
        image: file
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach(key => {
        if (key === 'image') {
          if (formData[key]) {
            formDataToSend.append('image', formData[key]);
          }
        } else {
          formDataToSend.append(key, formData[key]);
        }
      });

      await onSubmit(formDataToSend);
      setImagePreview(null);
    } catch (err) {
      setError(err.message || '提交失败，请重试');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700">猫咪照片</label>
        <div className="mt-1 flex items-center space-x-4">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100"
          />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="预览"
              className="h-20 w-20 object-cover rounded-md"
            />
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">名字</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">性别</label>
        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="">请选择</option>
          <option value="公">公</option>
          <option value="母">母</option>
          <option value="未知">未知</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">年龄</label>
        <input
          type="text"
          name="age"
          value={formData.age}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">毛色</label>
        <input
          type="text"
          name="color"
          value={formData.color}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">位置</label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">健康状况</label>
        <select
          name="health"
          value={formData.health}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="">请选择</option>
          <option value="健康">健康</option>
          <option value="生病">生病</option>
          <option value="受伤">受伤</option>
          <option value="未知">未知</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">是否绝育</label>
        <select
          name="neutered"
          value={formData.neutered}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="">请选择</option>
          <option value="是">是</option>
          <option value="否">否</option>
          <option value="未知">未知</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">描述</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="3"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          取消
        </button>
        <button
          type="submit"
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
        >
          {cat ? '更新' : '添加'}
        </button>
      </div>
    </form>
  );
};

export default CatForm; 