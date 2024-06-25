import { post } from './index.js';
// 登陆
export const login = (data) => {
  // 使用绝对路径确保请求的准确性
  return post('/php/index.php', data);
};
// 添加分类
export const addcolum = (data) => {
  return post('php/addcolum.php', data);
};
// 查询分类列表
export const searchColum = (data) => {
  return post('php/colum.php', data);
};
// 修改分类
export const upColum = (data) => {
  return post('php/updatecolum.php', data);
};

// 删除分类

export const delColum = (data) => {
  return post('php/delcolum.php', data);
};

// 添加新闻
export const addNews = (data) => {
  return post('php/addcontent.php', data);
};

// 查询新闻列表

export const searchNews = (data) => {
  return post('php/getcontent.php', data);
};

// 修改新闻

export const upNews = (data) => {
  return post('php/undatecontent.php', data);
};

// 删除新闻

export const delNews = (data) => {
  return post('php/delcontent.php', data);
};