import React from 'react';

const AddCat: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">添加猫咪信息</h1>
          
          <form className="space-y-6">
            {/* 基本信息 */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">基本信息</h2>
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    猫咪名称
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
                    性别
                  </label>
                  <select
                    id="gender"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  >
                    <option value="">请选择</option>
                    <option value="male">公猫</option>
                    <option value="female">母猫</option>
                    <option value="unknown">未知</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="age" className="block text-sm font-medium text-gray-700">
                    年龄
                  </label>
                  <input
                    type="text"
                    id="age"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="color" className="block text-sm font-medium text-gray-700">
                    毛色
                  </label>
                  <input
                    type="text"
                    id="color"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
              </div>
            </div>
            
            {/* 生活状况 */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">生活状况</h2>
              <div className="space-y-4">
                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                    常出没地点
                  </label>
                  <input
                    type="text"
                    id="location"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="health" className="block text-sm font-medium text-gray-700">
                    健康状况
                  </label>
                  <select
                    id="health"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  >
                    <option value="">请选择</option>
                    <option value="good">健康</option>
                    <option value="fair">一般</option>
                    <option value="poor">较差</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="neutered" className="block text-sm font-medium text-gray-700">
                    是否绝育
                  </label>
                  <select
                    id="neutered"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  >
                    <option value="">请选择</option>
                    <option value="yes">是</option>
                    <option value="no">否</option>
                    <option value="unknown">未知</option>
                  </select>
                </div>
              </div>
            </div>
            
            {/* 详细描述 */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                详细描述
              </label>
              <textarea
                id="description"
                rows={4}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              ></textarea>
            </div>
            
            {/* 提交按钮 */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                提交
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCat; 