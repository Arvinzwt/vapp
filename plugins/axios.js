/**
 * Created by arvin on 2019/6/4.
 */
import qs from 'qs';
import {Message, Loading} from 'element-ui'

export default function ({$axios, store, redirect}) {
  // $axios.defaults.baseURL = "http://localhost:3000/users";//线上

  // 添加请求拦截器
  // $axios.onRequest(config => {
  //     return config;
  // }, error => {
  //     return Promise.reject(error);
  // });
  //
  // // 添加响应拦截器
  // $axios.onResponse(response => {
  //     //如果授权失败
  //     if (response.data.ret === "401") {
  //     }
  //     return response;
  // }, function (error) {
  //     return Promise.reject(error);
  // });

  //请求出错拦截
  // $axios.onRequestError(err=> {
  //     console.log('请求出错')
  // });

  //反馈出错拦截
  // $axios.onResponseError(err=> {
  //     console.log('返回出错')
  // });

  //出错时拦截
  // $axios.onError(error => {
  //     const code = parseInt(error.response && error.response.status)
  //     if (code === 400) {
  //         redirect('/')
  //     }
  // })
}