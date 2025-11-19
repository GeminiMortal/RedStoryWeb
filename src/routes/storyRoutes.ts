import express from 'express';
import { StoryDAO } from '../database/StoryDAO';
import { upload } from '../config/uploadConfig';

const router = express.Router();
const storyDAO = new StoryDAO();

// 获取所有故事 - GET /api/stories
router.get('/stories', async (req, res) => {
  try {
    const stories = await storyDAO.getAllStories();
    res.json(stories);
  } catch (error) {
    console.error('获取故事失败:', error);
    res.status(500).json({ error: '获取故事失败' });
  }
});

// 根据ID获取单个故事 - GET /api/stories/:id
router.get('/stories/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const story = await storyDAO.getStoryById(id);
    
    if (story) {
      res.json(story);
    } else {
      res.status(404).json({ error: '故事不存在' });
    }
  } catch (error) {
    console.error('获取故事失败:', error);
    res.status(500).json({ error: '获取故事失败' });
  }
});

// 上传故事 - POST /api/stories
router.post('/stories', upload.single('image'), async (req, res) => {
  try {
    const { title, content } = req.body;
    let imagePath = '';

    // 验证必填字段
    if (!title || !content) {
      return res.status(400).json({ error: '标题和内容是必填项' });
    }

    // 处理上传的图片
    if (req.file) {
      // 获取图片相对路径，与原PHP保持一致格式
      imagePath = `uploads/${req.file.filename}`;
    }

    // 创建故事
    const storyId = await storyDAO.createStory({
      title,
      content,
      image: imagePath
    });

    res.status(201).json({
      success: true,
      message: '故事上传成功',
      storyId
    });
  } catch (error: any) {
    console.error('上传故事失败:', error);
    res.status(500).json({
      success: false,
      message: error.message || '上传故事失败'
    });
  }
});

export default router;
