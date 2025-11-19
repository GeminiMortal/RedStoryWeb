<?php
// 引入数据库配置
require_once '../config.php';

// 设置响应头
header('Content-Type: application/json; charset=utf-8');

// 初始化响应数据
$response = array('success' => false, 'stories' => array());

// 准备SQL语句
$sql = "SELECT * FROM stories ORDER BY created_at DESC";
$result = $conn->query($sql);

if ($result) {
    // 检查是否有结果
    if ($result->num_rows > 0) {
        $stories = array();
        
        // 获取所有故事
        while($row = $result->fetch_assoc()) {
            $stories[] = $row;
        }
        
        $response['success'] = true;
        $response['stories'] = $stories;
    } else {
        $response['message'] = "没有找到红色故事";
    }
    
    // 释放结果集
    $result->free();
} else {
    $response['message'] = "查询失败: " . $conn->error;
}

// 关闭数据库连接
$conn->close();

// 返回响应
echo json_encode($response, JSON_UNESCAPED_UNICODE);
?>