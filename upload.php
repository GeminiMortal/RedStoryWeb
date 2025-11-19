<?php
// 引入数据库配置
require_once 'config.php';

// 设置响应头
header('Content-Type: application/json; charset=utf-8');

// 初始化响应数据
$response = array('success' => false, 'message' => '');

// 检查是否有文件上传
if (isset($_FILES['image'])) {
    $target_dir = "uploads/";
    
    // 确保上传目录存在
    if (!file_exists($target_dir)) {
        mkdir($target_dir, 0777, true);
    }
    
    // 生成唯一的文件名
    $imageFileType = strtolower(pathinfo($_FILES["image"]["name"], PATHINFO_EXTENSION));
    $new_filename = uniqid() . '.' . $imageFileType;
    $target_file = $target_dir . $new_filename;
    
    // 允许的文件格式
    $allowed_types = array('jpg', 'jpeg', 'png', 'gif');
    
    // 检查文件格式
    if (in_array($imageFileType, $allowed_types)) {
        // 检查文件大小（限制为5MB）
        if ($_FILES["image"]["size"] <= 5000000) {
            // 移动上传的文件
            if (move_uploaded_file($_FILES["image"]["tmp_name"], $target_file)) {
                $image_path = $target_file;
            } else {
                $response['message'] = "文件上传失败";        
            }
        } else {
            $response['message'] = "文件太大，不能超过5MB";
        }
    } else {
        $response['message'] = "只允许上传JPG, JPEG, PNG和GIF格式的图片";
    }
}

// 检查表单数据
if (isset($_POST['title']) && isset($_POST['content'])) {
    $title = $_POST['title'];
    $content = $_POST['content'];
    $image = isset($image_path) ? $image_path : null;
    
    // 准备SQL语句
    $stmt = $conn->prepare("INSERT INTO stories (title, content, image) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $title, $content, $image);
    
    // 执行SQL语句
    if ($stmt->execute()) {
        $response['success'] = true;
        $response['message'] = "红色故事上传成功";
    } else {
        $response['message'] = "数据库插入失败: " . $stmt->error;
    }
    
    // 关闭语句
    $stmt->close();
} else {
    $response['message'] = "缺少必要的表单数据";
}

// 关闭数据库连接
$conn->close();

// 返回响应
echo json_encode($response, JSON_UNESCAPED_UNICODE);
?>