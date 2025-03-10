import { post  } from './index';

// 修改比赛接口
export const updateparticipants = (data) => {
  return post('php/updateparticipants.php', data);
};

// 查询当前比赛（参与比赛的状态）
export const selectparticipants = (data) => {
  return post('php/selectparticipants.php', data);
};

// 查询当前比赛(所有)
export const selectconpetion = (data) => {
  return post('php/selectconpetion.php', data);
};

// 查询用户
export const selectuser = (data) => {
  return post('php/selectuser.php', data);
};

// 更改用户权限
export const updateuser = (data) => {
  return post('php/updateuser.php', data);
};

// 删除用户
export const deluser = (data) => {
  return post('php/deluser.php', data);
};