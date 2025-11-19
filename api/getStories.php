<?php
// 引入数据库配置
require_once '../config.php';

// 设置响应头为JSON
header('Content-Type: application/json; charset=utf-8');

try {
    // 查询所有故事，按创建时间降序排列
    $sql = "SELECT * FROM stories ORDER BY created_at DESC";
    $result = $conn->query($sql);
    
    $stories = array();
    if ($result->num_rows > 0) {
        // 输出每行数据
        while($row = $result->fetch_assoc()) {
            $stories[] = $row;
        }
    }
    
    // 返回JSON格式数据
    echo json_encode($stories, JSON_UNESCAPED_UNICODE);
    
    // 关闭连接
    $conn->close();
} catch (Exception $e) {
    // 返回错误信息
    echo json_encode(array('error' => $e->getMessage()));
}
?>