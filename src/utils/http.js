import axios from 'axios'
import Qs from 'qs'
// 环境的切换
// if (process.env.NODE_ENV == 'development') { //开发
//     axios.defaults.baseURL = '/api';}
// else if (process.env.NODE_ENV == 'debug') { //测试
//     axios.defaults.baseURL = 'https://www.ceshi.com';
// }
// else if (process.env.NODE_ENV == 'production') { //线上
//     axios.defaults.baseURL = 'https://www.production.com';
// }
// http://192.168.0.104:5000/ , http://192.168.7.219:5000/
const url = 'http://192.168.0.104:5000/'
const service = axios.create({
  baseURL: url,
  timeout: 36000,
  withCredentials: true,
  transformRequest: [function (data) { return Qs.stringify(data) }],
  headers: {
    // 默认是application/json形式的，需要设置成现在这样
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
  }
})
// 添加请求拦截器
// service.interceptors.request.use(
//   config => {
//     if (config.method === 'post' || config.method === 'put') {
//       // post、put 提交时，将对象转换为string, 为处理后台解析问题
//       config.data = Qs.stringify(JSON.parse(config.data))
//       // post、put 提交时，将对象转换为string, 为处理后台解析问题
//       // config.data = JSON.stringify(config.data)
//     }
//     // 请求发送前进行处理
//     return config
//   },
//   error => {
//     // 请求错误处理
//     console.log(error)
//     return Promise.reject(error)
//   },
// )

// // 添加响应拦截器
// service.interceptors.response.use(
//   response => {
//     const { data } = response
//     return data
//   },
//   error => {
//     let info = {}
//     const { status, statusText, data } = error.response
//     if (!error.response) {
//       info = {
//         code: 1500,
//         msg: 'Network Error',
//       }
//     } else {
//       // 此处整理错误信息格式
//       info = {
//         code: status,
//         data: data,
//         msg: statusText,
//       }
//     }
//     return Promise.reject(info)
//   },
// )
export default service