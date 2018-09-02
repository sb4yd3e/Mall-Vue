import axios from 'axios'

// 创建axios实例
const service = axios.create({
  timeout: 15000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(config => {
  return config
}, error => {
  console.log(`- request error: ${JSON.stringify(error)}`) // for debug
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
    console.log(response.data)
    return response.data
  },
  error => {
    console.log(`- response error: ${JSON.stringify(error)}`) // for debug
    return Promise.reject(error)
  }
)

export default service
