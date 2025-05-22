# 校园流浪猫管理系统后端

## 环境要求
- Node.js 14.0.0 或更高版本
- npm 6.0.0 或更高版本

## 本地开发
1. 安装依赖：
```bash
npm install
```

2. 启动开发服务器：
```bash
npm run dev
```

## 部署到 Render
1. 在 Render 上创建新的 Web Service
2. 连接 GitHub 仓库
3. 配置环境变量：
   - `NODE_ENV=production`
   - `PORT=10000`
4. 构建命令：`npm install`
5. 启动命令：`npm start`

## API 端点
- GET `/api/cats` - 获取所有猫咪信息
- POST `/api/cats` - 添加新猫咪
- PUT `/api/cats/:id` - 更新猫咪信息
- DELETE `/api/cats/:id` - 删除猫咪

## 文件结构
- `server.js` - 主服务器文件
- `db.js` - 数据库操作
- `uploads/` - 上传的图片存储目录
- `data/` - SQLite 数据库文件目录 