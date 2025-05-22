import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Cat } from '../types';
import L from 'leaflet';

// 修复 Leaflet 默认图标问题
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface CatMapProps {
  cats: Cat[];
  onEdit: (cat: Cat) => void;
}

const CatMap: React.FC<CatMapProps> = ({ cats, onEdit }) => {
  // 默认中心点（可以根据需要调整）
  const defaultCenter: [number, number] = [39.9042, 116.4074]; // 北京坐标

  return (
    <div className="h-[600px] w-full rounded-lg overflow-hidden shadow-lg">
      <MapContainer
        center={defaultCenter}
        zoom={13}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {cats.map((cat) => (
          <Marker
            key={cat.id}
            position={[parseFloat(cat.location.split(',')[0]), parseFloat(cat.location.split(',')[1])]}
          >
            <Popup>
              <div className="p-2">
                <h3 className="font-bold text-lg mb-2">{cat.name}</h3>
                {cat.image_url && (
                  <img
                    src={cat.image_url}
                    alt={cat.name}
                    className="w-full h-32 object-cover rounded-md mb-2"
                  />
                )}
                <p>性别: {cat.gender}</p>
                <p>年龄: {cat.age}</p>
                <p>毛色: {cat.color}</p>
                <p>健康状况: {cat.health}</p>
                <p>是否绝育: {cat.neutered ? '是' : '否'}</p>
                <p className="mt-2">{cat.description}</p>
                <button
                  onClick={() => onEdit(cat)}
                  className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  编辑
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default CatMap; 