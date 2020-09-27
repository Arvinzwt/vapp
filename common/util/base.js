import time from "./time.js"
import validate from "./validate.js"
import $C from '../../common/api/url.js'

export default {
    ...time,
    validate,

    //下载app
    appDownLoad() {
        var isIOS = uni.getSystemInfoSync().model === 'iPhone';
        location.href = isIOS ? $C.IOS_DOWNLOAD_URL : $C.ANDROID_DOWNLOAD_URL
    },

    //参数验证
    checker(formData, rule) {
        let checkRes = validate.check(formData, rule);
        if (checkRes) {
            // this.toast("验证通过!");
            return true
        } else {
            uni.showToast({
                title: validate.error,
                icon: 'none'
            })
            return false;
        }
    },

    //拨打电话
    callPhone(phoneNumber) {
        uni.makePhoneCall({
            phoneNumber
        })
    },

    //将一维数组转为树形结构
    toTreeData(data, parent_id = 0) {
        var pos = {};
        var tree = [];
        var i = 0;
        while (data.length != 0) {
            if (data[i].parent_id == parent_id) {
                tree.push({
                    id: data[i].id,
                    name: data[i].name,
                    is_show: data[i].is_show,
                    children: []
                });
                pos[data[i].id] = [tree.length - 1];
                data.splice(i, 1);
                i--;
            } else {
                var posArr = pos[data[i].parent_id];
                if (posArr != undefined) {
                    var obj = tree[posArr[0]];
                    for (var j = 1; j < posArr.length; j++) {
                        obj = obj.children[posArr[j]];
                    }

                    obj.children.push({
                        id: data[i].id,
                        name: data[i].name,
                        is_show: data[i].is_show,
                        children: []
                    });
                    pos[data[i].id] = posArr.concat([obj.children.length - 1]);
                    data.splice(i, 1);
                    i--;
                }
            }
            i++;
            if (i > data.length - 1) {
                i = 0;
            }
        }
        return tree;
    },

    //js将json转url参数
    jsonToUrl(json) {
        return Object.keys(json).map(function (key) {
            return key + "=" + json[key];
        }).join("&");
    },

    /**
     * 唤醒移动端方法，双方定义好协议名称
     *  'method': 'EnterToHomePage',
     'params': {"af_token":""},
     'callback': ""
     */
    pushAction(method, params = {}, callback = null) {
        let is_share = getCurrentPages()[0].is_share
        if (is_share) return uni.showToast({
            title: "请先下载APP",
            icon: "none"
        })

        let message = {
            method,
            params,
            callback
        }
        let os = this.getSystemOA();
        console.log('message', message)
        if (os.deviceType == 'ios') {
            window.webkit.messageHandlers.AppModel.postMessage(message);
        } else {
            window.AppModel.postMessage(JSON.stringify(message));
        }
    },
    //获取系统类别,ios或android
    getSystemOA() {
        var u = navigator.userAgent;
        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
        // var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        var isiOS = u.indexOf('Mac OS X') > -1; //ios终端
        let deviceType = isiOS ? 'ios' : 'android';
        let deviceKey = isiOS ? 2 : 1;
        return {
            deviceType: deviceType,
            deviceKey: deviceKey
        };
    },
    getIsWechat() {
        var ua = navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == 'micromessenger') {
            return true;
        } else {
            return false;
        }
    },
    //图片预览
    previewImage(url) {
        uni.previewImage({
            urls: [url],
            longPressActions: {
                itemList: ['发送给朋友', '保存图片', '收藏'],
                success: function (data) {
                    console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
                },
                fail: function (err) {
                    console.log(err.errMsg);
                }
            }
        });
    }
}