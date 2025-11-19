# 代码里的红色记忆

一个用于展示和上传红色故事的Web应用。

## 1. 技术栈

- **前端**: HTML5, CSS3, JavaScript, Vue.js 2, Bootstrap 5, jQuery, Font Awesome, Redactor (富文本编辑器)
- **后端**: PHP 7.0+
- **数据库**: MySQL 5.7+
- **HTTP请求**: Axios

## 2. 项目结构

```
RedStoryWeb/
├── index.html          # 主页面，轮播展示红色故事
├── upload.html         # 上传页面，用于上传新的红色故事
├── config.php          # 数据库配置文件
├── init_database.php   # 数据库初始化脚本
├── upload.php          # 上传功能后端处理
├── api/
│   └── getStories.php  # 获取红色故事API
├── uploads/            # 图片上传目录（自动创建）
├── README.md           # 项目简介
└── README_DETAILED.md  # 详细说明文档
```

## 功能特点

1. **轮播展示**: 
   - 上下轮播的红色故事展示
   - 最多三行轮播，根据屏幕宽度自适应
   - 相邻轮播行轮播方向相反

2. **上传功能**: 
   - 支持上传故事标题、内容和图片
   - 使用富文本编辑器编辑故事内容
   - 图片大小限制为5MB
   - 自动将新故事添加到内容最少的轮播行

## 三、安装与使用

### 1. 环境要求

- PHP 7.0 或更高版本
- MySQL 5.7 或更高版本
- Web服务器（如Apache、Nginx等）
- 现代浏览器（支持HTML5、JavaScript）

### 2. 数据库配置

1. 在MySQL中创建一个新的数据库，命名为 `red_story_db`
2. 编辑 `config.php` 文件，修改数据库连接信息：

```php
$servername = "localhost";  // 数据库服务器地址
$username = "root";         // 数据库用户名
$password = "";             // 数据库密码
$dbname = "red_story_db";   // 数据库名称
```

### 3. 初始化数据库

在浏览器中访问 `init_database.php` 文件，例如：
```
http://localhost/RedStoryWeb/init_database.php
```

这将创建所需的数据库表结构。

### 4. 运行应用

在浏览器中访问 `index.html` 文件，例如：
```
http://localhost/RedStoryWeb/index.html
```

## 数据结构

### 数据库表结构

#### stories 表

| 字段名 | 数据类型 | 描述 |
|-------|---------|------|
| id | INT(11) | 主键，自动递增 |
| title | VARCHAR(255) | 故事标题 |
| content | TEXT | 故事内容 |
| image | VARCHAR(255) | 故事图片路径 |
| created_at | TIMESTAMP | 创建时间，默认当前时间 |

## 使用说明

### 浏览红色故事

1. 打开主页面 `index.html`
2. 上下滚动浏览不同行的红色故事
3. 点击任意故事卡片查看完整内容（待实现）

### 上传红色故事

1. 点击右上角的 "上传红色故事" 按钮
2. 填写故事标题
3. 使用富文本编辑器编写故事内容
4. 选择并上传故事图片（可选）
5. 点击 "上传故事" 按钮提交
6. 上传成功后将自动返回主页面

## 注意事项

1. 确保PHP的文件上传功能已启用
2. 确保 `uploads` 目录具有可写权限
3. 图片大小限制为5MB
4. 支持的图片格式：JPG, JPEG, PNG, GIF

## 浏览器支持

- Chrome (推荐)
- Firefox
- Safari
- Edge

## 许可证

本项目采用 MIT 许可证。
