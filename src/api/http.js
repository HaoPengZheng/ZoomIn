import axios from 'axios'
import { Message } from 'element-ui';
import qs from 'qs'
const defaultErrorMessage = {
  message: "出错了",
  type: "error",
  showClose: true,
  duration: 1500
}

axios.defaults.baseURL = 'http://120.79.146.91:8000';

axios.interceptors.request.use(
  config => {
    let token = localStorage.getItem("token");
    config.headers = {
      'Authorization': "JWT " + token
    }
    console.log(config.headers);
    return config;
  },
  error => {
    return Promise.reject(err);
  }
);

axios.interceptors.response.use(
  response => {
    if (response.data.errCode == 2) {
      router.push({
        path: "/login",
        query: { redirect: router.currentRoute.fullPath }//从哪个页面跳转
      })
    }
    return response;
  },
  error => {
    return Promise.reject(error)
  }
)

/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function get(url, params = {}) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: params
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

export function post(url, data = {}, errormessage = defaultErrorMessage) {
  return new Promise((resolve, reject) => {
    axios.post(url, data)
      .then(response => {
        resolve(response.data);
      }, err => {
        console.log(err)
        console.log("???")
        this.$message(errormessage);
        reject(err)
      })
  })
}

/**
* 封装patch请求
* @param url
* @param data
* @returns {Promise}
*/

export function patch(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.patch(url, data)
      .then(response => {
        resolve(response.data);
      }, err => {
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

export function put(url, data = {}) {
  data = qs.stringify(data);
  return new Promise((resolve, reject) => {
    axios.put(url, data)
      .then(response => {
        resolve(response.data);
      }, err => {
        console.log(err.response.data.non_field_errors[0]);
        reject(err)
      })
  })
}
/**
* 封装delete请求
* @param url
* @param data
* @returns {Promise}
*/

export function toDelete(url, data = {}, errormessage = defaultErrorMessage) {
  return new Promise((resolve, reject) => {
    axios.delete(url, data)
      .then(response => {
        resolve(response.data);
      }, err => {
        this.$message(errormessage);
        reject(err)
      })
  })
}
