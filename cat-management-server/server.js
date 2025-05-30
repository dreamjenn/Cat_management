const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { initializeDatabase, getAllCats, addCat, updateCat, deleteCat } = require('./db');

const app = express();
const PORT = process.env.PORT || 5000;

// 定义必要的路径
const uploadDir = path.join(process.cwd(), 'uploads');
const dataDir = path.join(process.cwd(), 'data');
const dbPath = path.join(dataDir, 'cats.db');

// 确保必要的目录存在
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// 配置文件上传
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

// 中间件
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

// 初始化数据库并启动服务器
const startServer = async () => {
  try {
    await initializeDatabase(dbPath);
    
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`服务器运行在端口 ${PORT}`);
      console.log(`环境: ${process.env.NODE_ENV || 'development'}`);
      console.log(`数据库路径: ${dbPath}`);
      console.log(`上传目录: ${uploadDir}`);
    }).on('error', (err) => {
      console.error('服务器启动失败:', err);
      process.exit(1);
    });
  } catch (error) {
    console.error('服务器初始化失败:', error);
    process.exit(1);
  }
};

startServer();

// API 路由
app.get('/api/cats', async (req, res) => {
  try {
    const cats = await getAllCats();
    res.json(cats);
  } catch (error) {
    console.error('获取猫咪列表失败:', error);
    res.status(500).json({ error: '获取猫咪列表失败' });
  }
});

app.post('/api/cats', upload.single('image'), async (req, res) => {
  try {
    const catData = {
      ...req.body,
      image_url: req.file ? `/uploads/${req.file.filename}` : null,
      neutered: req.body.neutered === 'true'
    };
    const newCat = await addCat(catData);
    res.status(201).json(newCat);
  } catch (error) {
    console.error('添加猫咪失败:', error);
    res.status(500).json({ error: '添加猫咪失败' });
  }
});

app.put('/api/cats/:id', upload.single('image'), async (req, res) => {
  try {
    const { id } = req.params;
    const catData = {
      ...req.body,
      image_url: req.file ? `/uploads/${req.file.filename}` : req.body.image_url,
      neutered: req.body.neutered === 'true'
    };
    const updatedCat = await updateCat(id, catData);
    res.json(updatedCat);
  } catch (error) {
    console.error('更新猫咪信息失败:', error);
    res.status(500).json({ error: '更新猫咪信息失败' });
  }
});

app.delete('/api/cats/:id', async (req, res) => {
  try {
    await deleteCat(req.params.id);
    res.status(204).send();
  } catch (error) {
    console.error('删除猫咪失败:', error);
    res.status(500).json({ error: '删除猫咪失败' });
  }
});

// 错误处理中间件
app.use((err, req, res, next) => {
  console.error('服务器错误:', err);
  res.status(500).json({ error: '服务器内部错误' });
}); 