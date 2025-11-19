这是一个web应用————“代码里的红色记忆”
用于展示红色故事、红色事件、红色人物、红色情感、红色思想、红色力量等。
运用轮播展示红色故事，每个轮播项展示一个红色故事，包括故事的标题、内容、图片等。
轮播方向为上下，用户可以通过点击轮播项切换到下一个或上一个红色故事。
最多三行轮播，根据屏幕宽度自适应，相邻轮播项轮播方向相反。
右上角提供了上传红色故事的功能，用户可以上传红色故事，包括故事的标题、内容、图片等，并优先加入内容最少的轮播行中。

主页面在index.html
上传界面在upload.html
后端API使用Node.js + TypeScript + Express实现
数据存储在MySQL数据库中

使用flex布局实现页面的自适应布局，根据屏幕宽度自动调整页面元素的位置和大小。

利用Node.js + TypeScript + Express连接MySQL数据库，实现数据的存储和读取。
利用Vue.js框架实现前端页面的交互和动态更新。
利用Axios库实现前端与后端的通信。
利用Bootstrap框架实现前端页面的布局和样式。
利用Font Awesome字体图标库实现前端页面的图标展示。
利用jQuery库实现前端页面的事件处理和动画效果。
利用Redactor富文本编辑器库实现上传界面的文本编辑功能。

前端静态文件和后端API可部署到支持Node.js的云服务器（如Vercel、Netlify、Heroku等）或自建服务器。
数据库需部署到支持MySQL的服务器（如自建服务器、阿里云RDS、腾讯云CDB等）。

## 技术栈

### 前端
- HTML5 + CSS3 + JavaScript
- Vue.js 3 (通过CDN引入)
- Bootstrap 4
- Font Awesome
- jQuery
- Axios
- Redactor (富文本编辑器)

### 后端
- Node.js
- TypeScript
- Express.js
- MySQL2 (数据库驱动)
- Multer (文件上传)
- Dotenv (环境变量管理)
- CORS (跨域支持)

## 安装与运行

### 1. 安装依赖
```bash
npm install
```

## Vercel部署与集成

### 1. Vercel Blob配置

Vercel Blob用于存储上传的图片文件。

#### 步骤：
1. 登录Vercel控制台
2. 进入项目的Storage页面
3. 创建一个Blob存储（已创建：`red-story-web-blob`）
4. 获取Blob存储的**Read Write Token**
5. 在.env文件中配置：

```env
# Vercel Blob Configuration
BLOB_READ_WRITE_TOKEN=your-vercel-blob-read-write-token
BLOB_STORE_NAME=red-story-web-blob
```

### 2. Vercel Edge Config配置

Edge Config用于存储应用配置，替代传统的.env文件。

#### 步骤：
1. 登录Vercel控制台
2. 进入项目的Storage页面
3. 创建一个Edge Config（已创建：`red-story-web-store`）
4. 添加配置项：

```json
{
  "appConfig": {
    "dbHost": "localhost",
    "dbUser": "root",
    "dbPassword": "your-db-password",
    "dbName": "red_story_db",
    "port": 3000
  }
}
```

5. 在项目的Settings → Environment Variables中添加：

```
EDGE_CONFIG=your-edge-config-connection-string
```

### 3. 部署到Vercel

```bash
# 安装Vercel CLI
npm install -g vercel

# 登录Vercel
vercel login

# 部署项目
vercel
```

## 配置说明

### 环境变量

项目使用以下环境变量：

| 变量名 | 描述 | 默认值 |
|--------|------|--------|
| DB_HOST | 数据库主机地址 | localhost |
| DB_USER | 数据库用户名 | root |
| DB_PASSWORD | 数据库密码 | - |
| DB_NAME | 数据库名称 | red_story_db |
| PORT | 服务器端口 | 3000 |
| BLOB_READ_WRITE_TOKEN | Vercel Blob读写令牌 | - |
| BLOB_STORE_NAME | Vercel Blob存储名称 | red-story-web-blob |
| EDGE_CONFIG | Edge Config连接字符串 | - |

### 2. 配置数据库

在项目根目录创建 `.env` 文件，配置数据库连接信息：
```env
# Database Configuration
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=red_story_db

# Server Configuration
PORT=3000
```

### 3. 运行开发服务器
```bash
npm run dev
```

服务器将启动在 `http://localhost:3000`

### 4. 构建生产版本
```bash
npm run build
```

### 5. 生产环境运行
```bash
npm start
```

## API接口说明

### 获取所有故事
```
GET /api/stories
```

### 获取单个故事
```
GET /api/stories/:id
```

### 上传故事
```
POST /api/stories
Content-Type: multipart/form-data

参数：
- title: 故事标题 (必填)
- content: 故事内容 (必填)
- image: 故事图片 (可选，支持JPG、PNG、GIF格式)
```

## 项目结构

```
red-story-web/
├── src/
│   ├── config/          # 配置文件
│   │   └── uploadConfig.ts   # 文件上传配置
│   ├── database/        # 数据库相关
│   │   ├── connection.ts     # 数据库连接
│   │   └── StoryDAO.ts       # 故事数据访问对象
│   ├── models/          # 数据模型
│   │   └── Story.ts          # 故事模型接口
│   ├── routes/          # 路由
│   │   └── storyRoutes.ts    # 故事API路由
│   └── server.ts        # 服务器入口文件
├── uploads/             # 上传文件存储目录
├── index.html           # 主页面
├── upload.html          # 上传页面
├── package.json         # 项目配置
├── tsconfig.json        # TypeScript配置
├── .env                 # 环境变量配置
└── README.md            # 项目说明
```