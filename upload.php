<?php
// 引入数据库配置
require_once 'config.php';

// 设置响应头为JSON
header('Content-Type: application/json; charset=utf-8');

// 创建uploads目录（如果不存在）
$uploadDir = 'uploads/';
if (!file_exists($uploadDir)) {
    mkdir($uploadDir, 0755, true);
}

try {
    // 获取表单数据
    $title = $_POST['title'];
    $content = $_POST['content'];
    $imagePath = '';
    
    // 处理图片上传
    if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
        $file = $_FILES['image'];
        $fileName = basename($file['name']);
        $fileType = pathinfo($fileName, PATHINFO_EXTENSION);
        
        // 验证文件类型
        $allowedTypes = array('jpg', 'jpeg', 'png', 'gif');
        if (in_array(strtolower($fileType), $allowedTypes)) {
            // 生成唯一文件名
            $newFileName = uniqid() . '.' . $fileType;
            $imagePath = $uploadDir . $newFileName;
            
            // 移动上传文件
            if (!move_uploaded_file($file['tmp_name'], $imagePath)) {
                throw new Exception('图片上传失败');
            }
        } else {
            throw new Exception('不支持的图片类型');
        }
    }
    
    // 插入数据到数据库
    $sql = "INSERT INTO stories (title, content, image) VALUES (?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sss", $title, $content, $imagePath);
    
    if ($stmt->execute()) {
        $response = array(
            'success' => true,
            'message' => '故事上传成功'
        );
    } else {
        throw new Exception('数据库插入失败: ' . $stmt->error);
    }
    
    // 关闭语句和连接
    $stmt->close();
    $conn->close();
    
} catch (Exception $e) {
    $response = array(
        'success' => false,
        'message' => $e->getMessage()
    );
}

// 返回JSON响应
echo json_encode($response, JSON_UNESCAPED_UNICODE);
?>