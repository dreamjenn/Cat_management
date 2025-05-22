import React from 'react';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* 项目介绍部分 */}
      <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              校园流浪猫管理平台
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              关爱校园流浪猫，共建和谐校园。在这里，您可以查看校园内的流浪猫信息，
              了解它们的生活状况，并参与我们的救助行动。
            </p>
          </div>
        </div>
      </section>

      {/* 猫咪列表部分 */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">猫咪列表</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* 这里后续会添加猫咪卡片组件 */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="aspect-w-16 aspect-h-9 bg-gray-200 rounded-lg mb-4"></div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">示例猫咪</h3>
              <p className="text-gray-600">这是一只可爱的校园流浪猫</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 