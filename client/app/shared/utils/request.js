import axios from 'axios'
import { AppConfig } from '../../config/app.config'

const service = axios.create({
  baseURL: AppConfig.endpoints.frontend,
  timeout: 5000
})

service.interceptors.request.use(config => {
  return config
}, error => {
  console.log(error)
  Promise.reject(error)
})

service.interceptors.response.use(
  response => response,
  error => {
    console.log('err' + error)
    return Promise.reject(error)
  })

export default service
