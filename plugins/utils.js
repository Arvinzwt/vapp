/**
 * @description: 自定义工具函数
 * @docs: underscore => https://underscorejs.org
 * @docs: moment => http://momentjs.cn
 */

import underscore from 'underscore';
import moment from 'moment';

export default ({store, $axios, app}, inject) => {
    inject('utils', {
        underscore,
        moment,

        /**
         *@desc 格式化时间
         *@param timestamp[number] 单位为毫秒的时间戳或者date对象
         *@param format[string] 格式化时间结构默认YYYY-MM-DD HH:mm:ss
         *@return date[string]
         */
        formatTime(timestamp, format = 'YYYY/MM/DD HH:mm:ss') {
            return timestamp ? moment(timestamp).format(format) : ''
            // 时间戳单位为秒时// return timestamp ? moment.unix(timestamp).format(format) : '';
        },

        /**
         *@desc 重置json对象-只能处理第一层
         *@param json[Object] 重置对象
         *@return json[Object]
         */
        resetJson(json) {
            for (let key in json) {
                if (json.hasOwnProperty(key)) {
                    let target = json[key];
                    if (underscore.isObject(json[key])) {
                        target = {};
                    }
                    if (underscore.isArray(json[key])) {
                        target = [];
                    }
                    if (underscore.isFunction(json[key])) {
                        target = json[key];
                    }
                    if (underscore.isString(json[key])) {
                        target = '';
                    }
                    if (underscore.isNumber(json[key])) {
                        target = '0';
                    }
                    if (underscore.isBoolean(json[key])) {
                        target = false;
                    }
                    json[key] = target;
                }
            }
            return json;
        }
    })
}