import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

// 加载环境变量
dotenv.config();

// 数据库配置
const config = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  charset: 'utf8mb4'
};

// 初始化数据库
async function initDatabase() {
  try {
    // 1. 连接到MySQL服务器（不指定数据库）
    const connection = await mysql.createConnection({
      ...config,
      database: undefined // 不指定数据库
    });
    console.log('✅ 连接到MySQL服务器成功！');

    // 2. 创建数据库（如果不存在）
    const createDbQuery = `CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME || 'red_story_db'} CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`;
    await connection.query(createDbQuery);
    console.log('✅ 数据库创建/检查成功！');

    // 3. 选择数据库
    await connection.query(`USE ${process.env.DB_NAME || 'red_story_db'}`);

    // 4. 创建stories表（如果不存在）
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS stories (
        id INT(11) AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        content TEXT NOT NULL,
        image VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `;
    await connection.query(createTableQuery);
    console.log('✅ 数据表创建/检查成功！');

    // 5. 插入示例数据（如果表为空）
    const checkDataQuery = `SELECT COUNT(*) as count FROM stories`;
    const [rows] = await connection.query(checkDataQuery) as any;
    const count = rows[0].count;

    if (count === 0) {
      const insertDataQuery = `
        INSERT INTO stories (title, content, image) VALUES 
        ('红色故事1', '这是第一个红色故事的内容...', 'example1.jpg'),
        ('红色故事2', '这是第二个红色故事的内容...', 'example2.jpg')
      `;
      await connection.query(insertDataQuery);
      console.log('✅ 示例数据插入成功！');
    }

    // 6. 关闭连接
    await connection.end();
    console.log('✅ 数据库初始化完成！');

  } catch (error) {
    console.error('❌ 数据库初始化失败:', error);
    process.exit(1);
  }
}

// 执行初始化
initDatabase();