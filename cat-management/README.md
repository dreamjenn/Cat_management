# 校园流浪猫管理系统前端

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
npm start
```

## 部署到 Vercel
1. 在 Vercel 上创建新项目
2. 连接 GitHub 仓库
3. 配置环境变量：
   - `REACT_APP_API_URL=https://cat-management-server.onrender.com/api`
4. 部署设置：
   - 框架预设：Create React App
   - 构建命令：`npm run build`
   - 输出目录：`build`

## 功能特性
- 猫咪信息的增删改查
- 列表视图和地图视图切换
- 按名字和位置搜索
- 按性别和健康状况筛选
- 图片上传功能
- 响应式设计

## 技术栈
- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- Leaflet

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
