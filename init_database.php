<?php
// 引入数据库配置
require_once 'config.php';

try {
    // 创建stories表
    $sql = "CREATE TABLE IF NOT EXISTS stories (
        id INT(11) AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        content TEXT NOT NULL,
        image VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci";
    
    if ($conn->query($sql) === TRUE) {
        echo "数据库表初始化成功！";
    } else {
        echo "创建表时出错: " . $conn->error;
    }
    
    // 关闭连接
    $conn->close();
} catch (Exception $e) {
    echo "初始化数据库时出错: " . $e->getMessage();
}
?>