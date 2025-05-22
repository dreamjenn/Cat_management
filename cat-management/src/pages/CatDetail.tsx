import React from 'react';

const CatDetail: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* 猫咪图片 */}
          <div className="aspect-w-16 aspect-h-9 bg-gray-200"></div>
          
          {/* 猫咪信息 */}
          <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">猫咪名称</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">基本信息</h2>
                <div className="space-y-3">
                  <div>
                    <span className="text-gray-600">性别：</span>
                    <span className="text-gray-900">未知</span>
                  </div>
                  <div>
                    <span className="text-gray-600">年龄：</span>
                    <span className="text-gray-900">未知</span>
                  </div>
                  <div>
                    <span className="text-gray-600">毛色：</span>
                    <span className="text-gray-900">未知</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">生活状况</h2>
                <div className="space-y-3">
                  <div>
                    <span className="text-gray-600">常出没地点：</span>
                    <span className="text-gray-900">未知</span>
                  </div>
                  <div>
                    <span className="text-gray-600">健康状况：</span>
                    <span className="text-gray-900">未知</span>
                  </div>
                  <div>
                    <span className="text-gray-600">是否绝育：</span>
                    <span className="text-gray-900">未知</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* 描述信息 */}
            <div className="mt-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">详细描述</h2>
              <p className="text-gray-600">
                暂无详细描述信息。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CatDetail; 