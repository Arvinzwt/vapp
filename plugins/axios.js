/**
 * @description: axios
 * @docs: http://www.axios-js.com/zh-cn/docs/nuxtjs-axios.html
 */
import config from '@/config/api';

export default ({store, $axios, app}, inject) => {
    const api = {
        /**
         *@desc 设置baseUrL
         *@return [promise] baseUrL
         */
        async getBaseUrl() {
            // let baseURL = '//mgr-api-dev.jronline.com/';
            let baseURL = 'http://localhost:3332/';

            if (process.client) {
                if (location.href.indexOf('crm.jronline.com') !== -1) {//pro
                    baseURL = "//mgr-api.jronline.com/";

                } else if (location.href.indexOf('dev') > -1) { //dev
                    baseURL = "//mgr-api-dev.jronline.com/";

                } else if (location.href.indexOf('uat') > -1) { //uat
                    baseURL = "//mgr-api-uat.jronline.com/";

                } else if (location.href.indexOf('test') > -1) { //test
                    baseURL = "//mgr-api-test.jronline.com/";
                }
            }

            return baseURL;
        },

        /**
         *@desc 设置Token-拉取localStorage并存储vuex
         *@return [promise] token
         */
        async setToken() {
            if (!$axios.defaults.headers.common['Authorization'] && process.client) {
                let userInfo = localStorage.getItem("userInfo");

                if (userInfo) {
                    let token = (JSON.parse(userInfo)).token;
                    $axios.setToken(token);
                    return true;
                }
            }
            return false;
        },

        /**
         *@desc 查询接口地址
         *@return [promise] url
         */
        async getUrl(url1, url2) {
            return config[url1][url2];
        },

        /**
         *@desc 处理请求
         *@return [promise] data
         */
        async request(method, url1, url2, data) {
            const baseURL = await this.getBaseUrl();
            const token = await this.setToken();
            const url = await this.getUrl(url1, url2);

            return $axios({
                method,
                url,
                baseURL,
                params: method === 'get' ? data : {},
                data: method === 'post' ? data : {},
            }).then(response => {
                return response.data;
            }).catch(error => {
                return Promise.reject(error); //执行reject()
            })
        }
    };

    inject('post', async (url1, url2, data) => {
        return api.request('POST', url1, url2, data);
    });

    inject('get', async (url1, rul2, data) => {
        return api.request('GET', url1, rul2, data);
    });


};