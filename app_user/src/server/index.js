import Vue from 'vue'
import axios from 'axios'
import { getSSession } from '../utils/session.js'
// import store from '../store/store.js'
// Vue.prototype.$http = axios
import signCkeck from '../utils/sign.js'
export let baseURL ='http://112.74.183.29:8095/newspring/';
// export let baseURL ='http://112.74.183.29:8095/newspring/';
const instance = axios.create({
    baseURL: 'http://112.74.183.29:8095/newspring/',
    // baseURL: 'http://112.74.183.29:8095/newspring/',
    headers: {
        // 'Content-Type': 'application/x-www-form-urlencoded;application/json;charset=utf-8'
        'Content-Type': 'application/json'
      }
})
instance.interceptors.request.use(config =>{
    // console.log(getSSession('access_token'))

    if(getSSession('access_token')){
      // console.log(getSSession('access_token'))
      config.headers['access_token'] = getSSession('access_token');
      // console.log(config)
    }
    return config
},error => {
    // 对请求错误做些什么
    return Promise.reject(error)
})

instance.interceptors.response.use(response =>{

    if(response.status==200){
      return response.data
    }else{
      return response
    }
},error => {
    // 对请求错误做些什么
    console.log(error)
    if (error && error.response) {
        switch (error.response.status) {
          case 400:
            error.message = '请求错误'
            break
    
          case 401:
            error.message = '未授权，请登录'
            break
    
          case 403:
            error.message = '拒绝访问'
            break
    
          case 404:
            error.message = `请求地址出错: ${err.response.config.url}`
            break
    
          case 408:
            error.message = '请求超时'
            break
    
          case 500:
            error.message = '服务器内部错误'
            break
    
          case 501:
            error.message = '服务未实现'
            break
    
          case 502:
            error.message = '网关错误'
            break
    
          case 503:
            error.message = '服务不可用'
            break
    
          case 504:
            error.message = '网关超时'
            break
    
          case 505:
            error.message = 'HTTP版本不受支持'
            break
    
          default:
        }
      }
      error.message = '请求错误'
    return error
})
//登录
export function postlogin (params={}){
    return instance.post('/login',params)
}
//获取抽奖信息
export function getmydata (params={}){
    params.token = getSSession('access_token');
    return instance.post('/getmydata',params)
}
//抽奖一次{access_token:''}
export function lottery (params={}){
    params.token = getSSession('access_token');
    return instance.post('/lottery',params)
}
//获取手机验证码{phone:''}
export function getcode (params={}){
    params.token = getSSession('access_token');
    return instance.post('/getcode',params)
}
//领奖
export function receive (params={}){
    params.token = getSSession('access_token');
    return instance.post('/receive',params)
}
//领奖
export function getposterbyid (params={}){
    params.token = getSSession('access_token');
    return instance.post('/getposterbyid',params)
}
//获取微信
export function getshareconfig (params={}){
    params.token = getSSession('access_token');
    return instance.post('/getshareconfig',params)
}