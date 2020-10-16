/**
 * @description: api方法管理
 */

import config from "./config";
import {Message, Loading} from "element-ui";

export default class Request {
    constructor(context) {
        this.context = context;
    }

    /**
     *@desc 处理请求
     *@param method [String] 请求方式
     *@param url [String] 请求地址参数
     *@param data [Object] 请求参数 （默认空）
     *@param options [Object] 请求配置（默认空）
     *@param options [Object] loadingInstance是否出现loading，默认出现
     *@param options [Object] showToast接口错误时是否弹出错误信息，默认出现
     *@param options [Object] filterData是否过滤接口返回数据，默认过滤
     *@return promise [promise]
     */
    request(method, url, data = {}, options = {}) {
        let {$axios, redirect, store} = this.context;
        let {loadingInstance = true, showToast = true, filterData = true, responseType = 'json'} = options;

        //如果运行出现loading,设置loading对象
        if (loadingInstance) {
            loadingInstance = Loading.service({
                lock: true,
                spinner: 'el-icon-loading',
                customClass: 'jr-loading'
            });
        }

        // axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
        // 请求数据
        return $axios({
            url,
            method,
            ...data,
            responseType,
            baseURL: config.baseUrl,
        }).then(response => {
            let code = response.data.code;//获取状态码
            if (loadingInstance) loadingInstance.close(); //关闭loading

            // 如果是数据流形态
            if (responseType === 'blob' || responseType === 'arraybuffer' || responseType === 'stream') {
                return response
            }

            //授权失败触发登出功能
            if (code === 401 || code === 403) {
                store.dispatch('logout');
            }

            //业务逻辑出错跳到到catch执行
            if (code !== 200) {
                return Promise.reject({
                    ...response,
                    message: response.data.msg
                });
            }

            // 如果需要过滤数据返回业务层data,否则全部返回
            return filterData ? response.data.data : response;
        }).catch(error => {
            if (loadingInstance) loadingInstance.close(); //关闭loading
            if (showToast) Message.error(error.message);// 弹出错误信息

            return Promise.reject(error); //执行reject()
        })
    }

    /**
     *@desc post请求
     *@return promise [promise] token
     */
    post(url, data, options) {
        return this.request('post', url, {data}, options)
    }

    /**
     *@desc get请求
     *@return promise [promise] token
     */
    get(url, params, options) {
        return this.request('get', url, {params}, options)
    }

    /**
     *@desc 下载
     *@return promise [promise] token
     */
    download(url, params, options) {
        return this.request('get', url, {params}, {
            showToast: false, filterData: false, responseType: 'blob'
        }).then(res => {
            //设置文件名称
            let downloadNameMsg = res.headers['content-disposition'] || "attachment;filename=%E7%B2%BE%E9%94%90%E5%9C%A8%E7%BA%BF.doc";
            let downloadName = decodeURIComponent(downloadNameMsg.split(";")[1].split("=")[1]);

            //生成节点
            let blob = new Blob([res.data]);
            let url = window.URL.createObjectURL(blob);
            let link = document.createElement('a');

            //给节点添加属性
            link.style.display = 'none';
            link.download = downloadName;
            link.href = url;

            //渲染节点并触发事件
            document.body.appendChild(link);
            link.click();

            //完成移除节点释放blob
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);

            return true;
        }).catch(err => {
            console.log(err)
            return false;
        })
    }
}