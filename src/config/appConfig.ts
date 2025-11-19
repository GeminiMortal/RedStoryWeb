import { createClient, EdgeConfigClient } from '@vercel/edge-config';
import dotenv from 'dotenv';

dotenv.config();

// 配置接口定义
interface AppConfig {
  dbHost: string;
  dbUser: string;
  dbPassword: string;
  dbName: string;
  port: number;
}

// 创建Edge Config实例
let edgeConfig: EdgeConfigClient | null = null;

if (process.env.EDGE_CONFIG) {
  edgeConfig = createClient(process.env.EDGE_CONFIG);
}

// 默认配置
const defaultConfig: AppConfig = {
  dbHost: process.env.DB_HOST || 'localhost',
  dbUser: process.env.DB_USER || 'root',
  dbPassword: process.env.DB_PASSWORD || '',
  dbName: process.env.DB_NAME || 'red_story_db',
  port: parseInt(process.env.PORT || '3000')
};

// 获取配置的函数
export const getConfig = async (): Promise<AppConfig> => {
  // 如果Edge Config可用，尝试从Edge Config获取配置
  if (edgeConfig) {
    try {
      const config = await edgeConfig.get<AppConfig>('appConfig');
      if (config) {
        return config;
      }
    } catch (error) {
      console.warn('从Edge Config获取配置失败，使用默认配置:', error);
    }
  }
  
  // 返回默认配置
  return defaultConfig;
};

// 直接获取配置（用于非异步场景）
export const getConfigSync = (): AppConfig => {
  return defaultConfig;
};
