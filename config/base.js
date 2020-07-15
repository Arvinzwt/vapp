import axios from 'axios';
import {Message, Loading} from "element-ui";

export default class base {
    constructor() {
        this.setBaseURL();
    }

    /**
     * TODO 根据后端配置修改
     *@desc 判定baseUrl
     *@return promise [promise] baseUrl
     */
    async setBaseURL() {
        // let baseURL = '//mgr-api-dev.jronline.com/';
        // let baseURL = 'http://t-testbank.onesmart.org/TestBank2';
        let baseURL = 'http://question-test.jronline.com';

        if (process.client) {
            if (location.host.indexOf('crm.jronline.com') !== -1) {//pro
                baseURL = "//mgr-api.jronline.com/";

            } else if (location.host.indexOf('dev') > -1) { //dev
                baseURL = "//mgr-api-dev.jronline.com/";

            } else if (location.host.indexOf('uat') > -1) { //uat
                baseURL = "//mgr-api-uat.jronline.com/";

            } else if (location.host.indexOf('test') > -1) { //test
                baseURL = "//mgr-api-test.jronline.com/";
            }
        }
        axios.defaults.baseURL = baseURL;//配置baseURL
    }

    /**
     * TODO 根据权鉴处理修改
     *@desc 拉取token
     *@return promise [promise] token
     */
    async setToken() {
        if (!axios.defaults.headers.common['Authorization'] && process.client) {
            let userInfo = localStorage.getItem("userInfo");

            if (userInfo) {
                axios.defaults.headers.common['Authorization'] = (JSON.parse(userInfo)).token;//添加token
            }
        }
    }

    /**
     *@desc 处理请求
     *@param method [String] 请求方式
     *@param url [String] 请求地址参数
     *@param data [Object] 请求参数 （默认空）
     *@param config [Object] 请求配置（默认空）
     *
     * TODO 根据后端数据结构进行修改
     *@param config[isLoading] [Boolean] 是否需要loading 默认true
     *@param config[isAllParams] [Boolean] 是否需要返回全部数据 默认false
     *@param config[isPrompt] [Boolean] 是否需要提示业务错误信息 默认true
     *@param config[isToken] [Boolean] 改接口是否需要token 默认true
     *@return promise [promise]
     */
    async request(method, url, data = {}, {isLoading = true, isAllParams = false, isPrompt = true, isToken = true} = {}) {
        await this.setToken();//设置token

        let loadingInstance = Loading.service({
            lock: true,
            text: 'Loading...',
            background: 'rgba(255, 255, 255, 0.7)',
            spinner: 'el-icon-loading',
            customClass: 'crm-loading'
        });

        return axios({
            method,
            url,
            ...data,
        }).then(response => {
            loadingInstance.close(); //关闭loading
            let code = response.data.code;//获取状态码

            if (code === 403) {
                return global.$nuxt.$store.dispatch('loginOut');
            }

            if (code !== 0) {
                return Promise.reject(response); //执行reject()
            }

            if (isAllParams) {
                return response;
            }

            return response.data.data;
        }).catch(error => {
            loadingInstance.close(); //关闭loading
            let errorMsg = error.message;

            if (error.data) {
                errorMsg = error.data.msg
            }

            Message.error(errorMsg);
            return Promise.reject(error); //执行reject()
        })
    }

    /**
     *@desc post请求
     *@return promise [promise] token
     */
    post(url, data, config) {
        return this.request('POST', url, {data: data}, config)
    }

    /**
     *@desc get请求
     *@return promise [promise] token
     */
    get(url, data, config) {
        return this.request('GET', url, {params: data}, config)
    }

    demo(url, data, config) {
        return axios({
            method: 'POST',
            url: 'http://10.252.29.91:8032/api/Index/getFile',
            // url: 'http://10.252.28.84:13117/testpaper/fileAnalysis',
            data,
            headers: {
                'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
            }
        }).then(response => {
            return response.data.data;
        }).catch(error => {

        })
    }
}