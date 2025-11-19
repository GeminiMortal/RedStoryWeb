<?php
// 引入数据库配置
require_once 'config.php';

// 创建故事表的SQL语句
$sql = "CREATE TABLE IF NOT EXISTS stories (
    id INT(11) AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    image VARCHAR(255) DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;";

if ($conn->query($sql) === TRUE) {
    echo "故事表创建成功！";
} else {
    echo "创建表失败: " . $conn->error;
}

// 关闭连接
$conn->close();
?>