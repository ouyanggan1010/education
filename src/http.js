

// 引用axios
import axios from "axios";
import Vue from 'vue'
import router from './router'
axios.defaults.withCredentials = true;

const http = axios.create({
    // 后台请求接口的地址
    baseURL: process.env.VUE_APP_API_URL
});
http.interceptors.request.use(
  config => {
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);
http.interceptors.response.use(
  res => {
    if (res.data.code == '888'){
        // Vue.prototype.$Toast({
        //     duration: 2000,
        //     message: res.data.msg,
        //     forbidClick: true,
        //     onClose() {
        //         router.push("/login");
        //     }
        // });
        Vue.prototype.$Dialog.alert({
            message: '未登录，请重新登录',
          }).then(() => {
            router.push("/login");
          });
      }
    return res;
  },
  err => {
    Vue.prototype.$Toast('数据加载失败，请检查网络');
    return Promise.reject(err);
  }
);



// 输出htpp
export default http;

