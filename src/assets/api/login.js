import { post } from './index.js';

export const login = (data) => {
  // 使用绝对路径确保请求的准确性
  return post('/php/index.php', data);
};
export const addcolum = (data) => {
  // 使用绝对路径确保请求的准确性
  return post('php/addcolum.php', data);
};
export const searchColum = (data) => {
  // 使用绝对路径确保请求的准确性
  return post('php/colum.php', data);
};