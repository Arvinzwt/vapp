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
         *@param timestamp[number] 时间戳,不填返回空
         *@param format[string] 格式化时间结构默认YYYY.MM.DD，（YYYY-MM-DD HH:mm:ss）
         *@return date[string]
         */
        formatTime(timestamp, format = 'YYYY.MM.DD') {
            // 时间戳单位为秒时
            // return timestamp ? moment.unix(timestamp).format(format) : '';
            // 时间戳单位为毫秒

        },
    })
}