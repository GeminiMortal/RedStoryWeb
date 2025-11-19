import express from 'express';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';
import { testConnection } from './database/connection';
import storyRoutes from './routes/storyRoutes';

// 加载环境变量
dotenv.config();

// 创建Express应用
const app = express();

// 配置端口
const PORT = process.env.PORT || 3000;

// 配置中间件
app.use(cors()); // 允许跨域请求
app.use(express.json()); // 解析JSON请求
app.use(express.urlencoded({ extended: true })); // 解析URL编码请求

// 配置静态文件服务
app.use(express.static('./')); // 根目录静态文件
app.use('/uploads', express.static('./uploads')); // 上传文件目录

// 注册API路由
app.use('/api', storyRoutes);

// 测试数据库连接
async function startServer() {
  try {
    await testConnection();
  } catch (error) {
    console.warn('⚠️  数据库连接失败:', error instanceof Error ? error.message : error);
    console.warn('⚠️  服务器将继续运行，但数据库功能将不可用');
  }
  
  // 启动服务器
  app.listen(PORT, () => {
    console.log(`\n🚀 服务器已启动，运行在 http://localhost:${PORT}`);
    console.log(`📁 静态文件访问地址: http://localhost:${PORT}`);
    console.log(`📡 API访问地址: http://localhost:${PORT}/api/stories`);
    console.log(`📤 上传API地址: POST http://localhost:${PORT}/api/stories`);
    console.log(`🔄 开发模式下按 Ctrl+C 停止服务器`);
  });
}

// 启动服务器
startServer();
