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