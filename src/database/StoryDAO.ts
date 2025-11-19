import pool from './connection';
import { Story, CreateStoryRequest } from '../models/Story';

export class StoryDAO {
  // 获取所有故事，按创建时间降序排列
  async getAllStories(): Promise<Story[]> {
    const query = 'SELECT * FROM stories ORDER BY created_at DESC';
    const [rows] = await pool.execute(query);
    return rows as Story[];
  }

  // 创建新故事
  async createStory(story: CreateStoryRequest): Promise<number> {
    const query = `
      INSERT INTO stories (title, content, image, created_at) 
      VALUES (?, ?, ?, ?)
    `;
    const [result] = await pool.execute(query, [
      story.title,
      story.content,
      story.image || null,
      new Date()
    ]);
    // @ts-ignore
    return result.insertId;
  }

  // 根据ID获取单个故事
  async getStoryById(id: number): Promise<Story | null> {
    const query = 'SELECT * FROM stories WHERE id = ?';
    const [rows] = await pool.execute(query, [id]);
    const story = (rows as Story[])[0];
    return story || null;
  }
}
