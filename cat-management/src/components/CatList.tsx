import React from 'react';
import { Button } from './ui/button';
import { Cat } from '../types';

interface CatListProps {
  cats: Cat[];
  onEdit: (cat: Cat) => void;
  onDelete: (id: number) => void;
}

const CatList: React.FC<CatListProps> = ({ cats, onEdit, onDelete }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {cats.map((cat) => (
        <div
          key={cat.id}
          className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
        >
          <div className="relative h-48">
            {cat.image_url ? (
              <img
                src={`http://localhost:5000${cat.image_url}`}
                alt={cat.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <span className="text-gray-400">暂无图片</span>
              </div>
            )}
            <div className="absolute top-2 right-2 flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onEdit(cat)}
                className="bg-white/80 hover:bg-white"
              >
                编辑
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => onDelete(cat.id)}
                className="bg-white/80 hover:bg-white"
              >
                删除
              </Button>
            </div>
          </div>
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
                <span
                  className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                    cat.health === '健康'
                      ? 'bg-green-100 text-green-800'
                      : cat.health === '生病'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  {cat.health}
                </span>
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">是否绝育：</span>
                {cat.neutered ? '是' : '否'}
              </p>
              {cat.description && (
                <p className="text-sm text-gray-600 mt-2">
                  <span className="font-medium">描述：</span>
                  {cat.description}
                </p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CatList; 