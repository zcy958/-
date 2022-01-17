import axios from "axios";
import qs from 'qs'
import router from "../src/router";

let instance = axios.create(({
    timeout: 5000,
    withCredentials:true,
    baseURL:''
    // headers:{
    //     'Content-Type':'application/x-www-form-urlencoded'
    // },
    // transformRequest: data => qs.stringify(data)
}))

instance.interceptors.request.use(config=>{
    const token = localStorage.getItem('userToken')
    token&&(config.headers.Authorization = token)
    if (config.method === 'get') {
        config.paramsSerializer = function(params) {
            return qs.stringify(params, { arrayFormat: 'comma' })
        }
    }
    return config
},error =>{
    router.push({
        path: '/login',
        query:{
            redirect:router.currentRoute.fullPath
        }
    })
    return Promise.reject(error)
})

instance.interceptors.response.use(res =>{
    let token = res.headers.authorization
    if(token){
        localStorage.setItem("userToken",token)
    }
    return res.data
},error => {
    if(error && error.response){
        switch(error.response.status){
            case 401:
                console.log("尚未登陆");
                this.$route.replace({
                    path: '/login',
                    query:{
                        redirect: router.currentRoute.fullPath
                    }
                });
                break;
            default:console.log("未知错误");
        }
    }
    return Promise.reject(error);
})

const api = {
  /**
   * get 请求
   */
  get (url, params) {
    const config = {
      method: 'get',
      url: url
    }
    if (params) {
      config.params = params
    }
    return instance(config)
  },
  /**
   * post 请求，传递 json数据
   * @param url接口地址
   * @param data
   */
  post (url, params, data) {
    const config = {
      method: 'post',
      url: url
    }
    if (params) {
      config.params = params
    }
    if (data) {
      config.data = data
    }
    return instance(config)
  },
  /**
   * put 请求
   */
  put (url, params, data) {
    const config = {
      method: 'put',
      url: url
    }
    if (params) {
      config.params = params
    }
    if (data) {
      config.data = data
    }
    return instance(config)
  },
  /**
   * delete 请求
   */
  delete (url, params) {
    const config = {
      method: 'delete',
      url: url
    }
    if (params) {
      config.params = params
    }
    return instance(config)
  },
}


export default api