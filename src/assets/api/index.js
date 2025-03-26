
import axios from 'axios';
// axios.defaults.baseURL = 'http://yuncheap.icu'; 
axios.defaults.baseURL = 'http://zhanglin:8080/'; 
const baseURL = 'http://zhanglin:8080';
import Qs from 'qs';

export default baseURL;
export const post = (url, data) => {
  return axios({
    method: 'post',
    url: url,
    data: Qs.stringify(data),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    }
  });
};

export const get = (url, data) => {
  return axios({
    method: 'get',
    url: url,
    params: data
  });
};

function checkDatabaseConnection() {
  axios.post('php/database.php')
      .then(function (response) {
          // 请求成功处理
          if (response.data.status === 'success') {
              console.log(response.data.message); // 显示成功消息
          } else {
            console.log(response.data.message); // 显示连接失败消息
          }
      })
      .catch(function (error) {
          // 请求失败处理
          console.error('Error connecting to database:', error);
          alert('Error connecting to database. Please try again later.');
      });


}







// 调用发送请求的函数
checkDatabaseConnection();