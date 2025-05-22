import React from 'react';

const CatList = ({ cats, onEdit, onDelete }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {cats.map(cat => (
        <div key={cat.id} className="bg-white rounded-lg shadow-md overflow-hidden">
          {cat.image_url && (
            <div className="aspect-w-16 aspect-h-9">
              <img
                src={`http://localhost:5000${cat.image_url}`}
                alt={cat.name}
                className="w-full h-48 object-cover"
              />
            </div>
          )}
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-900">{cat.name}</h3>
            <div className="mt-2 space-y-1">
              <p className="text-sm text-gray-600">
                <span className="font-medium">性别：</span>
                {cat.gender}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">年龄：</span>
                {cat.age}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">毛色：</span>
                {cat.color}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">位置：</span>
                {cat.location}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">健康状况：</span>
                {cat.health}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">是否绝育：</span>
                {cat.neutered}
              </p>
              {cat.description && (
                <p className="text-sm text-gray-600">
                  <span className="font-medium">描述：</span>
                  {cat.description}
                </p>
              )}
            </div>
            <div className="mt-4 flex justify-end space-x-2">
              <button
                onClick={() => onEdit(cat)}
                className="px-3 py-1 text-sm text-blue-600 hover:text-blue-800"
              >
                编辑
              </button>
              <button
                onClick={() => onDelete(cat.id)}
                className="px-3 py-1 text-sm text-red-600 hover:text-red-800"
              >
                删除
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CatList; 