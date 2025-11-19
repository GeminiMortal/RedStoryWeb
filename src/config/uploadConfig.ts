import multer from 'multer';
import path from 'path';
import { put } from '@vercel/blob';
import dotenv from 'dotenv';
import fs from 'fs';

// 确保uploads目录存在
const uploadDir = './uploads';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

dotenv.config();

// 使用内存存储
const storage = multer.memoryStorage();

// 文件过滤（只允许图片类型）
const fileFilter = (req: Express.Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const allowedTypes = /jpeg|jpg|png|gif/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('只允许上传图片文件（JPG、PNG、GIF）'));
  }
};

// 创建multer实例
export const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 限制文件大小为5MB
  }
});

// 保存文件到本地的函数
const saveFileLocally = (file: Express.Multer.File): string => {
  // 生成唯一文件名
  const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
  const fileExtension = path.extname(file.originalname);
  const filename = `${uniqueSuffix}${fileExtension}`;
  const filePath = path.join(uploadDir, filename);

  // 保存文件到本地
  fs.writeFileSync(filePath, file.buffer);

  // 返回相对URL
  return `/uploads/${filename}`;
};

// 上传文件的函数（优先使用Vercel Blob，失败时使用本地存储）
export const uploadToBlob = async (file: Express.Multer.File): Promise<string> => {
  // 检查是否配置了Vercel Blob
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    // 生成唯一文件名
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const fileExtension = path.extname(file.originalname);
    const filename = `red-story/${uniqueSuffix}${fileExtension}`;

    try {
      // 上传到Vercel Blob
      const blob = await put(filename, file.buffer, {
        access: 'public',
        token: process.env.BLOB_READ_WRITE_TOKEN,
      });

      return blob.url;
    } catch (error) {
      console.error('Vercel Blob上传失败，将使用本地存储:', error);
      // Vercel Blob上传失败，使用本地存储
      return saveFileLocally(file);
    }
  } else {
    console.warn('BLOB_READ_WRITE_TOKEN未配置，将使用本地存储');
    // 未配置Vercel Blob，使用本地存储
    return saveFileLocally(file);
  }
};
