
import axios from 'axios';
axios.defaults.baseURL = 'http://192.168.31.126:86'; 
import Qs from 'qs';

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