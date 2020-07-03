/**
 * @description: axios
 * @docs: http://www.axios-js.com/zh-cn/docs/nuxtjs-axios.html
 */
export default ({store, $axios, app}) => {
    // 请求拦截器
    $axios.onRequest(config => {
        return config;
    }, error => {
        return Promise.reject(error);
    });

    // 响应拦截器
    $axios.onResponse(response => {
        return response;
    }, error => {
        return Promise.reject(error);
    });

    //出错时拦截
    $axios.onError(error => {

    });
};
