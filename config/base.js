import axios from 'axios';
import {Message} from "element-ui";

export default class base {
    constructor() {
        this.init();
    }

    /**
     *@desc 初始化axios配置
     */
    async init() {
        let baseURL = await this._getBaseURL();
        let token = await this._getToken();

        axios.defaults.baseURL = baseURL;//配置baseURL
        axios.defaults.headers.common['Authorization'] = token;//添加token
    }

    /**
     * TODO 根据后端配置修改
     *@desc 判定baseUrl
     *@return promise [promise] baseUrl
     */
    async _getBaseURL() {
        let baseURL = '//mgr-api-dev.jronline.com/';

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
    }

    /**
     * TODO 根据权鉴处理修改
     *@desc 拉取token
     *@return promise [promise] token
     */
    async _getToken() {
        let token = '';
        if (!axios.defaults.headers.common['Authorization'] && process.client) {
            let userInfo = localStorage.getItem("userInfo");

            if (userInfo) {
                token = (JSON.parse(userInfo)).token;
            }
        }
        return token;
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
        return axios({
            method,
            url,
            ...data,
        }).then(response => {
            let code = response.data.code;//获取状态码

            if (code === 401) {

            }

            if (code !== 200) {
                return Promise.reject(response); //执行reject()
            }

            if (isAllParams) {
                return response;
            }

            return response.data.data;
        }).catch(error => {
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
}