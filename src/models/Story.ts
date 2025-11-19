// Story数据模型接口
export interface Story {
  id: number;
  title: string;
  content: string;
  image: string;
  created_at: Date;
}

// 创建故事的请求接口
export interface CreateStoryRequest {
  title: string;
  content: string;
  image?: string;
}
