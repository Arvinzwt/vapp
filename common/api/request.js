import $url from "./url";

export default {
    /**
     *@desc request处理
     *@param method [String] 请求方式
     *@param url [String] 请求地址参数
     *@param data [Object] 请求参数
     *@param options[Object] 请求配置（默认空）
     *@param options[native] [Boolean] 是否需要返回所有数据（下载时需要）
     *@param options[dataType] [string] 返回数据结构（默认json）
     *@param options[header] [object] 请求头文件
     *@return promise [promise]
     */
    request(method = 'GET', url = '', data = {}, {native = false, dataType = 'json', header = {'Content-Type': 'application/json;charset=UTF-8'}} = {}) {
        return new Promise((resolve, reject) => {
            uni.request({
                url: $url.baseUrl + url,
                header,
                dataType,
                data,
                method,
                success(result) {
                    // 返回原始数据
                    if (native) {
                        return resolve(result)
                    }

                    // 服务端成功
                    if (result.statusCode === 200) {
                        let {resultData, resultCode, resultMsg} = result.data

                        //登录过期
                        if (resultCode === 4301 || resultCode === 10010001) {
                            return uni.showToast({
                                title: "登录过期，请重新登录",
                                icon: 'none',
                                complete() {
                                    uni.navigateTo({
                                        url: "/pages/index/index"
                                    })
                                }
                            })
                        }

                        // 业务逻辑是否通过
                        if (resultCode === 200) {
                            return resolve(resultData)
                        } else {
                            return uni.showToast({
                                title: resultMsg,
                                icon: "none",
                                success() {
                                    reject(result)
                                }
                            })
                        }
                    } else {
                        return reject(result.data)
                    }
                },
                fail(error) {
                    return reject(error)
                }
            })
        })
    },

    // get请求
    get(url, data = {}, options = {}) {
        let param = Object.keys(data).map(function (key) {
            return key + "=" + json[key];
        }).join("&")

        return this.request('GET', `${url}?${param}`, data, options)
    },

    // post请求
    post(url, data = {}, options = {}) {
        return this.request('POST', url, data, options)
    },

    // delete请求
    del(url, data = {}, options = {}) {
        return this.request('DELETE', url, data, options)
    },
}