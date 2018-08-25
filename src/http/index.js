/* eslint-disable */
import Axios from 'axios';

Axios.defaults.baseURL = '/api';
Axios.defaults.headers.post['Content-Type'] = 'application/json';
// Axios.defaults.headers.post['Accept'] = 'application/json';
//http request 拦截器
// Axios.interceptors.request.use(
//   config => {
//     // const token = getCookie('名称');注意使用的时候需要引入cookie方法，推荐js-cookie
//     config.data = JSON.stringify(config.data);
//     config.headers = {
//       'Content-Type':'application/x-www-form-urlencoded'
//     }
//     // if(token){
//     //   config.params = {'token':token}
//     // }
//     return config;
//   },
//   error => {
//     return Promise.reject(err);
//   }
// );


// //http response 拦截器
// Axios.interceptors.response.use(
//   response => {
//     if(response.data.errCode ==2){
//       router.push({
//         path:"/login",
//         querry:{redirect:router.currentRoute.fullPath}//从哪个页面跳转
//       })
//     }
//     return response;
//   },
//   error => {
//     return Promise.reject(error)
//   }
// )


/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function fetch(url,params={}){
  return new Promise((resolve,reject) => {
    Axios.get(url,{
      params:params
    })
    .then(response => {
      resolve(response.data);
    })
    .catch(err => {
      reject(err)
    })
  })
}


/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

// 抛出所有的response 
async function base_post (url, data = {}) {
  console.log(`- BASE_POST_TO: \n${url}`);
  console.log(`- BASE_POST_DATA: \n${JSON.stringify(data)}`);
  let   response = {};
  try {
    let res = await Axios.post (url, data);
    // console.log(`- BASE_POST_SUCCESS: \n${JSON.stringify(res.data)}`);
    response = res;
  } catch (err) {
    // console.log(`- BASE_POST_ERROR: \n${JSON.stringify(err.response.data)}`);
    response  = err.response;
  }
  return response;
}

//返回最后的data
export async function post (url, data) {
  try {
    let response = await base_post (url, data);
    if (/^2[0-9]+$/.test (response.status)) {
      //返回的是2XX status
      console.log (`- POST_2XX(${response.status}):\n${JSON.stringify (response.data)}`);
      return response.data;
    } else {
      console.log (`- POST_ERROR(${response.status}):\n${JSON.stringify (response.data)}`);
      return {};
    }
  } catch (err) {
    console.error (err);
  }
}

 /**
 * 封装patch请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function patch(url,data = {}){
  return new Promise((resolve,reject) => {
    Axios.patch(url,data)
         .then(response => {
           resolve(response.data);
         },err => {
           reject(err)
         })
  })
}

 /**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function put(url,data = {}){
  return new Promise((resolve,reject) => {
    Axios.put(url,data)
         .then(response => {
           resolve(response.data);
         },err => {
           reject(err)
         })
  })
}