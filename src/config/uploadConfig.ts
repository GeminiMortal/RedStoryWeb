import multer from 'multer';
import path from 'path';
import { put } from '@vercel/blob';
import dotenv from 'dotenv';

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

// 上传文件到Vercel Blob的函数
export const uploadToBlob = async (file: Express.Multer.File): Promise<string> => {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    throw new Error('BLOB_READ_WRITE_TOKEN is not set');
  }

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
    console.error('Vercel Blob上传失败:', error);
    throw new Error('文件上传到云端失败');
  }
};
