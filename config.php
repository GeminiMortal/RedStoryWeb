<?php
// 数据库配置
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "red_story_db";

// 创建数据库连接
$conn = new mysqli($servername, $username, $password, $dbname);

// 检查连接
if ($conn->connect_error) {
    die("数据库连接失败: " . $conn->connect_error);
}

// 设置字符集为UTF-8
$conn->set_charset("utf8mb4");
?>