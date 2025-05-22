import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 获取所有猫咪信息
export const getAllCats = async () => {
  try {
    const response = await api.get('/cats');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || '获取猫咪信息失败');
  }
};

// 添加新猫咪
export const addCat = async (formData) => {
  try {
    const response = await api.post('/cats', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || '添加猫咪信息失败');
  }
};

// 更新猫咪信息
export const updateCat = async (id, formData) => {
  try {
    const response = await api.put(`/cats/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || '更新猫咪信息失败');
  }
};

// 删除猫咪信息
export const deleteCat = async (id) => {
  try {
    await api.delete(`/cats/${id}`);
  } catch (error) {
    throw new Error(error.response?.data?.message || '删除猫咪信息失败');
  }
}; 