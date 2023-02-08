import qs from 'qs'
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import { ElMessage } from 'element-plus'
import { LoginParams } from '@/api/user/UserModel'
import { cleanSession, getToken } from '@/utils/auth'

export interface Result<T = any> {
  code: number
  msg: string
  data: T
}
enum statusCode { //后端定义的状态，不进入错误
  NoAuth = 401001,
  Success = 200
}

class request {
  private instance: AxiosInstance
  constructor(config: AxiosRequestConfig) {
    //创建axios实例
    this.instance = axios.create(config)
    this.interceptors()
  }
  //拦截器配置
  private interceptors() {
    //请求发送之前的拦截器，添加token
    this.instance.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        //配置token
        let token = getToken()
        if (token) {
          config.headers = {
            ...config.headers,
            token: token
          }
        }
        return config
      },
      (error: any) => {
        error.data = {}
        error.data.msg = '服务器异常，请联系管理员！'
        return error
      }
    )
    //请求返回后的拦截器
    this.instance.interceptors.response.use(
      (res) => {
        if (res && res.data) {
          const data = res.data
          //后端放回状态 code根据后端返回的看是code还是statusCode
          if (data.code == statusCode.NoAuth) {
            // 跳到登录
            window.location.href = '/login'
            //token过期 清除缓存数据
            cleanSession()
          } else if (data.code == statusCode.Success || res.config.responseType === 'arraybuffer') {
            //返回成功
            return res
          } else {
            ElMessage.error(data.msg || '服务器出错')
            return res || null
          }
        }
      },
      (error) => {
        // 这里是遇到报错的回调
        console.log('进入错误')
        error.data = {}
        if (error && error.response) {
          switch (error.response.status) {
            case 400:
              error.data.msg = '错误请求'
              ElMessage.error(error.data.msg)
              break
            case 401:
              error.data.msg = '未授权，请重新登录'
              ElMessage.error(error.data.msg)
              break
            case 403:
              error.data.msg = '拒绝访问'
              ElMessage.error(error.data.msg)
              break
            case 404:
              error.data.msg = '请求错误,未找到该资源'
              ElMessage.error(error.data.msg)
              break
            case 405:
              error.data.msg = '请求方法未允许'
              ElMessage.error(error.data.msg)
              break
            case 408:
              error.data.msg = '请求超时'
              ElMessage.error(error.data.msg)
              break
            case 500:
              error.data.msg = '服务器端出错'
              ElMessage.error(error.data.msg)
              break
            case 501:
              error.data.msg = '网络未实现'
              ElMessage.error(error.data.msg)
              break
            case 502:
              error.data.msg = '网络错误'
              ElMessage.error(error.data.msg)
              break
            case 503:
              error.data.msg = '服务不可用'
              ElMessage.error(error.data.msg)
              break
            case 504:
              error.data.msg = '网络超时'
              ElMessage.error(error.data.msg)
              break
            case 505:
              error.data.msg = 'http版本不支持该请求'
              ElMessage.error(error.data.msg)
              break
            default:
              error.data.msg = `连接错误${error.response.status}`
              ElMessage.error(error.data.msg)
          }
        } else {
          error.data.msg = '连接到服务器失败'
          ElMessage.error(error.data.msg)
        }
        // return Promise.reject(error)
        return error
      }
    )
  }
  get<T = any>(url: string, params?: any): Promise<Result<T>> {
    //加问号就是可传可不传
    return new Promise((resolve, reject) => {
      this.instance
        .get<T>(url, {
          params,
          paramsSerializer: (params) => {
            return qs.stringify(params)
          }
        })
        .then((res) => {
          resolve(res.data as any)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }
  //restful api

  //参数处理
  getParams(params: any) {
    let _params = ''
    if (params === undefined || params === null) _params = ''
    else {
      for (const key in params) {
        if (params.hasOwnProperty(key) && params[key]) _params += `${params[key]}/`
      }
    }
    if (_params) _params = _params.slice(0, _params.length - 1)
    return _params
  }

  getRestApi<T = any>(url: string, params?: any): Promise<Result<T>> {
    return new Promise((resolve, reject) => {
      this.instance
        .get<T>(this.getParams(params) ? `${url}/${this.getParams(params)}` : url)
        .then((res) => {
          resolve(res.data as any)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }
  //post请求
  post<T = any>(url: string, params: any): Promise<Result<T>> {
    return new Promise((resolve, reject) => {
      this.instance
        .post(url, params, {
          transformRequest: [
            (params) => {
              return JSON.stringify(params)
            }
          ],
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then((res) => {
          resolve(res.data as any)
        })
        .catch((err) => {
          resolve(err)
        })
    })
  }
  //put请求
  put<T = any>(url: string, params: any): Promise<Result<T>> {
    return new Promise((resolve, reject) => {
      this.instance
        .put(url, params, {
          transformRequest: [
            (params) => {
              return JSON.stringify(params)
            }
          ],
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then((res) => {
          resolve(res.data as any)
        })
        .catch((err) => {
          resolve(err)
        })
    })
  }
  //delete请求
  delete<T = any>(url: string, params: any): Promise<Result<T>> {
    return new Promise((resolve, reject) => {
      this.instance
        .delete<T>(this.getParams(params) ? `${url}/${this.getParams(params)}` : url)
        .then((res) => {
          resolve(res.data as any)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }
  getImage(url: string) {
    return this.instance.post(url, null, {
      responseType: 'arraybuffer'
    })
  }
  login<T = any>(url: string, params: LoginParams): Promise<Result<T>> {
    return new Promise((resolve, reject) => {
      this.instance
        .post<T>(url, params, {
          transformRequest: [
            (params) => {
              return qs.stringify(params)
            }
          ],
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
        .then((res) => {
          resolve(res as any)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }
}
export default request
