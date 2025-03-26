import { post , get  } from './index';

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

// 修改比赛
export const updatecontent = (data) => {
  return post('php/updatecontent.php', data);
};

// 审批比赛
export const updatereviewcontent = (data) => {
  return post('php/updatereviewcontent.php', data);
};

export const delcompetion = (data) => {
  return post('php/delcompetion.php', data);
};

// 删除比赛和参赛情况
export const delparticipants = (data) => {
  return post('php/delparticipants.php', data);
};



// 查询比赛和参赛情况
export const selectcontentpartic  = (data) => post("/php/selectcontentpartic.php",data)

// 查询参赛作品
export const selectentry  = (data) => get("/php/selectentry.php",data)

// 更改参赛作品状态
export const updateentry  = (data) => post("/php/updateentry.php",data)