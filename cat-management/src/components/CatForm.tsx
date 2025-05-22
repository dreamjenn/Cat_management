import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Cat, CatFormData } from '../types';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import imageCompression from 'browser-image-compression';

// 修复 Leaflet 默认图标问题
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface CatFormProps {
  onSubmit: (cat: CatFormData) => void;
  onCancel: () => void;
  initialData?: Cat | null;
}

// 地图点击事件处理组件
const LocationMarker: React.FC<{
  position: [number, number] | null;
  onPositionChange: (position: [number, number]) => void;
}> = ({ position, onPositionChange }) => {
  useMapEvents({
    click(e) {
      onPositionChange([e.latlng.lat, e.latlng.lng]);
    },
  });

  return position ? <Marker position={position} /> : null;
};

const CatForm: React.FC<CatFormProps> = ({ onSubmit, onCancel, initialData }) => {
  const [formData, setFormData] = useState<CatFormData>({
    name: '',
    gender: '公',
    age: '',
    color: '',
    location: '',
    health: '健康',
    neutered: false,
    description: '',
    image_url: null,
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedPosition, setSelectedPosition] = useState<[number, number] | null>(null);
  const [showMap, setShowMap] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        gender: initialData.gender,
        age: initialData.age,
        color: initialData.color,
        location: initialData.location,
        health: initialData.health,
        neutered: initialData.neutered,
        description: initialData.description,
        image_url: initialData.image_url,
      });
      setImagePreview(initialData.image_url);
      
      // 如果有位置信息，解析并设置选中位置
      if (initialData.location) {
        const [lat, lng] = initialData.location.split(',').map(Number);
        if (!isNaN(lat) && !isNaN(lng)) {
          setSelectedPosition([lat, lng]);
        }
      }
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const compressImage = async (file: File): Promise<File> => {
    const options = {
      maxSizeMB: 1, // 最大文件大小为 1MB
      maxWidthOrHeight: 1920, // 最大宽度或高度为 1920px
      useWebWorker: true, // 使用 Web Worker 进行压缩
    };

    try {
      const compressedFile = await imageCompression(file, options);
      console.log('压缩前大小:', file.size / 1024 / 1024, 'MB');
      console.log('压缩后大小:', compressedFile.size / 1024 / 1024, 'MB');
      return compressedFile;
    } catch (error) {
      console.error('图片压缩失败:', error);
      return file; // 如果压缩失败，返回原文件
    }
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        // 显示压缩中的提示
        const compressedFile = await compressImage(file);
        
        setFormData(prev => ({
          ...prev,
          image_url: compressedFile,
        }));

        // 创建预览
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result as string);
        };
        reader.readAsDataURL(compressedFile);
      } catch (error) {
        console.error('处理图片失败:', error);
        alert('处理图片失败，请重试');
      }
    }
  };

  const handlePositionSelect = (position: [number, number]) => {
    setSelectedPosition(position);
    setFormData(prev => ({
      ...prev,
      location: `${position[0]},${position[1]}`,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPosition) {
      alert('请在地图上选择位置');
      return;
    }
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">名字</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">性别</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="公">公</option>
            <option value="母">母</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">年龄</label>
          <input
            type="text"
            name="age"
            value={formData.age}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">毛色</label>
          <input
            type="text"
            name="color"
            value={formData.color}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700">位置</label>
          <div className="mt-1">
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowMap(!showMap)}
              className="mb-2"
            >
              {showMap ? '隐藏地图' : '选择位置'}
            </Button>
            {showMap && (
              <div className="h-[300px] w-full rounded-lg overflow-hidden shadow-lg mb-2">
                <MapContainer
                  center={selectedPosition || [39.9042, 116.4074]}
                  zoom={13}
                  style={{ height: '100%', width: '100%' }}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  <LocationMarker
                    position={selectedPosition}
                    onPositionChange={handlePositionSelect}
                  />
                </MapContainer>
              </div>
            )}
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="点击地图选择位置"
              readOnly
              required
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">健康状况</label>
          <select
            name="health"
            value={formData.health}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="健康">健康</option>
            <option value="生病">生病</option>
            <option value="受伤">受伤</option>
          </select>
        </div>

        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700">描述</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700">是否绝育</label>
          <input
            type="checkbox"
            name="neutered"
            checked={formData.neutered}
            onChange={handleChange}
            className="mt-1 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
          />
        </div>

        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700">照片</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="mt-1 block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-semibold
              file:bg-indigo-50 file:text-indigo-700
              hover:file:bg-indigo-100"
          />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="预览"
              className="mt-2 h-32 w-32 object-cover rounded-md"
            />
          )}
        </div>
      </div>

      <div className="flex justify-end space-x-3">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
        >
          取消
        </Button>
        <Button type="submit">
          {initialData ? '更新' : '添加'}
        </Button>
      </div>
    </form>
  );
};

export default CatForm; 