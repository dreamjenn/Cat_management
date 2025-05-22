const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

// 数据库配置
let db = null;

const initializeDatabase = (dbPath) => {
  // 确保数据目录存在
  const dataDir = path.dirname(dbPath);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
      console.error('数据库连接失败:', err);
      throw err;
    }
    console.log('成功连接到数据库:', dbPath);
  });

  // 初始化数据库表
  db.run(`
    CREATE TABLE IF NOT EXISTS cats (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      gender TEXT NOT NULL,
      age TEXT,
      color TEXT,
      location TEXT NOT NULL,
      health TEXT NOT NULL,
      neutered INTEGER NOT NULL,
      description TEXT,
      image_url TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `, (err) => {
    if (err) {
      console.error('创建表失败:', err);
      throw err;
    }
    console.log('数据库表初始化成功');
  });
};

// 获取所有猫咪信息
const getAllCats = () => {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM cats ORDER BY created_at DESC', [], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

// 添加新猫咪
const addCat = (cat) => {
  return new Promise((resolve, reject) => {
    const { name, gender, age, color, location, health, neutered, description, image_url } = cat;
    db.run(
      `INSERT INTO cats (name, gender, age, color, location, health, neutered, description, image_url)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [name, gender, age, color, location, health, neutered ? 1 : 0, description, image_url],
      function(err) {
        if (err) {
          reject(err);
        } else {
          resolve({ id: this.lastID, ...cat });
        }
      }
    );
  });
};

// 更新猫咪信息
const updateCat = (id, cat) => {
  return new Promise((resolve, reject) => {
    const { name, gender, age, color, location, health, neutered, description, image_url } = cat;
    db.run(
      `UPDATE cats 
       SET name = ?, gender = ?, age = ?, color = ?, location = ?, 
           health = ?, neutered = ?, description = ?, image_url = ?
       WHERE id = ?`,
      [name, gender, age, color, location, health, neutered ? 1 : 0, description, image_url, id],
      (err) => {
        if (err) {
          reject(err);
        } else {
          resolve({ id, ...cat });
        }
      }
    );
  });
};

// 删除猫咪
const deleteCat = (id) => {
  return new Promise((resolve, reject) => {
    db.run('DELETE FROM cats WHERE id = ?', [id], (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

module.exports = {
  initializeDatabase,
  getAllCats,
  addCat,
  updateCat,
  deleteCat
}; 